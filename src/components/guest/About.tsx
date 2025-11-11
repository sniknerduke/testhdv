import { GraduationCap, Users, BookOpen, Award, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="mb-4">Giới thiệu EduPlatform</h1>
              <p className="text-lg opacity-90">
                Nền tảng học trực tuyến dành cho học viên Việt Nam, mang đến chương trình chất lượng cao từ cơ bản đến nâng cao, giúp bạn làm chủ kiến thức và kỹ năng trong kỷ nguyên số.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="ghost" >
                  Khám phá khóa học
                </Button>
                <Button variant="ghost" >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-semibold">7M+</div>
                      <div className="text-sm text-gray-500">Thành viên</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-indigo-600" />
                    <div>
                      <div className="text-2xl font-semibold">500+</div>
                      <div className="text-sm text-gray-500">Giảng viên</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-semibold">48.6K+</div>
                      <div className="text-sm text-gray-500">Bài giảng</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div>
                      <div className="text-2xl font-semibold">50K+</div>
                      <div className="text-sm text-gray-500">Thủ khoa/Á khoa</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sứ mệnh & Giá trị */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-3">Sứ mệnh</h2>
              <p className="text-gray-700">
                Trao quyền học tập cho mọi người bằng nội dung chất lượng cao, lộ trình rõ ràng, và công nghệ học tập hiện đại.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-3">Giá trị cốt lõi</h2>
              <ul className="text-gray-700 list-disc pl-5 space-y-1">
                <li>Chất lượng và tính thực tiễn</li>
                <li>Lấy người học làm trung tâm</li>
                <li>Minh bạch và trách nhiệm</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chương trình nổi bật */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="mb-6">Chương trình nổi bật</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'TopClass', desc: 'Chu trình Học - Hỏi - Luyện - Kiểm tra.' },
              { title: 'PEN', desc: 'Giải pháp luyện thi toàn diện cho lớp 12.' },
              { title: 'HM10', desc: 'Ôn thi vào lớp 10 với 3 giai đoạn.' },
              { title: 'HM6', desc: 'Ôn thi vào lớp 6 với 2 giai đoạn.' },
              { title: 'TopUni', desc: 'Luyện thi ĐGNL/ĐGTD và tốt nghiệp THPT.' },
              { title: 'Bổ trợ', desc: 'Khóa học bổ trợ kỹ năng theo cấp học.' },
            ].map((item) => (
              <Card key={item.title} className="group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ứng dụng di động */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-center mb-2 ">Học mọi lúc, mọi nơi</h2>
              <p className="text-gray-700">Ứng dụng học tập trên iOS và Android giúp bạn theo dõi lộ trình học thuận tiện.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Tải trên App Store</Button>
              <Button variant="outline">Tải trên CH Play</Button>
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
