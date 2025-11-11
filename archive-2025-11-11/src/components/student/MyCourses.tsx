import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { PlayCircle } from 'lucide-react';

const enrolledCourses = [
  {
    id: 1,
    title: 'Lập trình React cơ bản',
    instructor: 'Nguyễn Văn A',
    progress: 65,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Tiếng Anh giao tiếp',
    instructor: 'Trần Thị B',
    progress: 40,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop'
  }
];

interface MyCoursesProps {
  onCourseSelect: (course: any) => void;
}

export default function MyCourses({ onCourseSelect }: MyCoursesProps) {
  return (
    <div className="p-8">
      <h1 className="mb-6">Khóa học của tôi</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map(course => (
          <Card key={course.id} className="overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <h3 className="mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
              <Button className="w-full" onClick={() => onCourseSelect(course)}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Tiếp tục học
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
