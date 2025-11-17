import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ShoppingCart, CreditCard, Wallet, Building2, Clock } from 'lucide-react';
import { formatCurrency } from '../ui/utils';

interface TransactionHistoryProps {
  onNavigate?: (page: string) => void;
}

interface TransactionItem {
  id: string | number;
  title: string;
  price: number;
}
interface TransactionRecord {
  id: string;
  time: string;
  items: TransactionItem[];
  total: number;
  method: string;
}

const methodIcon: Record<string, any> = {
  card: CreditCard,
  ewallet: Wallet,
  transfer: Building2,
};

export default function TransactionHistory({ onNavigate }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('transactions');
      if (raw) {
        const parsed: TransactionRecord[] = JSON.parse(raw);
        // Normalize prices if stored as strings
        parsed.forEach(tx => {
          tx.total = typeof tx.total === 'number' ? tx.total : Number(String(tx.total).replace(/[^0-9]/g, ''));
          tx.items = tx.items.map(it => ({
            ...it,
            price: typeof it.price === 'number' ? it.price : Number(String(it.price).replace(/[^0-9]/g, ''))
          }));
        });
        setTransactions(parsed);
      }
    } catch {}
  }, []);

  if (transactions.length === 0) {
    return (
      <div className="p-8">
        <h1 className="mb-6">Lịch sử giao dịch</h1>
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Chưa có giao dịch nào được ghi nhận.</p>
            {onNavigate && (
              <Button onClick={() => onNavigate('courses')}>Mua khóa học đầu tiên</Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6">Lịch sử giao dịch</h1>
      <div className="space-y-4">
        {transactions.map(tx => {
          const Icon = methodIcon[tx.method] || CreditCard;
          return (
            <Card key={tx.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Giao dịch #{tx.id}</CardTitle>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(tx.time).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Icon className="w-3 h-3" /> {tx.method}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {tx.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate max-w-[60%]" title={item.title}>{item.title}</span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(tx.total)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
