import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { TrendingUp, Users, BookOpen, Activity, DollarSign, FileBarChart, FileDown } from 'lucide-react'

// Mock data sets
const enrollmentData = [
  { month: 'Jan', enroll: 120 },
  { month: 'Feb', enroll: 180 },
  { month: 'Mar', enroll: 220 },
  { month: 'Apr', enroll: 260 },
  { month: 'May', enroll: 310 },
  { month: 'Jun', enroll: 280 },
]

const completionData = [
  { label: 'Hoàn thành', value: 65 },
  { label: 'Đang học', value: 25 },
  { label: 'Bỏ dở', value: 10 },
]

const interactionData = [
  { day: 'Mon', comments: 34, questions: 12, reviews: 8 },
  { day: 'Tue', comments: 28, questions: 15, reviews: 6 },
  { day: 'Wed', comments: 40, questions: 18, reviews: 9 },
  { day: 'Thu', comments: 22, questions: 10, reviews: 5 },
  { day: 'Fri', comments: 30, questions: 14, reviews: 7 },
  { day: 'Sat', comments: 18, questions: 6, reviews: 3 },
  { day: 'Sun', comments: 12, questions: 4, reviews: 2 },
]

export default function AdminAnalytics() {
  const [range, setRange] = useState('30d')
  const [category, setCategory] = useState('all')
  const [role, setRole] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = () => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      // Mock random error chance
      if (Math.random() < 0.1) {
        setError('Lỗi tải dữ liệu. Vui lòng thử lại.')
      }
      setLoading(false)
    }, 800)
  }

  const exportData = (format: 'excel' | 'pdf') => {
    alert(`Xuất báo cáo ${format.toUpperCase()} (mock)`) // mock
  }

  const kpis = [
    { label: 'Tổng người dùng', value: '12,457', icon: Users, color: 'text-blue-600' },
    { label: 'Khóa học hoạt động', value: '312', icon: BookOpen, color: 'text-green-600' },
    { label: 'Doanh thu tháng', value: '320 triệu', icon: DollarSign, color: 'text-yellow-600' },
    { label: 'Tương tác / ngày', value: '892', icon: Activity, color: 'text-purple-600' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1>Thống kê hệ thống</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} disabled={loading} className="inline-flex items-center gap-2">
            <FileBarChart className="w-4 h-4" /> {loading ? 'Đang tải...' : 'Tải lại'}
          </Button>
          <Button variant="outline" onClick={() => exportData('excel')} className="inline-flex items-center gap-2">
            <FileDown className="w-4 h-4" /> Excel
          </Button>
          <Button variant="outline" onClick={() => exportData('pdf')} className="inline-flex items-center gap-2">
            <FileDown className="w-4 h-4" /> PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger><SelectValue placeholder="Chọn khoảng" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 ngày</SelectItem>
              <SelectItem value="30d">30 ngày</SelectItem>
              <SelectItem value="90d">90 ngày</SelectItem>
              <SelectItem value="ytd">YTD</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Danh mục" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              <SelectItem value="programming">Lập trình</SelectItem>
              <SelectItem value="design">Thiết kế</SelectItem>
              <SelectItem value="language">Ngôn ngữ</SelectItem>
              <SelectItem value="business">Kinh doanh</SelectItem>
            </SelectContent>
          </Select>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger><SelectValue placeholder="Nhóm người dùng" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="student">Học sinh</SelectItem>
              <SelectItem value="teacher">Giáo viên</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Tìm từ khóa..." />
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

      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {kpis.map(kpi => (
          <Card key={kpi.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-semibold">{kpi.value}</p>
                </div>
                <kpi.icon className={`w-10 h-10 opacity-20 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Đăng ký khóa học theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ enroll: { label: 'Lượt đăng ký', color: 'hsl(221.2 83.2% 53.3%)' } }} className="h-64">
              <RechartsArea data={enrollmentData} />
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tỷ lệ hoàn thành khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ completed: { label: 'Hoàn thành', color: 'hsl(142.1 70.6% 45.3%)' }, progress: { label: 'Đang học', color: 'hsl(221.2 83.2% 53.3%)' }, dropped: { label: 'Bỏ dở', color: 'hsl(24.6 95% 53.1%)' } }} className="h-64">
              <RechartsPie data={completionData} />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tương tác người dùng theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ comments: { label: 'Bình luận', color: 'hsl(197 100% 50%)' }, questions: { label: 'Hỏi đáp', color: 'hsl(25 95% 53%)' }, reviews: { label: 'Đánh giá', color: 'hsl(142 70% 45%)' } }} className="h-64">
              <RechartsBarGroup data={interactionData} />
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Cảnh báo hệ thống</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Badge className="bg-red-100 text-red-700">Cảnh báo</Badge>
              <span>Tỷ lệ bỏ dở tăng 5% tuần này (giả lập)</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge className="bg-yellow-100 text-yellow-700">Chú ý</Badge>
              <span>Lượt hỏi đáp giảm nhẹ so với kỳ trước</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge className="bg-blue-100 text-blue-700">Thông tin</Badge>
              <span>Doanh thu tăng 12% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for no data */}
      {false && (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">Chưa có dữ liệu thống kê</CardContent>
        </Card>
      )}
    </div>
  )
}

// Recharts wrappers (kept local to avoid bloating chart.tsx)
import {
  AreaChart,
  Area,
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
} from 'recharts'

function RechartsArea({ data }: { data: typeof enrollmentData }) {
  return (
    <AreaChart data={data} margin={{ left: 12, right: 12 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis dataKey="month" />
      <YAxis />
      <Area type="monotone" dataKey="enroll" stroke="var(--color-enroll)" fill="var(--color-enroll)" fillOpacity={0.15} />
    </AreaChart>
  )
}

function RechartsPie({ data }: { data: typeof completionData }) {
  const colors = {
    'Hoàn thành': 'var(--color-completed)',
    'Đang học': 'var(--color-progress)',
    'Bỏ dở': 'var(--color-dropped)',
  } as Record<string, string>
  return (
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="label" outerRadius={90} label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[entry.label]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  )
}

function RechartsBarGroup({ data }: { data: typeof interactionData }) {
  return (
    <BarChart data={data} margin={{ left: 12, right: 12 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="comments" fill="var(--color-comments)" radius={[4, 4, 0, 0]} />
      <Bar dataKey="questions" fill="var(--color-questions)" radius={[4, 4, 0, 0]} />
      <Bar dataKey="reviews" fill="var(--color-reviews)" radius={[4, 4, 0, 0]} />
    </BarChart>
  )
}
