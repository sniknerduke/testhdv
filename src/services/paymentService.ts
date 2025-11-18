export interface CreateVnpayRequest {
  orderId: string;
  amount: number; // VND
  returnUrl: string;
  ipAddress?: string;
}

export interface CreateVnpayResponse {
  paymentUrl: string;
}

const BASE = 'http://localhost:8081/payment/vnpay';

export async function createVnpayPayment(payload: CreateVnpayRequest): Promise<CreateVnpayResponse> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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

export async function getPaymentStatus(orderId: string) {
  const res = await fetch(`${BASE}/status/${encodeURIComponent(orderId)}`);
  if (!res.ok) return null;
  return res.json();
}
