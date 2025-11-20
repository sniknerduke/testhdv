import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BookOpen, Award, Clock, CheckCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const stats = {
    totalCourses: 5,
    completedCourses: 2,
    averageScore: 8.5,
    totalStudyTime: 48,
    lastStudy: '2 giờ trước',
  };

  const courseProgress = [
    { name: 'Lập trình React', progress: 100, score: 9.0, status: 'completed' },
    { name: 'Thiết kế UI/UX', progress: 100, score: 8.5, status: 'completed' },
    { name: 'JavaScript Nâng cao', progress: 65, score: null, status: 'in-progress' },
    { name: 'TypeScript', progress: 40, score: null, status: 'in-progress' },
    { name: 'Node.js Backend', progress: 15, score: null, status: 'in-progress' },
  ];

  const scoreDistribution = [
    { range: '9-10', count: 3, color: 'bg-green-500' },
    { range: '8-8.9', count: 5, color: 'bg-blue-500' },
    { range: '7-7.9', count: 2, color: 'bg-yellow-500' },
    { range: '<7', count: 0, color: 'bg-red-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-6">Dashboard Học sinh</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng khóa học</p>
                <p className="text-3xl">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã hoàn thành</p>
                <p className="text-3xl">{stats.completedCourses}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng thời gian học</p>
                <p className="text-3xl">{stats.totalStudyTime}h</p>
              </div>
              <Clock className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Tiến độ khóa học</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseProgress.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{course.name}</span>
                  <div className="flex items-center gap-2">
                    {course.score && (
                      <span className="text-sm text-green-600">Điểm: {course.score}</span>
                    )}
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                </div>
                <Progress value={course.progress} />
              </div>
            ))}
          </CardContent>
        </Card>

        

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Hoàn thành bài học "React Hooks"</p>
                  <p className="text-xs text-gray-500">2 giờ trước</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Nộp bài tập "Component Patterns"</p>
                  <p className="text-xs text-gray-500">5 giờ trước</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Bắt đầu khóa học "TypeScript"</p>
                  <p className="text-xs text-gray-500">1 ngày trước</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Đạt điểm 9.0 ở bài kiểm tra React</p>
                  <p className="text-xs text-gray-500">2 ngày trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Mục tiêu học tập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Hoàn thành 3 khóa học trong tháng</span>
                <span className="text-sm text-gray-600">2/3</span>
              </div>
              <Progress value={66} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Học ít nhất 10 giờ/tuần</span>
                <span className="text-sm text-gray-600">8/10h</span>
              </div>
              <Progress value={80} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Đạt điểm trung bình &gt; 8.5</span>
                <span className="text-sm text-green-600">✓ Hoàn thành</span>
              </div>
              <Progress value={100} className="bg-green-100" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
