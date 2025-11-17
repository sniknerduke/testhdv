import { useEffect, useState } from 'react';
import { formatCurrency } from '../ui/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CreditCard, Wallet, Building2, CheckCircle2 } from 'lucide-react';

interface CheckoutProps { onNavigate: (page: string) => void; }

interface PurchaseRecord {
  id: string; // uuid-like or timestamp
  time: string; // ISO
  items: Array<{ id: string | number; title: string; price: number }>;
  total: number;
  method: string;
}

export default function Checkout({ onNavigate }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [cartItems, setCartItems] = useState<Array<{ id: string | number; title: string; price: number }>>([]);
  const cartTotal = cartItems.reduce((sum, i) => sum + (i.price || 0), 0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) {
        const parsed = JSON.parse(raw);
        setCartItems(parsed.map((c: any) => ({ id: c.id, title: c.title, price: c.price })));
      }
    } catch {}
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      // Record purchase history
      try {
        const rawTx = localStorage.getItem('transactions');
        const existing: PurchaseRecord[] = rawTx ? JSON.parse(rawTx) : [];
        const record: PurchaseRecord = {
          id: Date.now().toString(),
          time: new Date().toISOString(),
          items: cartItems.map(i => ({ id: i.id, title: i.title, price: i.price })),
          total: cartTotal,
          method: paymentMethod,
        };
        existing.unshift(record);
        localStorage.setItem('transactions', JSON.stringify(existing));
        // Clear cart
        localStorage.removeItem('cart');
      } catch {}

      // Redirect to transaction history after 2 seconds
      setTimeout(() => {
        onNavigate('transaction-history');
      }, 2000);
    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã mua khóa học. Bạn có thể bắt đầu học ngay bây giờ.
            </p>
            <Button onClick={() => onNavigate('my-courses')} className="w-full">
              Đến khóa học của tôi
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="mb-6">Thanh toán</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5" />
                      <span>Thẻ tín dụng/ghi nợ</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="ewallet" id="ewallet" />
                    <Label htmlFor="ewallet" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5" />
                      <span>Ví điện tử (Momo, ZaloPay, VNPay)</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building2 className="w-5 h-5" />
                      <span>Chuyển khoản ngân hàng</span>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label>Số thẻ</Label>
                      <Input 
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Ngày hết hạn</Label>
                        <Input 
                          type="text"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input 
                          type="text"
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Tên chủ thẻ</Label>
                      <Input 
                        type="text"
                        placeholder="NGUYEN VAN A"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'ewallet' && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Sau khi nhấn "Thanh toán", bạn sẽ được chuyển đến trang ví điện tử để hoàn tất giao dịch.
                    </p>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm mb-2">Thông tin chuyển khoản:</p>
                    <p className="text-sm">Ngân hàng: <strong>Vietcombank</strong></p>
                    <p className="text-sm">Số tài khoản: <strong>1234567890</strong></p>
                    <p className="text-sm">Chủ tài khoản: <strong>EDUPLATFORM</strong></p>
                    <p className="text-sm">Nội dung: <strong>THANHTOAN [Email của bạn]</strong></p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{cartItems.length} khóa học</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá:</span>
                  <span className="text-green-600">-0đ</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Tổng cộng:</span>
                  <span className="text-xl">{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Bằng cách hoàn tất giao dịch, bạn đồng ý với Điều khoản dịch vụ và Chính sách hoàn tiền của chúng tôi.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
