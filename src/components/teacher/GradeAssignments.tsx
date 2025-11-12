import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FileText, Download, User, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Mock data
const submissions = [
  {
    id: 1,
    studentName: 'Nguyễn Văn A',
    studentEmail: 'student1@example.com',
    assignment: 'Bài tập 1: React Hooks',
    course: 'Lập trình React',
    submittedAt: '2025-11-18 14:30',
    fileName: 'baitap1-react-hooks.zip',
    fileSize: '2.5 MB',
    note: 'Em đã hoàn thành bài tập theo yêu cầu',
    status: 'pending',
    score: null,
    feedback: null
  },
  {
    id: 2,
    studentName: 'Trần Thị B',
    studentEmail: 'student2@example.com',
    assignment: 'Bài tập 1: React Hooks',
    course: 'Lập trình React',
    submittedAt: '2025-11-19 09:15',
    fileName: 'react-hooks-assignment.pdf',
    fileSize: '1.8 MB',
    note: '',
    status: 'pending',
    score: null,
    feedback: null
  },
  {
    id: 3,
    studentName: 'Lê Văn C',
    studentEmail: 'student3@example.com',
    assignment: 'Bài tập 2: Component Patterns',
    course: 'Lập trình React',
    submittedAt: '2025-11-17 16:45',
    fileName: 'component-patterns.zip',
    fileSize: '3.2 MB',
    note: 'Em đã implement cả HOC và Render Props',
    status: 'graded',
    score: 9,
    feedback: 'Bài làm tốt! Code sạch và có comment rõ ràng.'
  }
];

export default function GradeAssignments() {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setScore('');
      setFeedback('');
    }, 1000);
  };

  const handleDownload = (fileName: string) => {
    alert(`Đang tải xuống file: ${fileName}`);
  };

  const renderSubmissionCard = (submission: any) => (
    <Card key={submission.id}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3>{submission.assignment}</h3>
              {submission.status === 'pending' ? (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Chưa chấm
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-700">Đã chấm</Badge>
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
                <p>{submission.note}</p>
              </div>
            )}

            {submission.status === 'graded' && (
              <div className="mt-3 p-3 bg-green-50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Điểm:</span>
                  <span className="text-xl text-green-600">{submission.score}/10</span>
                </div>
                {submission.feedback && (
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">Nhận xét:</p>
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
  return (
    <div className="p-8">
      <h1 className="mb-6">Chấm bài tập</h1>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl mb-1">{submissions.length}</p>
              <p className="text-sm text-gray-600">Tổng bài nộp</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl text-yellow-600 mb-1">{pendingCount}</p>
              <p className="text-sm text-gray-600">Chưa chấm</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl text-green-600 mb-1">{gradedCount}</p>
              <p className="text-sm text-gray-600">Đã chấm</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
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
        </TabsList> */

        <TabsContent value="pending" className="space-y-4 mt-6">
          {submissions.filter(s => s.status === 'pending').map(renderSubmissionCard)}
          {pendingCount === 0 && (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                Không có bài nào cần chấm
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4 mt-6"> 
          {submissions.filter(s => s.status === 'graded').map(renderSubmissionCard)}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 mt-6">
          {submissions.map(renderSubmissionCard)}
        </TabsContent>
      </Tabs>

      {/* Grade Dialog */}
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
