// Service layer for courses & lessons with localStorage backing
// Designed so that later you can swap implementations to real backend API
// by replacing fetchLocal or adding HTTP calls.

export interface Lesson {
  id: number;
  title: string;
  duration?: string; // optional when using video
  type?: 'video' | 'text' | 'quiz';
  description?: string;
  // video fields (frontend-only until backend is ready)
  videoUrl?: string; // URL returned by backend (future)
  fileName?: string; // local chosen file name (for display only)
  mimeType?: string;
  size?: number; // bytes
}

export interface Section {
  id: number;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  students: number;
  status: 'published' | 'draft';
  sections?: Section[];
}

const STORAGE_KEY = 'courses';

function readStorage(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeStorage(courses: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

// Seed defaults if missing
export function ensureSeedData() {
  const existing = readStorage();
  if (existing.length === 0) {
    const seed: Course[] = [
      {
        id: 1,
        title: 'React từ cơ bản đến nâng cao',
        description: 'Khóa React toàn diện với dự án thực tế',
        category: 'Programming',
        level: 'Intermediate',
        price: 1500000,
        duration: '40 giờ',
        students: 245,
        status: 'published',
        sections: [
          {
            id: 101,
            title: 'Chương 1: Bắt đầu với React',
            lessons: [
              { id: 11, title: 'Giới thiệu React', duration: '12:30', type: 'video' },
              { id: 12, title: 'Component & Props', duration: '20:10', type: 'video' }
            ]
          },
          {
            id: 102,
            title: 'Chương 2: Trạng thái & Vòng đời',
            lessons: [
              { id: 13, title: 'State & Lifecycle', duration: '18:05', type: 'video' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'TypeScript cho người mới',
        description: 'Học TypeScript từ đầu qua ví dụ',
        category: 'Programming',
        level: 'Beginner',
        price: 1200000,
        duration: '30 giờ',
        students: 180,
        status: 'published',
        sections: [
          {
            id: 201,
            title: 'Chương 1: Cơ bản',
            lessons: [
              { id: 21, title: 'Giới thiệu TypeScript', duration: '15:00', type: 'video' },
              { id: 22, title: 'Kiểu cơ bản', duration: '24:40', type: 'video' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Node.js Backend Development',
        description: 'Xây dựng RESTful API với Node.js',
        category: 'Programming',
        level: 'Advanced',
        price: 2000000,
        duration: '50 giờ',
        students: 156,
        status: 'draft',
        sections: [
          {
            id: 301,
            title: 'Chương 1: Cài đặt',
            lessons: [
              { id: 31, title: 'Setup môi trường', duration: '08:20', type: 'video' }
            ]
          },
          {
            id: 302,
            title: 'Chương 2: Express',
            lessons: [
              { id: 32, title: 'Express cơ bản', duration: '22:15', type: 'video' },
              { id: 33, title: 'RESTful API', duration: '30:05', type: 'video' }
            ]
          }
        ]
      }
    ];
    writeStorage(seed);
  }
}

export async function getCourses(): Promise<Course[]> {
  return readStorage();
}

export async function saveCourses(courses: Course[]): Promise<void> {
  writeStorage(courses);
}

export async function addCourse(course: Omit<Course, 'id' | 'students'> & { students?: number }): Promise<Course> {
  const courses = readStorage();
  const newCourse: Course = { ...course, id: Date.now(), students: course.students ?? 0 };
  courses.push(newCourse);
  writeStorage(courses);
  return newCourse;
}

export async function updateCourse(courseId: number, patch: Partial<Course>): Promise<Course | null> {
  const courses = readStorage();
  const idx = courses.findIndex(c => c.id === courseId);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...patch };
  writeStorage(courses);
  return courses[idx];
}

export async function deleteCourse(courseId: number): Promise<boolean> {
  const courses = readStorage();
  const next = courses.filter(c => c.id !== courseId);
  writeStorage(next);
  return next.length !== courses.length;
}

export async function getCourseById(courseId: number): Promise<Course | null> {
  return readStorage().find(c => c.id === courseId) || null;
}

// Section CRUD
export async function addSection(courseId: number, section: Omit<Section, 'id' | 'lessons'> & { lessons?: Lesson[] }): Promise<Section | null> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;
  const newSection: Section = { id: Date.now(), title: section.title, description: section.description, lessons: section.lessons || [] };
  course.sections = [...(course.sections || []), newSection];
  writeStorage(courses);
  return newSection;
}

export async function updateSection(courseId: number, sectionId: number, patch: Partial<Section>): Promise<Section | null> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return null;
  course.sections = course.sections.map(s => s.id === sectionId ? { ...s, ...patch } : s);
  writeStorage(courses);
  return course.sections.find(s => s.id === sectionId) || null;
}

export async function deleteSection(courseId: number, sectionId: number): Promise<boolean> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return false;
  course.sections = course.sections.filter(s => s.id !== sectionId);
  writeStorage(courses);
  return true;
}

export async function reorderSections(courseId: number, fromIndex: number, toIndex: number): Promise<void> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return;
  const arr = [...course.sections];
  const [moved] = arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, moved);
  course.sections = arr;
  writeStorage(courses);
}

// Lesson CRUD within a section
export async function addLesson(courseId: number, sectionId: number, lesson: Omit<Lesson, 'id'>): Promise<Lesson | null> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return null;
  const section = course.sections.find(s => s.id === sectionId);
  if (!section) return null;
  const newLesson: Lesson = { id: Date.now(), ...lesson };
  section.lessons = [...(section.lessons || []), newLesson];
  writeStorage(courses);
  return newLesson;
}

export async function updateLesson(courseId: number, sectionId: number, lessonId: number, patch: Partial<Lesson>): Promise<Lesson | null> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return null;
  const section = course.sections.find(s => s.id === sectionId);
  if (!section) return null;
  section.lessons = section.lessons.map(l => l.id === lessonId ? { ...l, ...patch } : l);
  writeStorage(courses);
  return section.lessons.find(l => l.id === lessonId) || null;
}

export async function deleteLesson(courseId: number, sectionId: number, lessonId: number): Promise<boolean> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return false;
  const section = course.sections.find(s => s.id === sectionId);
  if (!section) return false;
  section.lessons = section.lessons.filter(l => l.id !== lessonId);
  writeStorage(courses);
  return true;
}

export async function reorderLessons(courseId: number, sectionId: number, fromIndex: number, toIndex: number): Promise<void> {
  const courses = readStorage();
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.sections) return;
  const section = course.sections.find(s => s.id === sectionId);
  if (!section) return;
  const arr = [...section.lessons];
  const [moved] = arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, moved);
  section.lessons = arr;
  writeStorage(courses);
}

// For future backend integration:
// Replace readStorage/writeStorage with fetch(`${API_BASE}/courses`) etc.
// Keep same function signatures so UI components stay unchanged.
