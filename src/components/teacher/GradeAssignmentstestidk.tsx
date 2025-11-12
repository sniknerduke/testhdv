import { useState } from 'react';
// Import các component shadcn/ui bạn đã dùng
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
// Import các component mới
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  FileText,
  Download,
  User,
  Calendar,
  ArrowLeft,
  Edit,
  Save,
  FileDown,
  BookOpen,
  Eye,
} from 'lucide-react';
// Import thư viện biểu đồ
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// --- 1. KIỂU DỮ LIỆU & DATA MỚI CHO SỔ ĐIỂM ---

// Kiểu dữ liệu cho điểm số
interface Grade {
  regular1: number | null;
  regular2: number | null;
  final: number | null;
}

// Kiểu dữ liệu cho sinh viên
interface Student {
  id: string; // Mã SV
  name: string; // Họ tên
  grades: Grade; // Các cột điểm
  submissions: {
    // Cột "Trạng thái chấm"
    graded: number;
    total: number;
  };
}

// Kiểu dữ liệu cho môn học
interface Subject {
  id: string;
  name: string; // Tên môn học
  code: string; // Mã môn học
  studentList: Student[];
}

// DATA MẪU MỚI: Danh sách môn học
const mockSubjects: Subject[] = [
  {
    id: 'SUBJ101',
    name: 'Lập trình React',
    code: 'CS464',
    studentList: [
      { id: 'SV001', name: 'Nguyễn Văn A', grades: { regular1: 8, regular2: 7, final: null }, submissions: { graded: 2, total: 3 } },
      { id: 'SV002', name: 'Trần Thị B', grades: { regular1: 9, regular2: 9, final: 9 }, submissions: { graded: 3, total: 3 } },
      { id: 'SV003', name: 'Lê Văn C', grades: { regular1: 6, regular2: null, final: null }, submissions: { graded: 1, total: 3 } },
      { id: 'SV004', name: 'Phạm Thị D', grades: { regular1: 7, regular2: 8, final: 7 }, submissions: { graded: 3, total: 3 } },
      { id: 'SV005', name: 'Hoàng Văn E', grades: { regular1: 5, regular2: 6, final: null }, submissions: { graded: 2, total: 3 } },
    ]
  },
  {
    id: 'SUBJ102',
    name: 'Cơ sở dữ liệu',
    code: 'IT320',
    studentList: [
      { id: 'SV006', name: 'Vũ Thị F', grades: { regular1: 10, regular2: 9, final: 9 }, submissions: { graded: 2, total: 2 } },
      { id: 'SV007', name: 'Đặng Văn G', grades: { regular1: 7, regular2: 8, final: null }, submissions: { graded: 1, total: 2 } },
    ]
  },
  { id: 'SUBJ103', name: 'Trí tuệ Nhân tạo', code: 'AI101', studentList: [] }
];

// DATA MẪU MỚI: Dữ liệu cho biểu đồ
const gradeDistributionData = [
  { range: '0-2', 'Số lượng': 1 },
  { range: '2-4', 'Số lượng': 0 },
  { range: '4-6', 'Số lượng': 2 },
  { range: '6-8', 'Số lượng': 5 },
  { range: '8-10', 'Số lượng': 3 },
];

// --- 2. DATA MẪU GỐC CỦA BẠN (DÙNG CHO DIALOG "XEM BÀI") ---
const submissions = [
  // ... (giữ nguyên data 'submissions' của bạn) ...
  { id: 1, studentName: 'Nguyễn Văn A', studentEmail: 'student1@example.com', assignment: 'Bài tập 1: React Hooks', course: 'Lập trình React', submittedAt: '2025-11-18 14:30', fileName: 'baitap1-react-hooks.zip', fileSize: '2.5 MB', note: 'Em đã hoàn thành bài tập theo yêu cầu', status: 'pending', score: null, feedback: null },
  { id: 2, studentName: 'Trần Thị B', studentEmail: 'student2@example.com', assignment: 'Bài tập 1: React Hooks', course: 'Lập trình React', submittedAt: '2025-11-19 09:15', fileName: 'react-hooks-assignment.pdf', fileSize: '1.8 MB', note: '', status: 'pending', score: null, feedback: null },
  { id: 3, studentName: 'Lê Văn C', studentEmail: 'student3@example.com', assignment: 'Bài tập 2: Component Patterns', course: 'Lập trình React', submittedAt: '2025-11-17 16:45', fileName: 'component-patterns.zip', fileSize: '3.2 MB', note: 'Em đã implement cả HOC và Render Props', status: 'graded', score: 9, feedback: 'Bài làm tốt! Code sạch và có comment rõ ràng.' }
];


export default function GradeAssignments() {
  // --- 3. STATE MỚI (CHO SỔ ĐIỂM) ---
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewSubmissionsDialogOpen, setViewSubmissionsDialogOpen] = useState(false);
  const [selectedStudentForSubmissions, setSelectedStudentForSubmissions] = useState<Student | null>(null);

  // --- 4. STATE GỐC CỦA BẠN (DÙNG CHO DIALOG) ---
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 5. LOGIC GỐC CỦA BẠN (DÙNG CHO DIALOG) ---
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;

  const handleGrade = (submission: any) => {
    setSelectedSubmission(submission);
    setScore(submission.score?.toString() || '');
    setFeedback(submission.feedback || '');
    setGradeDialogOpen(true);
  };

  const handleSubmitGrade = () => {
    if (!score) {
      // Thay vì alert, ta có thể dùng một component toast/alert của shadcn
      alert('Vui lòng nhập điểm');
      return;
    }
    const scoreNum = parseFloat(score);
    if (scoreNum < 0 || scoreNum > 10) {
      alert('Điểm phải từ 0 đến 10');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setGradeDialogOpen(false);
      alert('Đã chấm điểm thành công!');
      // TODO: Cập nhật lại state 'submissions'
      setScore('');
      setFeedback('');
    }, 1000);
  };

  const handleDownload = (fileName: string) => {
    alert(`Đang tải xuống file: ${fileName}`);
  };

  // --- 6. LOGIC MỚI (CHO SỔ ĐIỂM) ---

  // Chọn môn học
  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    // Sao chép dữ liệu để chỉnh sửa
    setStudentData(JSON.parse(JSON.stringify(subject.studentList)));
    setIsEditing(false);
  };

  // Quay lại danh sách môn học
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  // Thay đổi điểm trong bảng
  const handleGradeChange = (studentId: string, gradeType: keyof Grade, value: string) => {
    setStudentData(prevData =>
      prevData.map(student =>
        student.id === studentId
          ? {
            ...student,
            grades: {
              ...student.grades,
              [gradeType]: value === '' ? null : parseFloat(value),
            },
          }
          : student
      )
    );
  };

  // Bật/tắt chế độ sửa
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    // TODO: Gọi API để lưu `studentData` vào database
    console.log('Đang lưu dữ liệu:', studentData);
    alert('Đã lưu thông tin (vào Database)!');
  };

  // Xuất file
  const handleExport = () => {
    // TODO: Thêm logic xuất file (text, pdf, word)
    const dataString = JSON.stringify(studentData, null, 2);
    alert(`Dữ liệu xuất:\n${dataString}`);
  };

  // Mở dialog "Xem bài"
  const handleViewSubmissions = (student: Student) => {
    setSelectedStudentForSubmissions(student);
    setViewSubmissionsDialogOpen(true);
  };


  // --- 7. RENDER FUNCTIONS ---

  // HÀM RENDER GỐC CỦA BẠN (DÙNG CHO DIALOG)
  const renderSubmissionCard = (submission: any) => (
    <Card key={submission.id}>
      <CardContent className="p-6">
        {/* ... (giữ nguyên 100% code 'renderSubmissionCard' của bạn) ... */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{submission.assignment}</h3>
              {submission.status === 'pending' ? (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Chưa chấm
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Đã chấm</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{submission.course}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span>{submission.studentName}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{submission.studentEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Nộp lúc: {submission.submittedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{submission.fileName}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{submission.fileSize}</span>
              </div>
            </div>

            {submission.note && (
              <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                <p className="text-gray-600 mb-1">Ghi chú từ học sinh:</p>
                <p className="italic">{submission.note}</p>
              </div>
            )}

            {submission.status === 'graded' && (
              <div className="mt-3 p-3 bg-green-50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Điểm:</span>
                  <span className="text-xl font-bold text-green-600">{submission.score}/10</span>
                </div>
                {submission.feedback && (
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1 font-medium">Nhận xét:</p>
                    <p>{submission.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleDownload(submission.fileName)}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Tải bài làm
          </Button>
          <Button onClick={() => handleGrade(submission)}>
            {submission.status === 'graded' ? 'Chấm lại' : 'Chấm điểm'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // HÀM RENDER MỚI: Màn hình chọn môn học
  const renderSubjectSelection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trang chấm điểm</h1>
      <h2 className="text-xl font-semibold mb-4">Chọn môn học để vào sổ điểm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSubjects.map(subject => (
          <Card
            key={subject.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSelectSubject(subject)}
          >
            <CardHeader>
              <CardTitle className="text-blue-700">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{subject.code}</p>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span>{subject.studentList.length} sinh viên</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // HÀM RENDER MỚI: Màn hình sổ điểm (bảng điểm)
  const renderGradebook = () => (
    <div>
      <Button
        variant="ghost"
        onClick={handleBackToSubjects}
        className="mb-4 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại chọn môn
      </Button>
      <h1 className="text-3xl font-bold mb-6">
        Sổ điểm môn: {selectedSubject?.name}
      </h1>

      {/* Bảng điểm */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã SV</TableHead>
                <TableHead>Họ và Tên</TableHead>
                <TableHead>Trạng thái chấm</TableHead>
                <TableHead>Thường xuyên 1</TableHead>
                <TableHead>Thường xuyên 2</TableHead>
                <TableHead>Kết thúc HP</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.submissions.graded === student.submissions.total
                          ? 'default'
                          : 'outline'
                      }
                      className={
                        student.submissions.graded === student.submissions.total
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {student.submissions.graded}/{student.submissions.total} bài
                    </Badge>
                  </TableCell>
                  
                  {/* Cột điểm: Hiển thị Input hoặc Text tùy theo state 'isEditing' */}
                  {(['regular1', 'regular2', 'final'] as const).map(gradeType => (
                    <TableCell key={gradeType}>
                      {isEditing ? (
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={student.grades[gradeType] ?? ''}
                          onChange={(e) => handleGradeChange(student.id, gradeType, e.target.value)}
                          className="w-24"
                        />
                      ) : (
                        <span>{student.grades[gradeType] ?? 'N/A'}</span>
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleViewSubmissions(student)}
                    >
                      <Eye className="w-4 h-4" />
                      Xem bài
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Các nút hành động (Lưu, Sửa, Xuất) */}
      <div className="mt-6 flex gap-3">
        {isEditing ? (
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Lưu (vào Database)
          </Button>
        ) : (
          <Button onClick={handleEdit} className="gap-2">
            <Edit className="w-4 h-4" />
            Sửa điểm
          </Button>
        )}
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <FileDown className="w-4 h-4" />
          Xuất File (PDF/Word...)
        </Button>
      </div>

      {/* Biểu đồ */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Biểu đồ Phổ điểm</CardTitle>
          <DialogDescription>
            Biểu đồ đường biểu diễn phân bố điểm số của sinh viên
          </DialogDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gradeDistributionData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Số lượng" stroke="#1d4ed8" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );


  // --- 8. MAIN RETURN (LỰA CHỌN VIEW) ---
  return (
    <div className="p-4 md:p-8">
      {/* Lựa chọn hiển thị: Danh sách môn học hoặc Sổ điểm */}
      {!selectedSubject ? renderSubjectSelection() : renderGradebook()}


      {/* --- DIALOG "XEM BÀI" --- */}
      {/* Đây là nơi chứa TOÀN BỘ COMPONENT GỐC CỦA BẠN */}
      <Dialog open={viewSubmissionsDialogOpen} onOpenChange={setViewSubmissionsDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Danh sách bài nộp của: {selectedStudentForSubmissions?.name}
            </DialogTitle>
            <DialogDescription>
              Môn học: {selectedSubject?.name}
            </DialogDescription>
          </DialogHeader>

          {/* Stats Cards (từ code gốc của bạn, bỏ comment) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold mb-1">{submissions.length}</p>
                  <p className="text-sm text-gray-600">Tổng bài nộp</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600 mb-1">{pendingCount}</p>
                  <p className="text-sm text-gray-600">Chưa chấm</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 mb-1">{gradedCount}</p>
                  <p className="text-sm text-gray-600">Đã chấm</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs (từ code gốc của bạn, bỏ comment) */}
          <Tabs defaultValue="pending" className="flex-1 flex flex-col overflow-hidden">
            <TabsList>
              <TabsTrigger value="pending">
                Chưa chấm ({pendingCount})
              </TabsTrigger>
              <TabsTrigger value="graded">
                Đã chấm ({gradedCount})
              </TabsTrigger>
              <TabsTrigger value="all">
                Tất cả ({submissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="flex-1 overflow-y-auto space-y-4 mt-4 p-1">
              {submissions.filter(s => s.status === 'pending').map(renderSubmissionCard)}
              {pendingCount === 0 && (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    Không có bài nào cần chấm
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="graded" className="flex-1 overflow-y-auto space-y-4 mt-4 p-1">
              {submissions.filter(s => s.status === 'graded').map(renderSubmissionCard)}
            </TabsContent>

            <TabsContent value="all" className="flex-1 overflow-y-auto space-y-4 mt-4 p-1">
              {submissions.map(renderSubmissionCard)}
            </TabsContent>
          </Tabs>

        </DialogContent>
      </Dialog>

      {/* --- DIALOG "CHẤM ĐIỂM" (TỪ CODE GỐC CỦA BẠN) --- */}
      {/* Dialog này được gọi từ bên trong 'renderSubmissionCard' */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chấm điểm bài tập</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.studentName} - {selectedSubmission?.assignment}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Điểm (0-10)</Label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Nhập điểm"
              />
            </div>
            <div>
              <Label>Nhận xét</Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Nhập nhận xét cho học sinh..."
                rows={5}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setGradeDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitGrade}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang lưu...' : 'Lưu điểm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}