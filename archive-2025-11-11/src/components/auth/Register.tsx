import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    alert('Đăng ký thành công! Vui lòng xác nhận email để kích hoạt tài khoản.');
    onNavigate('login');
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    alert(`Chức năng đăng ký bằng ${provider} chưa được tích hợp.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Đăng ký tài khoản</CardTitle>
          <CardDescription>Tạo tài khoản mới để bắt đầu học tập</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Họ và tên</Label>
              <Input 
                type="text" 
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input 
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label>Mật khẩu</Label>
              <Input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div>
              <Label>Xác nhận mật khẩu</Label>
              <Input 
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <Button type="submit" className="w-full">Đăng ký</Button>
          </form>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 py-2 text-muted-foreground">
                Hoặc tiếp tục với
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Đăng ký với Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2 h-4 w-4" />
              Đăng ký với Facebook
            </Button>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Đã có tài khoản? </span>
            <button 
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:underline text-sm"
            >
              Đăng nhập
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
