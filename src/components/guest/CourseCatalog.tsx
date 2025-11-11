import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Star } from 'lucide-react';

const allCourses = [
  {
    id: 1,
    title: 'Lập trình React cơ bản',
    instructor: 'Nguyễn Văn A',
    price: '500,000đ',
    rating: 4.8,
    students: 1234,
    category: 'Lập trình',
    level: 'Cơ bản',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Tiếng Anh giao tiếp',
    instructor: 'Trần Thị B',
    price: '300,000đ',
    rating: 4.9,
    students: 2341,
    category: 'Ngôn ngữ',
    level: 'Trung cấp',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Thiết kế UI/UX',
    instructor: 'Lê Văn C',
    price: '450,000đ',
    rating: 4.7,
    students: 987,
    category: 'Thiết kế',
    level: 'Nâng cao',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Marketing số',
    instructor: 'Phạm Văn D',
    price: '400,000đ',
    rating: 4.6,
    students: 1567,
    category: 'Marketing',
    level: 'Cơ bản',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Python nâng cao',
    instructor: 'Hoàng Thị E',
    price: '600,000đ',
    rating: 4.9,
    students: 2103,
    category: 'Lập trình',
    level: 'Nâng cao',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'Kế toán cơ bản',
    instructor: 'Đỗ Văn F',
    price: '350,000đ',
    rating: 4.5,
    students: 876,
    category: 'Kinh doanh',
    level: 'Cơ bản',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop'
  }
];

interface CourseCatalogProps {
  onCourseSelect: (course: any) => void;
  userRole?: 'student' | 'teacher' | 'admin' | null;
  onAddToCart?: (course: any) => void;
  onRequestLogin?: () => void;
}

export default function CourseCatalog({ onCourseSelect, userRole = null, onAddToCart, onRequestLogin }: CourseCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    const matchesLevel = level === 'all' || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-6">Danh mục khóa học</h1>
      
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="Lập trình">Lập trình</SelectItem>
                <SelectItem value="Ngôn ngữ">Ngôn ngữ</SelectItem>
                <SelectItem value="Thiết kế">Thiết kế</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả cấp độ</SelectItem>
                <SelectItem value="Cơ bản">Cơ bản</SelectItem>
                <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                <SelectItem value="Nâng cao">Nâng cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">Tìm thấy {filteredCourses.length} khóa học</p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card 
            key={course.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onCourseSelect(course)}
          >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <div className="flex gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{course.category}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">{course.level}</span>
              </div>
              <h3 className="mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{course.rating}</span>
                  <span className="text-gray-400 text-sm">({course.students})</span>
                </div>
                <span className="font-semibold">{course.price}</span>
              </div>

              {/* Action button */}
              <div className="mt-4">
                {userRole === 'student' ? (
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToCart) onAddToCart(course); else toast.success('Đã thêm vào giỏ hàng');
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                ) : userRole === 'teacher' ? (
                  <Button
                    className="w-full opacity-60 cursor-not-allowed"
                    disabled
                    onClick={(e) => e.stopPropagation()}
                    title="Chỉ học sinh mới có thể thêm vào giỏ hàng"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRequestLogin) onRequestLogin(); else toast.message('Vui lòng đăng nhập để mua');
                    }}
                  >
                    Đăng nhập để mua
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
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
    </>
  );
}
