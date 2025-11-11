import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, Clock, Edit, Trash, Video, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

const schedules = [
  {
    id: 1,
    course: 'Lập trình React cơ bản',
    date: '2024-11-08',
    time: '14:00 - 16:00',
    students: 45,
    link: 'https://zoom.us/j/123456789',
    status: 'upcoming'
  },
  {
    id: 2,
    course: 'JavaScript nâng cao',
    date: '2024-11-09',
    time: '18:00 - 20:00',
    students: 32,
    link: 'https://meet.google.com/abc-defg-hij',
    status: 'upcoming'
  },
  {
    id: 3,
    course: 'Lập trình React cơ bản',
    date: '2024-11-10',
    time: '14:00 - 16:00',
    students: 45,
    link: 'https://zoom.us/j/123456789',
    status: 'scheduled'
  }
];

export default function TeacherSchedule() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (scheduleId) => {
    if (confirm('Bạn có chắc muốn xóa lịch học này? Học sinh sẽ nhận được thông báo.')) {
      // Handle delete
      alert('Đã gửi thông báo tới học sinh qua email và SMS');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1>Quản lý lịch dạy</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo lịch học mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo buổi học mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Khóa học</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khóa học" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">Lập trình React cơ bản</SelectItem>
                    <SelectItem value="js">JavaScript nâng cao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ngày học</Label>
                <Input type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giờ bắt đầu</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label>Giờ kết thúc</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label>Link học online</Label>
                <Input placeholder="https://zoom.us/j/..." />
              </div>
              <div>
                <Label>Ghi chú</Label>
                <Input placeholder="Nội dung buổi học..." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => {
                  setIsCreateDialogOpen(false);
                  alert('Đã tạo lịch học và gửi thông báo tới học sinh');
                }}>
                  Tạo lịch học
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert className="mb-6">
        <AlertDescription>
          Khi bạn sửa hoặc xóa lịch học, hệ thống sẽ tự động gửi thông báo qua Email và SMS cho tất cả học sinh trong khóa học.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {schedules.map(schedule => (
          <Card key={schedule.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{schedule.course}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      schedule.status === 'upcoming' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {schedule.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã lên lịch'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(schedule.date).toLocaleDateString('vi-VN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <a href={schedule.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {schedule.link}
                      </a>
                    </div>
                    <div className="text-sm">
                      {schedule.students} học sinh đã đăng ký
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {schedule.status === 'upcoming' && (
                    <Button>Bắt đầu lớp học</Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(schedule)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {selectedSchedule && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sửa lịch học</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Học sinh sẽ nhận được thông báo về thay đổi này qua Email và SMS
                </AlertDescription>
              </Alert>
              <div>
                <Label>Ngày học</Label>
                <Input type="date" defaultValue={selectedSchedule.date} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giờ bắt đầu</Label>
                  <Input type="time" defaultValue="14:00" />
                </div>
                <div>
                  <Label>Giờ kết thúc</Label>
                  <Input type="time" defaultValue="16:00" />
                </div>
              </div>
              <div>
                <Label>Link học online</Label>
                <Input defaultValue={selectedSchedule.link} />
              </div>
              <div>
                <Label>Lý do thay đổi (sẽ gửi cho học sinh)</Label>
                <Input placeholder="VD: Thay đổi lịch do việc cá nhân..." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => {
                  setIsEditDialogOpen(false);
                  alert('Đã cập nhật lịch học và gửi thông báo tới học sinh');
                }}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
