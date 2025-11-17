import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (role: string) => void;
  onNavigate: (page: string) => void;
  adminOnly?: boolean;
}

export default function Login({ onLogin, onNavigate, adminOnly = false }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple in-memory credential mapping
  const credentials: Record<string, { password: string; role: string }> = {
    'student@example.com': { password: '123', role: 'student' },
    'teacher@example.com': { password: '123', role: 'teacher' },
    'admin@example.com': { password: '123', role: 'admin' }, // used only when adminOnly=true
  };

  const attemptLogin = () => {
    const record = credentials[email.trim().toLowerCase()];
    if (!record) {
      toast.error('Email không hợp lệ');
      return;
    }
    if (record.password !== password) {
      toast.error('Mật khẩu sai');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(record.role);
      toast.success('Đăng nhập thành công');
    }, 400);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    alert(`Chức năng đăng nhập với ${provider} chưa được cài đặt.`);
  };

  if (adminOnly) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Đăng nhập Admin</CardTitle>
            <CardDescription>Chỉ dành cho quản trị viên hệ thống (sample: admin@example.com / admin123)</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); attemptLogin(); }}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Mật khẩu</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập quản trị'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button onClick={() => onNavigate('home')} className="text-blue-600 hover:underline text-sm">Quay lại trang chủ</button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
          <CardDescription>Nhập email & mật khẩu (sample bên dưới)</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); attemptLogin(); }}>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="student123"
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
          <div className="mt-4 space-y-2 text-xs text-gray-600">
            <p className="font-medium">Sample credentials:</p>
            <ul className="space-y-1">
              <li>Học sinh: <code>student@example.com / student123</code></li>
              <li>Giáo viên: <code>teacher@example.com / teacher123</code></li>
              <li>Admin (trang /admin): <code>admin@example.com / admin123</code></li>
            </ul>
          </div>
          
          <div className="relative my-6 py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground py-2" >Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Đăng nhập với Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2 h-4 w-4" />
              Đăng nhập với Facebook
            </Button>
          </div>
          
          <div className="mt-6 text-center space-y-2">
            <button 
              onClick={() => onNavigate('forgot-password')}
              className="text-blue-600 hover:underline text-sm"
            >
              Quên mật khẩu?
            </button>
            <div>
              <span className="text-sm text-gray-600">Chưa có tài khoản? </span>
              <button 
                onClick={() => onNavigate('register')}
                className="text-blue-600 hover:underline text-sm"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
