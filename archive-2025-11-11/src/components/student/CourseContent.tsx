import { Card, CardContent } from '../ui/card';
import { PlayCircle } from 'lucide-react';

interface CourseContentProps {
  course: any;
}

export default function CourseContent({ course }: CourseContentProps) {
  if (!course) {
    return <div className="p-8">Vui lòng chọn khóa học</div>;
  }

  return (
    <div className="p-8">
      <Card className="mb-6">
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <PlayCircle className="w-20 h-20 text-white" />
        </div>
        <CardContent className="p-6">
          <h2 className="mb-2">{course.title}</h2>
          <p className="text-gray-600">Nội dung khóa học đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  );
}
