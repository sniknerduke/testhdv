import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Upload, FileText, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

// Mock data
const assignments = [
  {
    id: 1,
    title: 'Bài tập 1: Giới thiệu về React Hooks',
    course: 'Lập trình React từ cơ bản đến nâng cao',
    deadline: '2025-11-20',
    maxScore: 10,
    description: 'Tạo một ứng dụng đơn giản sử dụng useState và useEffect',
    status: 'submitted',
    score: 9,
    feedback: 'Bài làm tốt! Có thể cải thiện phần error handling.'
  },
  {
    id: 2,
    title: 'Bài tập 2: Component Design Patterns',
    course: 'Lập trình React từ cơ bản đến nâng cao',
    deadline: '2025-11-25',
    maxScore: 10,
    description: 'Implement HOC và Render Props patterns',
    status: 'pending',
    score: null,
    feedback: null
  },
  {
    id: 3,
    title: 'Bài tập 3: State Management',
    course: 'Lập trình React từ cơ bản đến nâng cao',
    deadline: '2025-11-15',
    maxScore: 10,
    description: 'Tạo ứng dụng todo list với Context API',
    status: 'overdue',
    score: null,
    feedback: null
  }
];

export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  const handleSubmit = (assignment: any) => {
    setSelectedAssignment(assignment);
    setSubmitDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitAssignment = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitDialogOpen(false);
      setSelectedFile(null);
      setSubmissionText('');
      alert('Nộp bài thành công!');
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-700">Đã nộp</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-700">Đã chấm</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700">Quá hạn</Badge>;
      default:
        return <Badge variant="outline">Chưa nộp</Badge>;
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="p-8">
      <h1 className="mb-6">Bài tập của tôi</h1>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{assignment.title}</h3>
                    {getStatusBadge(assignment.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Hạn: {new Date(assignment.deadline).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Điểm tối đa: {assignment.maxScore}</span>
                    </div>
                  </div>
                </div>

                {assignment.score !== null && (
                  <div className="text-right">
                    <div className="text-2xl text-green-600 mb-1">
                      {assignment.score}/{assignment.maxScore}
                    </div>
                    <p className="text-xs text-gray-600">Điểm đạt được</p>
                  </div>
                )}
              </div>

              {assignment.status === 'submitted' && assignment.score === null && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Bài tập đang được chấm điểm. Vui lòng chờ phản hồi từ giảng viên.
                  </AlertDescription>
                </Alert>
              )}

              {assignment.feedback && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Nhận xét:</strong> {assignment.feedback}
                  </AlertDescription>
                </Alert>
              )}

              {assignment.status === 'overdue' && (
                <Alert className="mb-4 bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Bài tập đã quá hạn nộp
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleViewDetails(assignment)}>
                  Xem chi tiết
                </Button>
                {assignment.status !== 'submitted' && !isOverdue(assignment.deadline) && (
                  <Button onClick={() => handleSubmit(assignment)}>
                    Nộp bài
                  </Button>
                )}
                {assignment.status === 'submitted' && (
                  <Button variant="outline" onClick={() => handleSubmit(assignment)}>
                    Nộp lại
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title}</DialogTitle>
            <DialogDescription>{selectedAssignment?.course}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Mô tả bài tập</Label>
              <p className="text-sm text-gray-600 mt-1">{selectedAssignment?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hạn nộp</Label>
                <p className="text-sm">{selectedAssignment?.deadline && new Date(selectedAssignment.deadline).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <Label>Điểm tối đa</Label>
                <p className="text-sm">{selectedAssignment?.maxScore}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit Assignment Dialog */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nộp bài tập</DialogTitle>
            <DialogDescription>{selectedAssignment?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tải lên file bài làm</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <FileText className="w-12 h-12 mx-auto text-blue-600" />
                      <p className="text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Click để chọn file</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, ZIP (Tối đa 50MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <Label>Ghi chú (tùy chọn)</Label>
              <Textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Nhập ghi chú về bài làm của bạn..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSubmitDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitAssignment}
                disabled={!selectedFile || isSubmitting}
              >
                {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}