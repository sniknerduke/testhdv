export interface CreateVnpayRequest {
  orderId: string;
  amount: number; // VND
  // Frontend should not set this; service enforces backend return URL
  returnUrl?: string;
  ipAddress?: string;
}

export interface CreateVnpayResponse {
  paymentUrl: string;
}

const BASE = 'http://localhost:8081/payment/vnpay';

export interface PaymentTransaction {
  id?: number;
  orderId: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | string;
  vnpTransactionNo?: string;
  vnpResponseCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createVnpayPayment(payload: CreateVnpayRequest): Promise<CreateVnpayResponse> {
  let res: Response;
  // Always use backend return endpoint regardless of caller input
  const origin = new URL(BASE).origin;
  const enforcedReturnUrl = `${origin}/payment/vnpay/return`;
  const body = {
    orderId: payload.orderId,
    amount: Math.round(payload.amount),
    returnUrl: enforcedReturnUrl,
    ipAddress: payload.ipAddress || '127.0.0.1'
  };
  try {
    res = await fetch(`${BASE}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (networkErr: any) {
    throw new Error('NETWORK_ERROR: ' + (networkErr?.message || 'Unknown'));
  }
  if (!res.ok) {
    let body: any = null;
    try { body = await res.text(); } catch {}
    throw new Error(`HTTP_${res.status}: ${body || 'Failed to create payment'}`);
  }
  try {
    return await res.json();
  } catch (parseErr) {
    throw new Error('PARSE_ERROR: cannot parse response JSON');
  }
}

export async function getPaymentStatus(orderId: string): Promise<PaymentTransaction | null> {
  const res = await fetch(`${BASE}/status/${encodeURIComponent(orderId)}`);
  if (!res.ok) return null;
  return res.json();
}
