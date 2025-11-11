import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  return (
    <div className="p-8">
      <h1 className="mb-6">Dashboard Học sinh</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Khóa học đang học</p>
                <p className="text-3xl">3</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Giờ học</p>
                <p className="text-3xl">47</p>
              </div>
              <Clock className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bài tập đã nộp</p>
                <p className="text-3xl">12</p>
              </div>
              <Trophy className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Điểm trung bình</p>
                <p className="text-3xl">8.5</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Button onClick={() => onNavigate('my-courses')}>Xem khóa học của tôi</Button>
    </div>
  );
}
