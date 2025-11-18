import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getPaymentStatus } from '../../services/paymentService';

interface PaymentReturnProps { onNavigate: (page: string) => void; }

export default function PaymentReturn({ onNavigate }: PaymentReturnProps) {
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('Đang kiểm tra giao dịch...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const responseCode = params.get('vnp_ResponseCode');
    const txnRef = params.get('vnp_TxnRef');
    setOrderId(txnRef);
    if (responseCode) {
      if (responseCode === '00') {
        setStatus('success');
        setMessage('Thanh toán thành công!');
      } else {
        setStatus('failed');
        setMessage('Thanh toán thất bại hoặc bị hủy.');
      }
    }
    // Try backend status for confirmation
    if (txnRef) {
      getPaymentStatus(txnRef).then(data => {
        if (!data) return;
        if (data.status === 'SUCCESS') {
          setStatus('success');
          setMessage('Thanh toán thành công!');
          setAmount(data.amount);
          finalizeLocal(txnRef, data.amount || 0);
        } else if (data.status === 'FAILED') {
          setStatus('failed');
          setMessage('Thanh toán thất bại.');
          setAmount(data.amount);
        }
      }).catch(() => {});
    }
  }, []);

  const finalizeLocal = (oid: string, amt: number) => {
    try {
      const rawPending = localStorage.getItem('pending_payment');
      if (rawPending) {
        const pending = JSON.parse(rawPending);
        if (pending.orderId === oid) {
          const rawTx = localStorage.getItem('transactions');
          const existing = rawTx ? JSON.parse(rawTx) : [];
            existing.unshift({
              id: oid,
              time: new Date().toISOString(),
              items: pending.items,
              total: pending.total,
              method: 'vnpay'
            });
          localStorage.setItem('transactions', JSON.stringify(existing));
          localStorage.removeItem('pending_payment');
          localStorage.removeItem('cart');
        }
      }
    } catch {}
  };

  const icon = status === 'success' ? <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" /> : status === 'failed' ? <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" /> : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Kết quả thanh toán VNPay</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {icon}
          <p className="font-medium">{message}</p>
          {orderId && <p className="text-sm text-gray-600">Mã đơn hàng: <span className="font-mono">{orderId}</span></p>}
          {amount != null && <p className="text-sm text-gray-600">Số tiền: {amount.toLocaleString('vi-VN')}đ</p>}
          <div className="flex flex-col gap-2 mt-4">
            {status === 'success' && (
              <Button onClick={() => onNavigate('my-courses')} className="w-full">Đến khóa học của tôi</Button>
            )}
            <Button variant="outline" onClick={() => onNavigate('transaction-history')} className="w-full">Xem lịch sử giao dịch</Button>
            <Button variant="ghost" onClick={() => onNavigate('home')} className="w-full">Về trang chủ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
