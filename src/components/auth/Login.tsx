import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface LoginProps {
  onLogin: (role: string) => void;
  onNavigate: (page: string) => void;
  adminOnly?: boolean;
}

export default function Login({ onLogin, onNavigate, adminOnly = false }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role: string) => {
    // Mock login
    onLogin(role);
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
            <CardDescription>Chỉ dành cho quản trị viên hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Mật khẩu</Label>
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => handleLogin('admin')}>
                Đăng nhập quản trị
              </Button>
            </div>

            <div className="relative my-4 py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground py-2" >Hoặc</span>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => onNavigate('home')}
                className="text-blue-600 hover:underline text-sm"
              >
                Quay lại trang chủ
              </button>
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
          <CardDescription>Chọn vai trò để đăng nhập vào hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Học sinh</TabsTrigger>
              <TabsTrigger value="teacher">Giáo viên</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <div className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Mật khẩu</Label>
                  <Input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => handleLogin('student')}>
                  Đăng nhập với tư cách Học sinh
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="teacher">
              <div className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="teacher@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Mật khẩu</Label>
                  <Input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => handleLogin('teacher')}>
                  Đăng nhập với tư cách Giáo viên
                </Button>
              </div>
            </TabsContent>
            
            {null}
          </Tabs>
          
          <div className="relative my-4 py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground py-2" >Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('google')}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Đăng nhập với Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('facebook')}>
              <FaFacebook className="mr-2 h-4 w-4" />
              Đăng nhập với Facebook
            </Button>
          </div>
          
          <div className="mt-4 text-center space-y-2">
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
