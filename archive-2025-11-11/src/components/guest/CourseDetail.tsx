import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Star, Clock, Users, BookOpen, PlayCircle, Award } from 'lucide-react';

const courseDetails = {
  description: 'Khóa học này sẽ giúp bạn nắm vững các kiến thức cơ bản và nâng cao, từ đó có thể tự tin áp dụng vào thực tế. Bạn sẽ được hướng dẫn chi tiết từng bước một cách dễ hiểu và có nhiều bài tập thực hành.',
  whatYouLearn: [
    'Hiểu rõ các khái niệm cơ bản',
    'Áp dụng kiến thức vào thực tế',
    'Xây dựng dự án hoàn chỉnh',
    'Làm việc với các công cụ chuyên nghiệp'
  ],
  curriculum: [
    { id: 1, title: 'Giới thiệu khóa học', duration: '15 phút', lessons: 3 },
    { id: 2, title: 'Kiến thức nền tảng', duration: '2 giờ', lessons: 8 },
    { id: 3, title: 'Thực hành cơ bản', duration: '3 giờ', lessons: 12 },
    { id: 4, title: 'Dự án thực tế', duration: '5 giờ', lessons: 10 }
  ],
  reviews: [
    { id: 1, name: 'Nguyễn Văn A', rating: 5, comment: 'Khóa học rất hay và dễ hiểu!', date: '2 tuần trước' },
    { id: 2, name: 'Trần Thị B', rating: 4, comment: 'Nội dung chất lượng, giảng viên nhiệt tình.', date: '1 tháng trước' },
    { id: 3, name: 'Lê Văn C', rating: 5, comment: 'Đáng đồng tiền bát gạo!', date: '2 tháng trước' }
  ]
};

interface CourseDetailProps {
  course: any;
  onNavigate: (page: string) => void;
}

export default function CourseDetail({ course, onNavigate }: CourseDetailProps) {
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Vui lòng chọn một khóa học</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="mb-4">{course.title}</h1>
              <p className="text-lg mb-4 opacity-90">{courseDetails.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <span className="opacity-75">({course.students} đánh giá)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.students} học viên</span>
                </div>
              </div>
              <p className="opacity-75">Giảng viên: {course.instructor}</p>
            </div>
            <div>
              <Card>
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">{course.price}</div>
                  <Button className="w-full mb-2">Đăng ký ngay</Button>
                  <Button variant="outline" className="w-full" onClick={() => onNavigate('login')}>
                    Đăng nhập để học
                  </Button>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>10 giờ học</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>33 bài học</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Chứng chỉ hoàn thành</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="curriculum">Nội dung khóa học</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Bạn sẽ học được gì?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {courseDetails.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm mt-0.5">✓</div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Nội dung khóa học</h2>
                <div className="space-y-3">
                  {courseDetails.curriculum.map((section) => (
                    <div key={section.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="mb-1">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.lessons} bài học • {section.duration}</p>
                        </div>
                        <PlayCircle className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Đánh giá từ học viên</h2>
                <div className="space-y-4">
                  {courseDetails.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span>{review.name}</span>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
