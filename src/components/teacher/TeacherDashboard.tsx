import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BookOpen, Users, FileText, TrendingUp, ShieldCheck, AlertCircle, Activity, DollarSign, FileBarChart, FileDown, PlayCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TeacherDashboardProps {
  onNavigate: (page: string) => void;
}

export default function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Mock verification status
  // Filters & state for course statistics
  const [selectedCourse, setSelectedCourse] = useState<string>('course-1');
  const [range, setRange] = useState<string>('30d');
  const [segment, setSegment] = useState<string>('all');
  const [lesson, setLesson] = useState<string>('all');
  const [compare, setCompare] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock courses
  const courses = [
    { id: 'course-1', name: 'Toán 12 - Ôn thi THPT' },
    { id: 'course-2', name: 'Văn 11 - Nâng cao' },
  ];

  // Mock data generators based on filters (simple deterministic samples)
  const timePointsByRange: Record<string, string[]> = {
    '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    '30d': ['W1', 'W2', 'W3', 'W4', 'W5'],
    '90d': ['M1', 'M2', 'M3'],
    ytd: ['Q1', 'Q2', 'Q3', 'Q4'],
  };

  const seriesBase = useMemo(() => timePointsByRange[range] || [], [range]);

  const enrollmentsData = useMemo(
    () =>
      seriesBase.map((label, i) => ({
        label,
        enroll: 80 + (i + (selectedCourse === 'course-2' ? 10 : 0)) * 15 - (segment === 'struggling' ? 20 : 0),
      })),
    [seriesBase, selectedCourse, segment]
  );

  const compareEnrollments = useMemo(
    () =>
      compare
        ? seriesBase.map((label, i) => ({ label, enroll: enrollmentsData[i].enroll * 0.85 + 10 }))
        : [],
    [compare, seriesBase, enrollmentsData]
  );

  const viewsData = useMemo(
    () =>
      seriesBase.map((label, i) => ({ label, views: 300 + i * 40 + (lesson !== 'all' ? 20 : 0) })),
    [seriesBase, lesson]
  );

  const completionPie = useMemo(() => {
    const base = { completed: 62, inProgress: 28, dropped: 10 };
    const adj = segment === 'struggling' ? { completed: -10, inProgress: +5, dropped: +5 } : { completed: 0, inProgress: 0, dropped: 0 };
    return [
      { label: 'Hoàn thành', value: Math.max(0, base.completed + adj.completed) },
      { label: 'Đang học', value: Math.max(0, base.inProgress + adj.inProgress) },
      { label: 'Bỏ dở', value: Math.max(0, base.dropped + adj.dropped) },
    ];
  }, [segment]);

  const assignmentBar = useMemo(() => {
    const labels = ['Bài 1', 'Bài 2', 'Bài 3', 'Bài 4'];
    return labels.map((l, i) => ({
      lesson: l,
      assignment: 60 + i * 8 + (segment === 'all' ? 5 : 0),
      test: 55 + i * 7 + (selectedCourse === 'course-2' ? 4 : 0),
    }));
  }, [segment, selectedCourse]);

  const scores = useMemo(() => {
    const avg = segment === 'struggling' ? 6.8 : 7.9;
    return { avg, min: Math.max(3.5, avg - 3.1), max: Math.min(10, avg + 1.8) };
  }, [segment]);

  const totals = useMemo(() => {
    const enrollTotal = enrollmentsData.reduce((a, b) => a + Math.max(0, b.enroll), 0);
    const viewsTotal = viewsData.reduce((a, b) => a + b.views, 0);
    const completed = completionPie.find((x) => x.label === 'Hoàn thành')?.value || 0;
    const inProgress = completionPie.find((x) => x.label === 'Đang học')?.value || 0;
    const completionRate = Math.round((completed / Math.max(1, completed + inProgress)) * 100);
    const revenue = enrollTotal * 12000; // mock VND per enrollment
    return { enrollTotal, viewsTotal, completionRate, revenue };
  }, [enrollmentsData, viewsData, completionPie]);

  const refresh = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // 10% chance to mock an error
      if (Math.random() < 0.1) {
        setError('Lỗi tải dữ liệu. Vui lòng thử lại.');
      }
      setLoading(false);
    }, 700);
  };

  // CSV export (Excel-friendly)
  const exportCSV = () => {
    const rows: string[] = [];
    rows.push('Metric,Label,Value');
    enrollmentsData.forEach((d) => rows.push(`Enrollments,${d.label},${d.enroll}`));
    viewsData.forEach((d) => rows.push(`Views,${d.label},${d.views}`));
    completionPie.forEach((d) => rows.push(`Completion,${d.label},${d.value}`));
    assignmentBar.forEach((d) => rows.push(`Assignment,${d.lesson},${d.assignment}`));
    assignmentBar.forEach((d) => rows.push(`Test,${d.lesson},${d.test}`));
    rows.push(`Scores,Average,${scores.avg.toFixed(2)}`);
    rows.push(`Scores,Min,${scores.min.toFixed(2)}`);
    rows.push(`Scores,Max,${scores.max.toFixed(2)}`);
    rows.push(`Summary,CompletionRate,${totals.completionRate}%`);
    rows.push(`Summary,EnrollmentsTotal,${totals.enrollTotal}`);
    rows.push(`Summary,ViewsTotal,${totals.viewsTotal}`);
    rows.push(`Summary,Revenue,${totals.revenue}`);
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teacher-stats-${selectedCourse}-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    alert('Xuất PDF (mock)');
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1>Dashboard Giáo viên</h1>
      </div>


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
      </div>

      {/* Course Statistics Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Thống kê khóa học</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refresh} disabled={loading} className="inline-flex items-center gap-2">
              <FileBarChart className="w-4 h-4" /> {loading ? 'Đang tải...' : 'Tải lại'}
            </Button>
            <Button variant="outline" onClick={exportCSV} className="inline-flex items-center gap-2">
              <FileDown className="w-4 h-4" /> Excel
            </Button>
            <Button variant="outline" onClick={exportPDF} className="inline-flex items-center gap-2">
              <FileDown className="w-4 h-4" /> PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
  <CardContent className="p-4">
    {/* --- GIẢI THÍCH THAY ĐỔI ---
      1. 'flex': Giữ layout là flexbox.
      2. 'flex-wrap': Đây là chìa khóa. Nó cho phép các item tự động
         "rớt" xuống hàng mới nếu hàng hiện tại không còn đủ chỗ.
      3. 'items-center': Căn giữa các item theo chiều dọc.
      4. 'gap-4': Giữ khoảng cách giữa các item.
      
      Chúng ta bỏ 'flex-col' và 'md:flex-row' để nó luôn là 'flex-row'
      nhưng linh hoạt.
    */}
    <div className="flex flex-wrap items-center gap-4">
      {/* --- GIẢI THÍCH THAY ĐỔI ---
        1. 'flex-1': Cho phép item này "lớn lên" (grow) để lấp đầy
           không gian trống trên hàng.
        2. 'min-w-[180px]': (Quan trọng) Đặt độ rộng tối thiểu cho
           mỗi bộ lọc. Khi trình duyệt thấy không gian hẹp hơn 180px,
           nó sẽ đẩy item này xuống hàng mới (nhờ 'flex-wrap' ở trên).
           Bạn có thể điều chỉnh 180px thành 200px, 220px... tùy ý.
        
        Chúng ta bỏ 'md:w-[20%]' để nó linh hoạt hơn theo không gian.
      */}
      <div className="flex-1 min-w-[180px]">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger><SelectValue placeholder="Chọn khóa học" /></SelectTrigger>
          <SelectContent>
            {courses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Áp dụng tương tự cho các bộ lọc khác */}
      <div className="flex-1 min-w-[180px]">
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger><SelectValue placeholder="Khoảng thời gian" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 ngày</SelectItem>
            <SelectItem value="30d">30 ngày</SelectItem>
            <SelectItem value="90d">90 ngày</SelectItem>
            <SelectItem value="ytd">YTD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[180px]">
        <Select value={segment} onValueChange={setSegment}>
          <SelectTrigger><SelectValue placeholder="Nhóm học viên" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="new">Mới</SelectItem>
            <SelectItem value="returning">Quay lại</SelectItem>
            <SelectItem value="struggling">Gặp khó khăn</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[180px]">
        <Select value={lesson} onValueChange={setLesson}>
          <SelectTrigger><SelectValue placeholder="Bài học" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả bài</SelectItem>
            <SelectItem value="1">Bài 1</SelectItem>
            <SelectItem value="2">Bài 2</SelectItem>
            <SelectItem value="3">Bài 3</SelectItem>
            <SelectItem value="4">Bài 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Đối với checkbox, chúng ta cũng có thể cho nó 'flex-1'
        để nó cân bằng với các item khác, hoặc bỏ 'flex-1'
        để nó chỉ chiếm vừa đủ không gian.
        Ở đây tôi thêm 'whitespace-nowrap' để label không bị vỡ.
      */}
      <div className="flex items-center gap-2">
        <input id="compare" type="checkbox" className="accent-gray-600" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
        <label htmlFor="compare" className="text-sm text-gray-700 whitespace-nowrap">
          So sánh kỳ trước
        </label>
      </div>
    </div>
  </CardContent>
</Card>

        {error && (
          <Card className="mb-6 border-red-300">
            <CardContent className="p-4 text-red-600 flex items-center justify-between">
              <span>{error}</span>
              <Button size="sm" variant="outline" onClick={refresh}>Thử lại</Button>
            </CardContent>
          </Card>
        )}

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 pl-6 pr-5 pb-5">
              <div className="flex items-center justify-between ">
                <div>
                  <p className="text-sm text-gray-600 mb-1 ">Doanh thu (ước tính)</p>
                  <p className="text-2xl font-semibold">{totals.revenue.toLocaleString('vi-VN')} đ</p>
                </div>
                <DollarSign className="w-10 h-10 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pl-6 pr-5 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lượt đăng ký</p>
                  <p className="text-2xl font-semibold">{totals.enrollTotal.toLocaleString()}</p>
                </div>
                <Users className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pl-6 pr-5 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tỷ lệ hoàn thành</p>
                  <p className="text-2xl font-semibold">{totals.completionRate}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pl-6 pr-5 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Điểm TB / Cao / Thấp</p>
                  <p className="text-2xl font-semibold">{scores.avg.toFixed(1)} / {scores.max.toFixed(1)} / {scores.min.toFixed(1)}</p>
                </div>
                <Activity className="w-10 h-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pl-6 pr-5 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lượt xem video</p>
                  <p className="text-2xl font-semibold">{totals.viewsTotal.toLocaleString()}</p>
                </div>
                <PlayCircle className="w-10 h-10 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {/* Row 1: Enrollments area + Completion pie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle>Đăng ký theo thời gian</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={{
                enroll: { label: 'Đăng ký', color: 'hsl(221.2 83.2% 53.3%)' },
                compare: { label: 'So sánh', color: 'hsl(24.6 95% 53.1%)' },
              }}>
                <AreaChart data={enrollmentsData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="enroll" stroke="var(--color-enroll)" fill="var(--color-enroll)" fillOpacity={0.15} />
                </AreaChart>
              </ChartContainer>
              {compare && (
                <div className="mt-3">
                  <ChartContainer className="h-40" config={{ compare: { label: 'So sánh', color: 'hsl(24.6 95% 53.1%)' } }}>
                    <LineChart data={compareEnrollments} margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="enroll" stroke="var(--color-compare)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle>Tỷ lệ hoàn thành khóa học</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={{
                completed: { label: 'Hoàn thành', color: 'hsl(142.1 70.6% 45.3%)' },
                progress: { label: 'Đang học', color: 'hsl(221.2 83.2% 53.3%)' },
                dropped: { label: 'Bỏ dở', color: 'hsl(24.6 95% 53.1%)' },
              }}>
                <PieChart>
                  <Pie data={completionPie} dataKey="value" nameKey="label" outerRadius={90} label>
                    {completionPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.label === 'Hoàn thành' ? 'var(--color-completed)'
                        : entry.label === 'Đang học' ? 'var(--color-progress)'
                        : 'var(--color-dropped)'
                      } />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Views line + Assignment/Test bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle>Lượt xem video theo thời gian</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={{ views: { label: 'Lượt xem', color: 'hsl(0 84.2% 60.2%)' } }}>
                <LineChart data={viewsData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          
        </div>

        
      </div>
    </div>
  );
}