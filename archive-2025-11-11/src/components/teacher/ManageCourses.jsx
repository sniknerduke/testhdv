import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Edit, Trash, Users, PlayCircle } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Lập trình React cơ bản',
    description: 'Học React từ cơ bản đến nâng cao',
    students: 45,
    lessons: 20,
    status: 'published',
    price: '500,000đ',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'JavaScript nâng cao',
    description: 'Nắm vững JavaScript ES6+',
    students: 32,
    lessons: 15,
    status: 'published',
    price: '450,000đ',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop'
  }
];

export default function ManageCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1>Quản lý khóa học</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo khóa học mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo khóa học mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tên khóa học</Label>
                <Input placeholder="VD: Lập trình Python cơ bản" />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea placeholder="Mô tả chi tiết về khóa học..." rows={4} />
              </div>
              <div>
                <Label>Danh mục</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Lập trình</SelectItem>
                    <SelectItem value="language">Ngôn ngữ</SelectItem>
                    <SelectItem value="design">Thiết kế</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Cấp độ</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn cấp độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Cơ bản</SelectItem>
                    <SelectItem value="intermediate">Trung cấp</SelectItem>
                    <SelectItem value="advanced">Nâng cao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Giá khóa học</Label>
                <Input type="number" placeholder="500000" />
              </div>
              <div>
                <Label>Ảnh bìa</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Tạo khóa học
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {course.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                </span>
              </div>
              <h3 className="mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students} học sinh
                </div>
                <div className="flex items-center gap-1">
                  <PlayCircle className="w-4 h-4" />
                  {course.lessons} bài học
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedCourse(course)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Detail Edit */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa: {selectedCourse.title}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="lessons">Bài học</TabsTrigger>
                <TabsTrigger value="students">Học sinh</TabsTrigger>
                <TabsTrigger value="assessments">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <Label>Tên khóa học</Label>
                    <Input defaultValue={selectedCourse.title} />
                  </div>
                  <div>
                    <Label>Mô tả</Label>
                    <Textarea defaultValue={selectedCourse.description} rows={4} />
                  </div>
                  <div>
                    <Label>Giá</Label>
                    <Input defaultValue={selectedCourse.price} />
                  </div>
                  <Button>Lưu thay đổi</Button>
                </div>
              </TabsContent>

              <TabsContent value="lessons" className="mt-4">
                <div className="space-y-4">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm bài học mới
                  </Button>
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="mb-1">Bài {i}: Giới thiệu</h4>
                          <p className="text-sm text-gray-600">Video • 15 phút</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="students" className="mt-4">
                <div className="space-y-2">
                  <p className="text-gray-600">Tổng số học sinh: {selectedCourse.students}</p>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          H{i}
                        </div>
                        <div>
                          <div>Học sinh {i}</div>
                          <div className="text-sm text-gray-600">Tiến độ: {50 + i * 10}%</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Xem chi tiết</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="assessments" className="mt-4">
                <div className="space-y-4">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo bài kiểm tra mới
                  </Button>
                  <div className="space-y-2">
                    {[1, 2].map(i => (
                      <div key={i} className="border rounded-lg p-4">
                        <h4 className="mb-2">Bài kiểm tra tuần {i}</h4>
                        <p className="text-sm text-gray-600 mb-2">10 câu hỏi • 30 phút</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Chỉnh sửa</Button>
                          <Button size="sm" variant="outline">Xem kết quả</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
