import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Users, BookOpen, Clock, DollarSign, Eye, FileDown, CalendarIcon, Upload, FileText } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  students: number;
  status: 'published' | 'draft';
}

type StudentStatus = 'not-started' | 'in-progress' | 'completed';

interface Student {
  id: number;
  name: string;
  email: string;
  enrolledAt: string; // ISO or display date
  status: StudentStatus;
}

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'React từ cơ bản đến nâng cao',
      description: 'Khóa học React toàn diện từ cơ bản đến nâng cao với các dự án thực tế',
      category: 'Programming',
      level: 'Intermediate',
      price: 1500000,
      duration: '40 giờ',
      students: 245,
      status: 'published'
    },
    {
      id: 2,
      title: 'TypeScript cho người mới',
      description: 'Học TypeScript từ đầu với các ví dụ thực tế',
      category: 'Programming',
      level: 'Beginner',
      price: 1200000,
      duration: '30 giờ',
      students: 180,
      status: 'published'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      description: 'Xây dựng RESTful API và ứng dụng backend với Node.js',
      category: 'Programming',
      level: 'Advanced',
      price: 2000000,
      duration: '50 giờ',
      students: 156,
      status: 'draft'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    level: 'Beginner',
    price: 0,
    duration: '',
    status: 'draft' as 'published' | 'draft'
  });

  // Mock enrolled students per course
  const studentRegistry: Record<number, Student[]> = {
    1: [
      { id: 101, name: 'Nguyễn Văn A', email: 'a.nguyen@example.com', enrolledAt: '2025-08-02', status: 'in-progress' },
      { id: 102, name: 'Trần Thị B', email: 'b.tran@example.com', enrolledAt: '2025-08-05', status: 'completed' },
      { id: 103, name: 'Lê Văn C', email: 'c.le@example.com', enrolledAt: '2025-08-10', status: 'not-started' },
      { id: 104, name: 'Phạm Thị D', email: 'd.pham@example.com', enrolledAt: '2025-08-12', status: 'in-progress' },
      { id: 105, name: 'Hoàng Văn E', email: 'e.hoang@example.com', enrolledAt: '2025-08-14', status: 'completed' },
    ],
    2: [
      { id: 201, name: 'Bùi Minh F', email: 'f.bui@example.com', enrolledAt: '2025-07-20', status: 'completed' },
      { id: 202, name: 'Đỗ Thu G', email: 'g.do@example.com', enrolledAt: '2025-07-22', status: 'in-progress' },
      { id: 203, name: 'Phan Anh H', email: 'h.phan@example.com', enrolledAt: '2025-07-23', status: 'in-progress' },
      { id: 204, name: 'Võ Thị I', email: 'i.vo@example.com', enrolledAt: '2025-07-28', status: 'not-started' },
    ],
    3: [
      { id: 301, name: 'Trịnh Quốc K', email: 'k.trinh@example.com', enrolledAt: '2025-06-03', status: 'in-progress' },
      { id: 302, name: 'Phùng Gia L', email: 'l.phung@example.com', enrolledAt: '2025-06-05', status: 'not-started' },
    ],
  };

  // State for View Students dialog
  const [studentsDialogOpen, setStudentsDialogOpen] = useState(false);
  const [studentsCourse, setStudentsCourse] = useState<Course | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentStatus, setStudentStatus] = useState<'all' | StudentStatus>('all');

  const currentStudents: Student[] = studentsCourse ? (studentRegistry[studentsCourse.id] || []) : [];
  const filteredStudents = currentStudents.filter((s) => {
    const matchesSearch = `${s.name} ${s.email}`.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesStatus = studentStatus === 'all' ? true : s.status === studentStatus;
    return matchesSearch && matchesStatus;
  });

  const openStudents = (course: Course) => {
    setStudentsCourse(course);
    setStudentSearch('');
    setStudentStatus('all');
    setStudentsDialogOpen(true);
  };

  const exportStudentsCSV = () => {
    if (!studentsCourse) return;
    const rows: string[] = [];
    rows.push('Họ tên,Email,Ngày đăng ký,Trạng thái');
    filteredStudents.forEach((s) => {
      const statusLabel = s.status === 'completed' ? 'Hoàn thành' : s.status === 'in-progress' ? 'Đang học' : 'Chưa bắt đầu';
      rows.push(`${s.name},${s.email},${s.enrolledAt},${statusLabel}`);
    });
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-course-${studentsCourse.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // State for Create Assignment dialog
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [assignmentCourse, setAssignmentCourse] = useState<Course | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    maxScore: '10',
    allowResubmit: true,
  });
  const [assignmentDeadline, setAssignmentDeadline] = useState<Date | undefined>(undefined);
  const [attachment, setAttachment] = useState<File | null>(null);

  const openAssignment = (course: Course) => {
    setAssignmentCourse(course);
    setAssignmentForm({ title: '', description: '', maxScore: '10', allowResubmit: true });
    setAssignmentDeadline(undefined);
    setAttachment(null);
    setAssignmentDialogOpen(true);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const submitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentCourse) {
      toast.error('Vui lòng chọn khóa học hợp lệ.');
      return;
    }
    if (!assignmentDeadline) {
      toast.error('Vui lòng chọn hạn nộp.');
      return;
    }
    // Mock success
    toast.success(`Đã tạo bài tập cho khóa: ${assignmentCourse.title}`);
    setAssignmentDialogOpen(false);
  };

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      category: 'Programming',
      level: 'Beginner',
      price: 0,
      duration: '',
      status: 'draft'
    });
    setIsDialogOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: course.price,
      duration: course.duration,
      status: course.status
    });
    setIsDialogOpen(true);
  };

  const handleSaveCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(c => 
        c.id === editingCourse.id 
          ? { ...c, ...formData }
          : c
      ));
      toast.success('Cập nhật khóa học thành công!');
    } else {
      const newCourse: Course = {
        id: Date.now(),
        ...formData,
        students: 0
      };
      setCourses([...courses, newCourse]);
      toast.success('Tạo khóa học thành công!');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      setCourses(courses.filter(c => c.id !== id));
      toast.success('Xóa khóa học thành công!');
    }
  };

  const handlePublishCourse = (id: number) => {
    setCourses(courses.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'published' ? 'draft' : 'published' }
        : c
    ));
    toast.success('Cập nhật trạng thái khóa học thành công!');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2">Quản lý khóa học</h1>
          <p className="text-gray-600">Tạo và quản lý các khóa học của bạn</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateCourse}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo khóa học mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}</DialogTitle>
              <DialogDescription>
                Điền thông tin chi tiết về khóa học của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tên khóa học</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ví dụ: React từ cơ bản đến nâng cao"
                />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Mô tả chi tiết về khóa học..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Danh mục</Label>
                  <Select value={formData.category} onValueChange={(value: string) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Lập trình</SelectItem>
                      <SelectItem value="Design">Thiết kế</SelectItem>
                      <SelectItem value="Business">Kinh doanh</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cấp độ</Label>
                  <Select value={formData.level} onValueChange={(value: string) => setFormData({...formData, level: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Cơ bản</SelectItem>
                      <SelectItem value="Intermediate">Trung cấp</SelectItem>
                      <SelectItem value="Advanced">Nâng cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giá (VNĐ)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    placeholder="1500000"
                  />
                </div>
                <div>
                  <Label>Thời lượng</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="40 giờ"
                  />
                </div>
              </div>
              <div>
                <Label>Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value: 'published' | 'draft') => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                    <SelectItem value="published">Đã xuất bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSaveCourse}>
                {editingCourse ? 'Cập nhật' : 'Tạo khóa học'}
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
                <p className="text-sm text-gray-600 mb-1">Tổng khóa học</p>
                <p className="text-2xl font-semibold">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã xuất bản</p>
                <p className="text-2xl font-semibold">{courses.filter(c => c.status === 'published').length}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng học sinh</p>
                <p className="text-2xl font-semibold">{courses.reduce((acc, c) => acc + c.students, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Doanh thu ước tính</p>
                <p className="text-2xl font-semibold">
                  {(courses.reduce((acc, c) => acc + (c.price * c.students), 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{course.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.students} học sinh
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {course.price.toLocaleString('vi-VN')} VNĐ
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAssignment(course)}
                  >
                    <FileText className="w-4 h-4 mr-1" /> Bài tập
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openStudents(course)}
                  >
                    <Users className="w-4 h-4 mr-1" /> Học viên
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublishCourse(course.id)}
                  >
                    {course.status === 'published' ? 'Ẩn' : 'Xuất bản'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có khóa học nào</h3>
            <p className="text-gray-600 mb-4">Tạo khóa học đầu tiên của bạn để bắt đầu giảng dạy</p>
            <Button onClick={handleCreateCourse}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo khóa học mới
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialog: Danh sách học viên của khóa */}
      <Dialog open={studentsDialogOpen} onOpenChange={setStudentsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Danh sách học viên{studentsCourse ? ` - ${studentsCourse.title}` : ''}
            </DialogTitle>
            <DialogDescription>
              Xem, lọc, tìm kiếm và xuất danh sách học viên đã đăng ký khóa học.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <Input
              placeholder="Tìm theo tên hoặc email..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
            <Select value={studentStatus} onValueChange={(v: 'all' | StudentStatus) => setStudentStatus(v)}>
              <SelectTrigger><SelectValue placeholder="Trạng thái" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="not-started">Chưa bắt đầu</SelectItem>
                <SelectItem value="in-progress">Đang học</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end">
              <Button variant="outline" className="inline-flex items-center gap-2" onClick={exportStudentsCSV}>
                <FileDown className="w-4 h-4" /> Xuất CSV
              </Button>
            </div>
          </div>
          <div className="border rounded-md">
            <StudentsTable students={filteredStudents} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStudentsDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Tạo bài tập (bê UI từ CreateAssignment) */}
      <Dialog open={assignmentDialogOpen} onOpenChange={setAssignmentDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo bài tập mới</DialogTitle>
            <DialogDescription>
              Giao bài tập cho học viên trong khóa học đã chọn
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitAssignment} className="space-y-6">
            <div>
              <Label>Khóa học</Label>
              <Input value={assignmentCourse?.title || ''} readOnly disabled />
            </div>

            <div>
              <Label>Tiêu đề bài tập</Label>
              <Input
                value={assignmentForm.title}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                placeholder="Ví dụ: Bài tập 1: React Hooks"
                required
              />
            </div>

            <div>
              <Label>Mô tả yêu cầu</Label>
              <Textarea
                value={assignmentForm.description}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                placeholder="Nhập mô tả chi tiết về yêu cầu bài tập..."
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hạn nộp</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {assignmentDeadline ? (
                        format(assignmentDeadline, 'PPP', { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={assignmentDeadline} onSelect={setAssignmentDeadline} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Điểm tối đa</Label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={assignmentForm.maxScore}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, maxScore: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Tài liệu đính kèm (tùy chọn)</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                <input type="file" id="assignment-file" className="hidden" onChange={handleAttachmentChange} />
                <label htmlFor="assignment-file" className="cursor-pointer">
                  {attachment ? (
                    <div className="space-y-2">
                      <FileText className="w-12 h-12 mx-auto text-blue-600" />
                      <p className="text-sm">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Click để đính kèm file mẫu hoặc tài liệu hướng dẫn</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, ZIP (Tối đa 50MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allow-resubmit"
                checked={assignmentForm.allowResubmit}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, allowResubmit: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="allow-resubmit" className="cursor-pointer">Cho phép học sinh nộp lại bài</Label>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setAssignmentDialogOpen(false)}>Hủy</Button>
              <Button type="submit">Tạo bài tập</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sub-component: Students Table
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

function StatusBadge({ status }: { status: StudentStatus }) {
  const map = {
    'not-started': { label: 'Chưa bắt đầu', className: 'bg-gray-100 text-gray-700' },
    'in-progress': { label: 'Đang học', className: 'bg-blue-100 text-blue-700' },
    'completed': { label: 'Hoàn thành', className: 'bg-green-100 text-green-700' },
  } as const;
  const info = map[status];
  return <Badge className={info.className}>{info.label}</Badge>;
}

function StudentsTable({ students }: { students: Student[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Họ tên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Ngày đăng ký</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500 py-6">Không có học viên phù hợp</TableCell>
          </TableRow>
        ) : (
          students.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{new Date(s.enrolledAt).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>
                <StatusBadge status={s.status} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
