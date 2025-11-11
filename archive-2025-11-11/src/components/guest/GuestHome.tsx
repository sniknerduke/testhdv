import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Search, Star, Users, BookOpen } from 'lucide-react';

const featuredCourses = [
  {
    id: 1,
    title: 'Lập trình React cơ bản',
    instructor: 'Nguyễn Văn A',
    price: '500,000đ',
    rating: 4.8,
    students: 1234,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Tiếng Anh giao tiếp',
    instructor: 'Trần Thị B',
    price: '300,000đ',
    rating: 4.9,
    students: 2341,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Thiết kế UI/UX',
    instructor: 'Lê Văn C',
    price: '450,000đ',
    rating: 4.7,
    students: 987,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
  }
];

interface GuestHomeProps {
  onNavigate: (page: string) => void;
  onCourseSelect: (course: any) => void;
}

export default function GuestHome({ onNavigate, onCourseSelect }: GuestHomeProps) {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="mb-4">Học tập không giới hạn</h1>
          <p className="text-xl mb-8 opacity-90">Khám phá hàng nghìn khóa học chất lượng cao từ các giảng viên hàng đầu</p>
          <div className="flex gap-4 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Tìm kiếm khóa học..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900"
              />
            </div>
            <Button onClick={() => onNavigate('courses')} size="lg">
              Khám phá
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl mb-2">500+</div>
              <div className="text-gray-600">Khóa học</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl mb-2">10,000+</div>
              <div className="text-gray-600">Học sinh</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl mb-2">4.8/5</div>
              <div className="text-gray-600">Đánh giá</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2>Khóa học nổi bật</h2>
          <Button variant="outline" onClick={() => onNavigate('courses')}>
            Xem tất cả
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map(course => (
            <Card key={course.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onCourseSelect(course)}>
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
