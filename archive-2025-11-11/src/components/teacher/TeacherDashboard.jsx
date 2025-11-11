import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Users, FileText, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const myCourses = [
  { id: 1, name: 'Lập trình React cơ bản', students: 45, avgRating: 4.8, revenue: '22,500,000đ' },
  { id: 2, name: 'JavaScript nâng cao', students: 32, avgRating: 4.7, revenue: '16,000,000đ' }
];

const pendingAssignments = [
  { id: 1, student: 'Nguyễn Văn A', course: 'React cơ bản', assignment: 'Bài tập tuần 3', submitted: '2 giờ trước' },
  { id: 2, student: 'Trần Thị B', course: 'React cơ bản', assignment: 'Dự án giữa kỳ', submitted: '5 giờ trước' },
  { id: 3, student: 'Lê Văn C', course: 'JavaScript', assignment: 'Bài tập tuần 2', submitted: '1 ngày trước' }
];

const upcomingClasses = [
  { id: 1, course: 'React cơ bản', time: 'Hôm nay, 14:00', students: 45 },
  { id: 2, course: 'JavaScript nâng cao', time: 'Thứ 5, 18:00', students: 32 }
];

export default function TeacherDashboard({ onNavigate }) {
  return (
    <div className="p-8">
      <h1 className="mb-6">Dashboard Giáo viên</h1>

      {/* Stats */}
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* My Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Khóa học của tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myCourses.map(course => (
                <div key={course.id} className="border rounded-lg p-4">
                  <h3 className="mb-2">{course.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Học sinh: {course.students}</div>
                    <div>Đánh giá: {course.avgRating}/5</div>
                    <div className="col-span-2">Doanh thu: {course.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={() => onNavigate('manage-courses')}>
              Quản lý khóa học
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch dạy sắp tới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map(cls => (
                <div key={cls.id} className="border rounded-lg p-4">
                  <h3 className="mb-2">{cls.course}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cls.time}</p>
                  <p className="text-sm text-gray-600 mb-3">{cls.students} học sinh</p>
                  <Button size="sm" className="w-full">Bắt đầu lớp học</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('teacher-schedule')}>
              Xem lịch đầy đủ
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Assignments */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bài tập chờ chấm</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Học sinh</TableHead>
                <TableHead>Khóa học</TableHead>
                <TableHead>Bài tập</TableHead>
                <TableHead>Thời gian nộp</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingAssignments.map(assignment => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.student}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.assignment}</TableCell>
                  <TableCell>{assignment.submitted}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Chấm điểm</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
