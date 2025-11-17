import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Search, ShieldBan, RefreshCcw, Eye, UserPlus, UserMinus } from 'lucide-react'

type UserRole = 'student' | 'teacher' | 'admin'
type UserStatus = 'active' | 'suspended' | 'invited'

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastActive: string
}

const initialUsers: User[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'student', status: 'active', lastActive: 'Hôm nay' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'teacher', status: 'active', lastActive: 'Hôm qua' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'student', status: 'suspended', lastActive: '3 ngày trước' },
  { id: 4, name: 'Admin D', email: 'admin@example.com', role: 'admin', status: 'active', lastActive: '1 giờ trước' },
  { id: 5, name: 'Hoàng E', email: 'e@example.com', role: 'teacher', status: 'invited', lastActive: '-' },
]

export default function UserManagement() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<'all' | UserRole>('all')
  const [status, setStatus] = useState<'all' | UserStatus>('all')
  const [users, setUsers] = useState<User[]>(initialUsers)

  const roles = useMemo(() => Array.from(new Set(users.map(u => u.role))), [users])

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchesRole = role === 'all' || u.role === role
    const matchesStatus = status === 'all' || u.status === status
    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleSuspend = (id: number) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u)))
  }

  const resetPassword = (id: number) => {
    const user = users.find(u => u.id === id)
    alert(`Đã gửi email đặt lại mật khẩu cho ${user?.email}`)
  }

  const promoteToTeacher = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'teacher' } : u))
  }

  const demoteToStudent = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'student' } : u))
  }

  return (
    <div className="p-8">
      <h1 className="mb-6">Quản lý người dùng</h1>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Tìm theo tên hoặc email" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={role} onValueChange={(v: UserRole | 'all') => setRole(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              {roles.map(r => (
                <SelectItem key={r} value={r}>{r === 'student' ? 'Học sinh' : r === 'teacher' ? 'Giáo viên' : 'Admin'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v: UserStatus | 'all') => setStatus(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="suspended">Tạm khóa</SelectItem>
              <SelectItem value="invited">Đã mời</SelectItem>
            </SelectContent> 
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lần hoạt động gần nhất</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role === 'student' ? 'Học sinh' : user.role === 'teacher' ? 'Giáo viên' : 'Admin'}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.status === 'active' && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Hoạt động</Badge>}
                    {user.status === 'suspended' && <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Tạm khóa</Badge>}
                    {user.status === 'invited' && <Badge>Đã mời</Badge>}
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2" title="Xem chi tiết"><Eye className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => toggleSuspend(user.id)} title={user.status === 'suspended' ? 'Mở khóa' : 'Tạm khóa'}>
                        <ShieldBan className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => resetPassword(user.id)} title="Reset mật khẩu">
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                      {user.role === 'teacher' && (
                        <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => demoteToStudent(user.id)} title="Chuyển về học sinh">
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      )}
                      {user.role !== 'teacher' && user.role !== 'admin' && (
                        <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => promoteToTeacher(user.id)} title="Chuyển thành giáo viên">
                          <UserPlus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">Không có kết quả phù hợp</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
