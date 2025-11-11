import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { PlayCircle, ChevronLeft, ChevronRight, Check, Lock, Video, FileText as FileTextIcon, Link as LinkIcon, MessageSquare, NotebookPen, Tv } from 'lucide-react';

interface Resource { type: 'pdf' | 'link' | 'file'; name: string; url: string }
interface Lesson {
  id: number;
  title: string;
  duration?: string;
  locked?: boolean;
  completed?: boolean;
  hasLive?: boolean;
  liveLink?: string;
  resources?: Resource[];
}

interface CourseWithLessons {
  id: number;
  title: string;
  instructor?: string;
  lessons?: Lesson[];
  currentLessonId?: number;
}

interface CourseContentProps {
  course: CourseWithLessons | null;
}

export default function CourseContent({ course }: CourseContentProps) {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(course?.currentLessonId ?? course?.lessons?.[0]?.id ?? null);
  const lessons = useMemo(() => course?.lessons ?? [], [course]);
  const activeLesson = useMemo(() => lessons.find(l => l.id === activeLessonId) || null, [lessons, activeLessonId]);
  const storageKey = course ? `edu_progress_${course.id}` : '';
  const notesKey = course && activeLesson ? `edu_notes_${course.id}_${activeLesson.id}` : '';

  const [notes, setNotes] = useState<string>('');
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (!course || !storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeLessonId) setActiveLessonId(parsed.activeLessonId);
      }
    } catch {}
  }, [storageKey, course]);

  useEffect(() => {
    if (!course || !storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ activeLessonId }));
    } catch {}
  }, [activeLessonId, storageKey, course]);

  useEffect(() => {
    if (!notesKey) return;
    try {
      const saved = localStorage.getItem(notesKey);
      setNotes(saved ?? '');
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesKey]);

  useEffect(() => {
    if (!notesKey) return;
    try { localStorage.setItem(notesKey, notes); } catch {}
  }, [notes, notesKey]);

  if (!course) return <div className="p-8">Vui lòng chọn khóa học</div>;

  const goPrev = () => {
    if (!activeLesson) return;
    const idx = lessons.findIndex(l => l.id === activeLesson.id);
    if (idx > 0) setActiveLessonId(lessons[idx - 1].id);
  };
  const goNext = () => {
    if (!activeLesson) return;
    const idx = lessons.findIndex(l => l.id === activeLesson.id);
    if (idx < lessons.length - 1) setActiveLessonId(lessons[idx + 1].id);
  };

  const tryActivate = (lesson: Lesson) => {
    if (lesson.locked) {
      toast.message('Bài học này đang khóa. Hãy hoàn thành bài trước.');
      return;
    }
    setActiveLessonId(lesson.id);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main player and controls */}
        <div className="lg:col-span-8">
          <Card className="mb-4 overflow-hidden">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="mb-1">{course.title}</h2>
                  <p className="text-sm text-gray-600">{activeLesson ? activeLesson.title : 'Chọn bài học để bắt đầu'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={goPrev}><ChevronLeft className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={goNext}><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {activeLesson?.hasLive && (
                  <Button onClick={() => setZoomOpen(true)} className="inline-flex items-center gap-2">
                    <Video className="w-4 h-4" /> Vào phòng Zoom
                  </Button>
                )}
                <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                  <Tv className="w-4 h-4" /> Chế độ tập trung
                </Button>
                <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                  <NotebookPen className="w-4 h-4" /> Ghi chú nhanh
                </Button>
                <div className="ml-auto text-sm text-gray-500">{activeLesson?.duration}</div>
              </div>
            </CardContent>
          </Card>

          {/* Resource panel */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <Tabs defaultValue="desc">
                <TabsList>
                  <TabsTrigger value="desc">Mô tả</TabsTrigger>
                  <TabsTrigger value="materials">Tài liệu</TabsTrigger>
                  <TabsTrigger value="notes">Ghi chú của tôi</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                </TabsList>
                <TabsContent value="desc" className="mt-3 text-sm text-gray-700">
                  {activeLesson ? (
                    <p>Bài học: {activeLesson.title}. Nội dung chi tiết sẽ được cập nhật.</p>
                  ) : (
                    <p>Hãy chọn một bài học để xem nội dung.</p>
                  )}
                </TabsContent>
                <TabsContent value="materials" className="mt-3">
                  {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                    <ul className="space-y-2">
                      {activeLesson.resources.map((r, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-3 p-2 rounded hover:bg-gray-50">
                          <div className="flex items-center gap-2">
                            {r.type === 'pdf' ? <FileTextIcon className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                            <span className="text-sm">{r.name}</span>
                          </div>
                          <a href={r.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Mở</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">Chưa có tài liệu.</p>
                  )}
                </TabsContent>
                <TabsContent value="notes" className="mt-3">
                  <Textarea rows={6} placeholder="Ghi chú của bạn cho bài học này..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                  <p className="text-xs text-gray-500 mt-1">Ghi chú sẽ tự động lưu trên thiết bị.</p>
                </TabsContent>
                <TabsContent value="qa" className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Thảo luận bài học</span>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Đặt câu hỏi của bạn..." />
                    <Button>Gửi</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Tính năng thảo luận sẽ kết nối với diễn đàn trong phiên bản sau.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar lessons */}
        <div className="lg:col-span-4">
          <Card>
            <CardContent className="p-0">
              <div className="px-4 py-3 border-b"><h3 className="text-base font-medium">Danh sách bài học</h3></div>
              <ul className="max-h-[60vh] overflow-y-auto">
                {lessons.map((l) => {
                  const isActive = l.id === activeLessonId;
                  return (
                    <li key={l.id}>
                      <button
                        className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-50 ${isActive ? 'bg-blue-50' : ''}`}
                        onClick={() => tryActivate(l)}
                      >
                        <div className="flex items-center gap-3">
                          {l.locked ? (
                            <Lock className="w-4 h-4 text-gray-400" />
                          ) : l.completed ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-blue-600" />
                          )}
                          <div>
                            <div className="text-sm font-medium">{l.title}</div>
                            <div className="text-xs text-gray-500">{l.duration || ''}</div>
                          </div>
                        </div>
                        {l.hasLive && <span className="text-[10px] uppercase tracking-wide text-pink-600">Live</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zoom Dialog */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tham gia phòng Zoom</DialogTitle>
          </DialogHeader>
          {activeLesson?.liveLink ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-700">Bạn sắp tham gia buổi học trực tiếp của bài: <span className="font-medium">{activeLesson.title}</span></p>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-gray-500" />
                <a href={activeLesson.liveLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{activeLesson.liveLink}</a>
              </div>
              <div className="flex gap-2">
                <Button asChild><a href={activeLesson.liveLink} target="_blank" rel="noreferrer">Mở Zoom</a></Button>
                <Button variant="outline" onClick={() => setZoomOpen(false)}>Đóng</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Không tìm thấy link phòng học.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
