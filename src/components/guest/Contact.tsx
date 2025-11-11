import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submit
    setTimeout(() => {
      setSubmitting(false)
      alert('Đã gửi liên hệ! Chúng tôi sẽ phản hồi sớm nhất.')
      ;(e.target as HTMLFormElement).reset()
    }, 800)
  }

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center py-6">
          <h1 className="mb-3">Liên hệ</h1>
          <p className="text-lg opacity-90">Kết nối với EduPlatform để được hỗ trợ nhanh chóng và chính xác.</p>
        </div>
      </section>

      {/* Info + Form */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="mb-1">Hotline</h3>
                <p className="text-gray-700">1900-xxxx (8:00 - 21:00)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="mb-1">Email</h3>
                <p className="text-gray-700">contact@eduplatform.com</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="mb-1">Địa chỉ</h3>
                <p className="text-gray-700">123 Đường Học Tập, Quận 1, TP.HCM</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="mb-1">Giờ làm việc</h3>
                <p className="text-gray-700">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Gửi tin nhắn cho chúng tôi</h2>
              <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm text-gray-600">Họ và tên</label>
                  <Input name="name" placeholder="Nguyễn Văn A" required />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <Input name="email" type="email" placeholder="ban@vidu.com" required />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600">Chủ đề</label>
                  <Input name="subject" placeholder="Hỗ trợ tài khoản..." required />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600">Nội dung</label>
                  <Textarea name="message" placeholder="Mô tả vấn đề của bạn" rows={5} required />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={submitting} className="inline-flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {submitting ? 'Đang gửi...' : 'Gửi liên hệ'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bản đồ/đại diện hình ảnh */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <Card>
          <CardContent className="p-0">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              Bản đồ/Ảnh đại diện vị trí (placeholder)
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">EduPlatform</h3>
            <p className="text-sm text-gray-400">Nền tảng học tập trực tuyến giúp bạn phát triển kỹ năng và sự nghiệp.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white">Góp ý</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Pháp lý</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-white">Bản quyền</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm">
            <p>© {new Date().getFullYear()} EduPlatform. Bảo lưu mọi quyền.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-white">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white">Điều khoản</a>
              <a href="#" className="hover:text-white">Liên hệ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
