import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Download, Mail, Megaphone } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon, Upload, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';

// Mock data
const students = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'student1@example.com',
    course: 'Lập trình React',
    enrolledDate: '2025-01-15',
    progress: 85,
    status: 'active',
    averageScore: 8.5
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'student2@example.com',
    course: 'Lập trình React',
    enrolledDate: '2025-01-18',
    progress: 92,
    status: 'active',
    averageScore: 9.2
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'student3@example.com',
    course: 'Lập trình React',
    enrolledDate: '2025-01-10',
    progress: 100,
    status: 'completed',
    averageScore: 8.8
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'student4@example.com',
    course: 'Lập trình React',
    enrolledDate: '2025-02-01',
    progress: 45,
    status: 'active',
    averageScore: 7.5
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'student5@example.com',
    course: 'Thiết kế UI/UX',
    enrolledDate: '2025-01-20',
    progress: 70,
    status: 'active',
    averageScore: 8.0
  }
];

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState('');
  const [notifyContent, setNotifyContent] = useState('');
  const [notifyCourse, setNotifyCourse] = useState('all');
  const [notifyStatus, setNotifyStatus] = useState('all');
  const [minProgress, setMinProgress] = useState('');
  const [minScore, setMinScore] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [notifications, setNotifications] = useState<{id:number; title:string; date:string; recipients:number}[]>([]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleExport = () => {
    alert('Đang xuất danh sách học sinh...');
  };

  const handleSendEmail = (email: string) => {
    alert(`Gửi email đến: ${email}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Đang học</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700">Hoàn thành</Badge>;
      case 'inactive':
        return <Badge variant="outline">Chưa bắt đầu</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts[parts.length - 1][0] + (parts[0][0] || '');
  };

  const computedRecipients = () => {
    return students.filter(st => {
      const courseMatch = notifyCourse === 'all' || st.course === notifyCourse;
      const statusMatch = notifyStatus === 'all' || st.status === notifyStatus;
      const progressMatch = minProgress ? st.progress >= Number(minProgress) : true;
      const scoreMatch = minScore ? st.averageScore >= Number(minScore) : true;
      return courseMatch && statusMatch && progressMatch && scoreMatch;
    });
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyTitle.trim() || !notifyContent.trim()) {
      toast.error('Vui lòng nhập tiêu đề và nội dung thông báo');
      return;
    }
    const recipients = computedRecipients();
    if (recipients.length === 0) {
      toast.error('Không có học viên phù hợp với điều kiện lọc');
      return;
    }
    // Mock send
    toast.success(`Đã gửi thông báo tới ${recipients.length} học viên`);
    setNotifications(prev => [{ id: Date.now(), title: notifyTitle, date: new Date().toISOString(), recipients: recipients.length }, ...prev]);
    setNotifyOpen(false);
    setNotifyTitle('');
    setNotifyContent('');
    setAttachment(null);
    setScheduleDate(undefined);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1>Danh sách học sinh</h1>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Xuất danh sách
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setNotifyOpen(true)}>
            <Megaphone className="w-4 h-4" /> Thông báo
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo khóa học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khóa học</SelectItem>
                <SelectItem value="Lập trình React">Lập trình React</SelectItem>
                <SelectItem value="Thiết kế UI/UX">Thiết kế UI/UX</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang học</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="inactive">Chưa bắt đầu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {filteredStudents.length} học sinh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Học sinh</TableHead>
                <TableHead>Khóa học</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Tiến độ</TableHead>
                <TableHead>Điểm TB</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    {new Date(student.enrolledDate).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600">{student.averageScore}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSendEmail(student.email)}
                      className="gap-1"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Không tìm thấy học sinh nào
            </div>
          )}

          {/* Notification history */}
          {notifications.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold mb-3 text-gray-700">Lịch sử thông báo</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Ngày gửi</TableHead>
                    <TableHead>Người nhận</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map(n => (
                    <TableRow key={n.id}>
                      <TableCell>{n.title}</TableCell>
                      <TableCell>{new Date(n.date).toLocaleString('vi-VN')}</TableCell>
                      <TableCell>{n.recipients}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog gửi thông báo */}
      <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo thông báo mới</DialogTitle>
            <DialogDescription>Gửi thông báo đến học viên theo điều kiện lọc.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendNotification} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Khóa học</label>
                <Select value={notifyCourse} onValueChange={setNotifyCourse}>
                  <SelectTrigger><SelectValue placeholder="Chọn khóa học" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Lập trình React">Lập trình React</SelectItem>
                    <SelectItem value="Thiết kế UI/UX">Thiết kế UI/UX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Trạng thái học</label>
                <Select value={notifyStatus} onValueChange={setNotifyStatus}>
                  <SelectTrigger><SelectValue placeholder="Chọn trạng thái" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Đang học</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="inactive">Chưa bắt đầu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Min tiến độ (%)</label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={minProgress}
                  onChange={(e) => setMinProgress(e.target.value)}
                  placeholder="Ví dụ: 50"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Min điểm TB</label>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                  placeholder="Ví dụ: 7.5"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tiêu đề</label>
              <Input
                value={notifyTitle}
                onChange={(e) => setNotifyTitle(e.target.value)}
                placeholder="Ví dụ: Nhắc nhở hạn nộp bài tập 2"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nội dung</label>
              <Textarea
                value={notifyContent}
                onChange={(e) => setNotifyContent(e.target.value)}
                placeholder="Nhập nội dung thông báo chi tiết..."
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Lên lịch gửi (tùy chọn)</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduleDate ? format(scheduleDate, 'PPP', { locale: vi }) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={scheduleDate} onSelect={setScheduleDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium">Đính kèm (tùy chọn)</label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                  <input type="file" id="notify-attachment" className="hidden" onChange={handleAttachmentChange} />
                  <label htmlFor="notify-attachment" className="cursor-pointer">
                    {attachment ? (
                      <div className="space-y-1">
                        <FileText className="w-8 h-8 mx-auto text-blue-600" />
                        <p className="text-xs">{attachment.name}</p>
                        <p className="text-[10px] text-gray-500">{(attachment.size/1024/1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-xs text-gray-600">Nhấn để đính kèm tài liệu</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Sẽ gửi tới: <span className="font-medium">{computedRecipients().length}</span> học viên phù hợp.
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setNotifyOpen(false)}>Hủy</Button>
              <Button type="submit">Gửi thông báo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
