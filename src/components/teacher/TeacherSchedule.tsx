import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Plus, Edit, Trash2, Clock, Video, MapPin, Users, Calendar as CalendarIcon, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface Schedule {
  id: number;
  title: string;
  course: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'online' | 'offline';
  location: string;
  students: number;
  description: string;
  notified: boolean;
}

export default function TeacherSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      title: 'React Components & Props',
      course: 'React từ cơ bản đến nâng cao',
      date: new Date(2024, 10, 15, 9, 0), // Nov 15, 2024, 9:00 AM
      startTime: '09:00',
      endTime: '11:00',
      type: 'online',
      location: 'Zoom Meeting',
      students: 45,
      description: 'Bài học về Components và Props trong React',
      notified: true
    },
    {
      id: 2,
      title: 'TypeScript Basic Types',
      course: 'TypeScript cho người mới',
      date: new Date(2024, 10, 15, 14, 0),
      startTime: '14:00',
      endTime: '16:00',
      type: 'online',
      location: 'Google Meet',
      students: 38,
      description: 'Giới thiệu các kiểu dữ liệu cơ bản trong TypeScript',
      notified: true
    },
    {
      id: 3,
      title: 'Node.js Express Framework',
      course: 'Node.js Backend Development',
      date: new Date(2024, 10, 16, 10, 0),
      startTime: '10:00',
      endTime: '12:00',
      type: 'offline',
      location: 'Phòng 301, Tòa A',
      students: 30,
      description: 'Xây dựng RESTful API với Express',
      notified: false
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '11:00',
    type: 'online' as 'online' | 'offline',
    location: '',
    description: ''
  });

  const handleCreateSchedule = () => {
    setEditingSchedule(null);
    setFormData({
      title: '',
      course: '',
      date: selectedDate || new Date(),
      startTime: '09:00',
      endTime: '11:00',
      type: 'online',
      location: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      title: schedule.title,
      course: schedule.course,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      type: schedule.type,
      location: schedule.location,
      description: schedule.description
    });
    setIsDialogOpen(true);
  };

  const handleSaveSchedule = () => {
    if (editingSchedule) {
      setSchedules(schedules.map(s =>
        s.id === editingSchedule.id
          ? { ...s, ...formData }
          : s
      ));
      toast.success('Cập nhật lịch dạy thành công!');
    } else {
      const newSchedule: Schedule = {
        id: Date.now(),
        ...formData,
        students: 0,
        notified: false
      };
      setSchedules([...schedules, newSchedule]);
      toast.success('Tạo lịch dạy thành công!');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa lịch dạy này?')) {
      setSchedules(schedules.filter(s => s.id !== id));
      toast.success('Xóa lịch dạy thành công!');
    }
  };

  const handleNotifyStudents = (id: number) => {
    setSchedules(schedules.map(s =>
      s.id === id
        ? { ...s, notified: true }
        : s
    ));
    toast.success('Đã gửi thông báo đến học sinh qua SMS & Email!');
  };

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter(s => {
      const scheduleDate = new Date(s.date);
      return scheduleDate.toDateString() === date.toDateString();
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const todaySchedules = selectedDate ? getSchedulesForDate(selectedDate) : [];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2">Quản lý lịch dạy</h1>
          <p className="text-gray-600">Lên lịch và quản lý các buổi học của bạn</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateSchedule}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm lịch dạy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSchedule ? 'Chỉnh sửa lịch dạy' : 'Thêm lịch dạy mới'}</DialogTitle>
              <DialogDescription>
                Điền thông tin chi tiết về buổi học
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tiêu đề buổi học</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ví dụ: React Components & Props"
                />
              </div>
              <div>
                <Label>Khóa học</Label>
                <Select value={formData.course} onValueChange={(value: string) => setFormData({...formData, course: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khóa học" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="React từ cơ bản đến nâng cao">React từ cơ bản đến nâng cao</SelectItem>
                    <SelectItem value="TypeScript cho người mới">TypeScript cho người mới</SelectItem>
                    <SelectItem value="Node.js Backend Development">Node.js Backend Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ngày học</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {formData.date.toLocaleDateString('vi-VN')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date: Date | undefined) => date && setFormData({...formData, date})}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giờ bắt đầu</Label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Giờ kết thúc</Label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Hình thức</Label>
                <Select value={formData.type} onValueChange={(value: 'online' | 'offline') => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Trực tuyến</SelectItem>
                    <SelectItem value="offline">Tại lớp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Địa điểm / Link</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder={formData.type === 'online' ? 'Zoom Meeting / Google Meet' : 'Phòng học'}
                />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Mô tả nội dung buổi học..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSaveSchedule}>
                {editingSchedule ? 'Cập nhật' : 'Tạo lịch'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng buổi học</p>
                <p className="text-2xl font-semibold">{schedules.length}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hôm nay</p>
                <p className="text-2xl font-semibold">{todaySchedules.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Trực tuyến</p>
                <p className="text-2xl font-semibold">{schedules.filter(s => s.type === 'online').length}</p>
              </div>
              <Video className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tại lớp</p>
                <p className="text-2xl font-semibold">{schedules.filter(s => s.type === 'offline').length}</p>
              </div>
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Lịch</CardTitle>
          </CardHeader>
          <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(value?: Date) => setSelectedDate(value)}
                      className="rounded-md border"
                    />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Có lịch dạy</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Lịch dạy - {selectedDate?.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaySchedules.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Không có lịch dạy nào trong ngày này</p>
                <Button className="mt-4" onClick={handleCreateSchedule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm lịch dạy
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {todaySchedules.map((schedule) => (
                  <div key={schedule.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{schedule.title}</h3>
                          <Badge variant={schedule.type === 'online' ? 'default' : 'secondary'}>
                            {schedule.type === 'online' ? 'Trực tuyến' : 'Tại lớp'}
                          </Badge>
                          {schedule.notified && (
                            <Badge variant="outline" className="text-green-600">
                              <Bell className="w-3 h-3 mr-1" />
                              Đã thông báo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{schedule.course}</p>
                        <p className="text-gray-700 mb-3">{schedule.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            {schedule.type === 'online' ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            {schedule.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {schedule.students} học sinh
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!schedule.notified && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleNotifyStudents(schedule.id)}
                          >
                            <Bell className="w-4 h-4 mr-1" />
                            Thông báo
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSchedule(schedule)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
