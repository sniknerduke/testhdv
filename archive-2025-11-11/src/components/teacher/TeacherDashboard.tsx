import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Users, FileText, TrendingUp } from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (page: string) => void;
}

export default function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  return (
    <div className="p-8">
      <h1 className="mb-6">Dashboard Giáo viên</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng khóa học</p>
                <p className="text-3xl">2</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng học sinh</p>
                <p className="text-3xl">77</p>
              </div>
              <Users className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bài cần chấm</p>
                <p className="text-3xl">15</p>
              </div>
              <FileText className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đánh giá TB</p>
                <p className="text-3xl">4.8</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-x-4">
        <Button onClick={() => onNavigate('manage-courses')}>Quản lý khóa học</Button>
        <Button onClick={() => onNavigate('teacher-schedule')} variant="outline">Quản lý lịch dạy</Button>
      </div>
    </div>
  );
}
