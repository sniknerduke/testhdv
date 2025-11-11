import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users, BookOpen, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const stats = {
  totalUsers: 1247,
  totalCourses: 156,
  totalRevenue: '2,450,000,000đ',
  activeUsers: 892,
  newUsersThisMonth: 134,
  coursesPublished: 12
};

const recentActivities = [
  { id: 1, type: 'user', action: 'Nguyễn Văn A đã đăng ký tài khoản', time: '5 phút trước' },
  { id: 2, type: 'course', action: 'Khóa học "Python nâng cao" đã được xuất bản', time: '15 phút trước' },
  { id: 3, type: 'payment', action: 'Thanh toán 500,000đ từ Trần Thị B', time: '30 phút trước' },
  { id: 4, type: 'user', action: 'Giáo viên Lê Văn C đã tạo khóa học mới', time: '1 giờ trước' }
];

const topCourses = [
  { id: 1, name: 'Lập trình React cơ bản', students: 234, revenue: '117,000,000đ' },
  { id: 2, name: 'Python cho Data Science', students: 189, revenue: '94,500,000đ' },
  { id: 3, name: 'Tiếng Anh giao tiếp', students: 156, revenue: '46,800,000đ' }
];

export default function AdminDashboard({ onNavigate }) {
  return (
    <div className="p-8">
      <h1 className="mb-6">Dashboard Admin</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
                <p className="text-3xl mb-1">{stats.totalUsers}</p>
                <p className="text-sm text-green-600">+{stats.newUsersThisMonth} tháng này</p>
              </div>
              <Users className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng khóa học</p>
                <p className="text-3xl mb-1">{stats.totalCourses}</p>
                <p className="text-sm text-green-600">+{stats.coursesPublished} tháng này</p>
              </div>
              <BookOpen className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
                <p className="text-2xl mb-1">{stats.totalRevenue}</p>
                <p className="text-sm text-green-600">+12.5% tháng này</p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Người dùng hoạt động</p>
                <p className="text-3xl mb-1">{stats.activeUsers}</p>
                <p className="text-sm text-gray-600">{((stats.activeUsers/stats.totalUsers)*100).toFixed(1)}% tổng số</p>
              </div>
              <Activity className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'course' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'user' ? '👤' : activity.type === 'course' ? '📚' : '💰'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Khóa học nổi bật</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-gray-600">{course.students} học sinh</div>
                  </div>
                  <div className="text-sm font-medium">{course.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quản lý nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('user-management')}
            >
              <Users className="w-6 h-6" />
              Quản lý người dùng
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('admin-courses')}
            >
              <BookOpen className="w-6 h-6" />
              Quản lý khóa học
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('admin-settings')}
            >
              <Activity className="w-6 h-6" />
              Báo cáo
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate('admin-settings')}
            >
              <TrendingUp className="w-6 h-6" />
              Cài đặt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
