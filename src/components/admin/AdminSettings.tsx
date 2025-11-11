import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

export default function AdminSettings() {
  const [features, setFeatures] = useState({
    enableRegistrations: true,
    maintenanceMode: false,
    emailNotifications: true,
    teacherAutoApprove: false,
  })

  const [emailTemplate, setEmailTemplate] = useState('Xin chào {{name}},\n\nCảm ơn bạn đã tham gia EduPlatform!')
  const [maxUploadSizeMb, setMaxUploadSizeMb] = useState(50)

  const toggle = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const saveSettings = () => {
    alert('Đã lưu cài đặt (mock).')
  }

  return (
    <div className="p-8">
      <h1 className="mb-6">Cài đặt hệ thống</h1>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tính năng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Cho phép đăng ký mới</span>
              <Switch checked={features.enableRegistrations} onCheckedChange={() => toggle('enableRegistrations')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Chế độ bảo trì</span>
              <Switch checked={features.maintenanceMode} onCheckedChange={() => toggle('maintenanceMode')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Email thông báo</span>
              <Switch checked={features.emailNotifications} onCheckedChange={() => toggle('emailNotifications')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Tự động duyệt giáo viên mới</span>
              <Switch checked={features.teacherAutoApprove} onCheckedChange={() => toggle('teacherAutoApprove')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Giới hạn & bảo mật</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Dung lượng upload tối đa (MB)</label>
              <Input type="number" min={1} value={maxUploadSizeMb} onChange={e => setMaxUploadSizeMb(Number(e.target.value))} />
            </div>
            <Button variant="outline">Quét bảo mật</Button>
            <Button variant="outline">Xuất nhật ký hệ thống</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mẫu email chào mừng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full rounded-md border bg-white p-3 text-sm font-mono h-40"
            value={emailTemplate}
            onChange={e => setEmailTemplate(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={saveSettings}>Lưu mẫu</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phân quyền nhanh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-xs uppercase text-gray-500 mb-2">Học sinh</h3>
              <ul className="space-y-1">
                <li>• Xem khóa học</li>
                <li>• Mua khóa học</li>
                <li>• Tham gia bài kiểm tra</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-500 mb-2">Giáo viên</h3>
              <ul className="space-y-1">
                <li>• Tạo & quản lý khóa học</li>
                <li>• Chấm bài & giao bài tập</li>
                <li>• Quản lý học viên khóa học</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-500 mb-2">Admin</h3>
              <ul className="space-y-1">
                <li>• Quản lý toàn bộ người dùng</li>
                <li>• Cài đặt hệ thống</li>
                <li>• Duyệt nội dung & giáo viên</li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Xuất cấu hình</Button>
            <Button onClick={saveSettings}>Lưu tất cả</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
