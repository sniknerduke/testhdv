import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Search, Plus, Pencil, Trash2, CheckCircle2, XCircle, BookOpen } from 'lucide-react'

type CourseStatus = 'draft' | 'published'

interface Course {
  id: number
  title: string
  instructor: string
  category: string
  price: string
  status: CourseStatus
  students: number
  rating: number
  updatedAt: string
}

const initialCourses: Course[] = [
  { id: 1, title: 'React từ A-Z', instructor: 'Nguyễn Văn A', category: 'Lập trình', price: '500.000đ', status: 'published', students: 1234, rating: 4.8, updatedAt: '2025-11-01' },
  { id: 2, title: 'Thiết kế UI/UX', instructor: 'Trần Thị B', category: 'Thiết kế', price: '450.000đ', status: 'draft', students: 312, rating: 4.6, updatedAt: '2025-10-28' },
  { id: 3, title: 'Tiếng Anh giao tiếp', instructor: 'Lê Văn C', category: 'Ngôn ngữ', price: '300.000đ', status: 'published', students: 2033, rating: 4.9, updatedAt: '2025-10-20' },
  { id: 4, title: 'Marketing số', instructor: 'Phạm Văn D', category: 'Marketing', price: '400.000đ', status: 'published', students: 876, rating: 4.5, updatedAt: '2025-10-15' },
]

export default function CourseManagement() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | CourseStatus>('all')
  const [category, setCategory] = useState<'all' | string>('all')
  const [courses, setCourses] = useState<Course[]>(initialCourses)

  const categories = useMemo(() => Array.from(new Set(courses.map(c => c.category))), [courses])

  const filtered = courses.filter(c => {
    const q = search.toLowerCase()
    const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
    const matchesStatus = status === 'all' || c.status === status
    const matchesCategory = category === 'all' || c.category === category
    return matchesSearch && matchesStatus && matchesCategory
  })

  const publishToggle = (id: number) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, status: c.status === 'published' ? 'draft' : 'published' } : c)))
  }

  const deleteCourse = (id: number) => {
    if (confirm('Xóa khóa học này?')) {
      setCourses(prev => prev.filter(c => c.id !== id))
    }
  }

  const total = courses.length
  const published = courses.filter(c => c.status === 'published').length
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1>Quản lý khóa học</h1>
        <Button className="inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Thêm khóa học</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng khóa học</p>
              <p className="text-3xl">{total}</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-600 opacity-20" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đang xuất bản</p>
              <p className="text-3xl">{published}</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600 opacity-20" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng học viên</p>
              <p className="text-3xl">{totalStudents}</p>
            </div>
            <Search className="w-10 h-10 text-purple-600 opacity-20" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Tìm khóa học hoặc giảng viên" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={status} onValueChange={(v: CourseStatus | 'all') => setStatus(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="published">Xuất bản</SelectItem>
              <SelectItem value="draft">Nháp</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={(v: string) => setCategory(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên khóa học</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Học viên</TableHead>
                <TableHead className="text-right">Đánh giá</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(course => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell className="text-right">{course.price}</TableCell>
                  <TableCell>
                    {course.status === 'published' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Xuất bản</Badge>
                    ) : (
                      <Badge variant="secondary">Nháp</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{course.students}</TableCell>
                  <TableCell className="text-right">{course.rating}</TableCell>
                  <TableCell>{course.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => publishToggle(course.id)}>
                        {course.status === 'published' ? <XCircle className="w-4 h-4 text-red-600" /> : <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => deleteCourse(course.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-500">Không có kết quả phù hợp</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
