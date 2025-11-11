import { useState } from 'react';
import { BookOpen, Home, GraduationCap, Users, Settings, LogOut, Menu, Search, Bell, ShoppingCart as CartIcon, FileText, BarChart, Award } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Toaster } from './components/ui/sonner';
import GuestHome from './components/guest/GuestHome';
import CourseCatalog from './components/guest/CourseCatalog';
import CourseDetail from './components/guest/CourseDetail';
import About from './components/guest/About';
import Contact from './components/guest/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import StudentDashboard from './components/student/StudentDashboard';
import MyCourses from './components/student/MyCourses';
import CourseContent from './components/student/CourseContent';
import StudentProfile from './components/student/StudentProfile';
import ShoppingCart from './components/student/ShoppingCart';
import Checkout from './components/student/Checkout';
import Assignments from './components/student/Assignments';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ManageCourses from './components/teacher/ManageCourses';
import TeacherSchedule from './components/teacher/TeacherSchedule';
import GradeAssignments from './components/teacher/GradeAssignments';
import StudentList from './components/teacher/StudentList';
import TeacherProfile from './components/teacher/TeacherProfile';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import CourseManagement from './components/admin/CourseManagement';
import AdminSettings from './components/admin/AdminSettings';
import AdminAnalytics from './components/admin/AdminAnalytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<string | null>(null); // null, 'student', 'teacher', 'admin'
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (role: string) => {
    setUser(role);
    if (role === 'student') setCurrentPage('student-dashboard');
    if (role === 'teacher') setCurrentPage('teacher-dashboard');
    if (role === 'admin') setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setCurrentPage('course-detail');
  };

  const renderNavigation = () => {
    if (!user) {
      return (
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">EduPlatform</span>
              </div>
              <div className="hidden md:flex gap-6">
                <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600">
                  Trang chủ
                </button>
                <button onClick={() => setCurrentPage('courses')} className="hover:text-blue-600">
                  Khóa học
                </button>
                <button onClick={() => setCurrentPage('about')} className="hover:text-blue-600">
                  Giới thiệu
                </button>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-blue-600">
                  Liên hệ
                </button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setCurrentPage('login')}>
                  Đăng nhập
                </Button>
                <Button onClick={() => setCurrentPage('register')}>Đăng ký</Button>
              </div>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">EduPlatform</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {user === 'student' ? 'S' : user === 'teacher' ? 'T' : 'A'}
                </div>
                <span className="hidden md:block">{user === 'student' ? 'Học sinh' : user === 'teacher' ? 'Giáo viên' : 'Admin'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const renderSidebar = () => {
    if (!user) return null;

    let menuItems: Array<{ icon: any; label: string; page: string }> = [];
    
    if (user === 'student') {
      menuItems = [
        { icon: Home, label: 'Dashboard', page: 'student-dashboard' },
        { icon: BookOpen, label: 'Khóa học của tôi', page: 'my-courses' },
        { icon: Users, label: 'Hồ sơ', page: 'student-profile' },
        { icon: CartIcon, label: 'Giỏ hàng', page: 'shopping-cart' },
        { icon: FileText, label: 'Bài tập', page: 'assignments' },
      ];
    } else if (user === 'teacher') {
      menuItems = [
        { icon: Home, label: 'Dashboard', page: 'teacher-dashboard' },
        { icon: BookOpen, label: 'Quản lý khóa học', page: 'manage-courses' },
        { icon: Users, label: 'Lịch dạy', page: 'teacher-schedule' },
        { icon: Award, label: 'Chấm bài', page: 'grade-assignments' },
        { icon: Users, label: 'Danh sách học sinh', page: 'student-list' },
        { icon: Users, label: 'Hồ sơ', page: 'teacher-profile' },
      ];
    } else if (user === 'admin') {
      menuItems = [
        { icon: Home, label: 'Dashboard', page: 'admin-dashboard' },
        { icon: BarChart, label: 'Thống kê hệ thống', page: 'admin-analytics' },
        { icon: Users, label: 'Quản lý người dùng', page: 'user-management' },
        { icon: BookOpen, label: 'Quản lý khóa học', page: 'admin-courses' },
        { icon: Settings, label: 'Cài đặt', page: 'admin-settings' },
      ];
    }

    return (
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white border-r min-h-screen`}>
        <div className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 hover:bg-gray-100 ${
                currentPage === item.page ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 hover:bg-gray-100 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (currentPage === 'login') return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
    if (currentPage === 'register') return <Register onNavigate={setCurrentPage} />;
    if (currentPage === 'forgot-password') return <ForgotPassword onNavigate={setCurrentPage} />;
    if (currentPage === 'home') return <GuestHome onNavigate={setCurrentPage} onCourseSelect={handleCourseSelect} />;
    if (currentPage === 'courses') return <CourseCatalog onCourseSelect={handleCourseSelect} />;
    if (currentPage === 'course-detail') return <CourseDetail course={selectedCourse} onNavigate={setCurrentPage} />;
  if (currentPage === 'about') return <About />;
  if (currentPage === 'contact') return <Contact />;
    
    if (currentPage === 'student-dashboard') return <StudentDashboard onNavigate={setCurrentPage} />;
    if (currentPage === 'my-courses') return <MyCourses onCourseSelect={(course: any) => { setSelectedCourse(course); setCurrentPage('course-content'); }} />;
    if (currentPage === 'course-content') return <CourseContent course={selectedCourse} />;
    if (currentPage === 'student-profile') return <StudentProfile />;
    if (currentPage === 'shopping-cart') return <ShoppingCart onNavigate={setCurrentPage} />;
    if (currentPage === 'checkout') return <Checkout onNavigate={setCurrentPage} />;
    if (currentPage === 'assignments') return <Assignments />;
    
    if (currentPage === 'teacher-dashboard') return <TeacherDashboard onNavigate={setCurrentPage} />;
    if (currentPage === 'manage-courses') return <ManageCourses />;
    if (currentPage === 'teacher-schedule') return <TeacherSchedule />;
    if (currentPage === 'grade-assignments') return <GradeAssignments />;
    if (currentPage === 'student-list') return <StudentList />;
    if (currentPage === 'teacher-profile') return <TeacherProfile />;
    
  if (currentPage === 'admin-dashboard') return <AdminDashboard onNavigate={setCurrentPage} />;
  if (currentPage === 'admin-analytics') return <AdminAnalytics />;
  if (currentPage === 'user-management') return <UserManagement />;
  if (currentPage === 'admin-courses') return <CourseManagement />;
  if (currentPage === 'admin-settings') return <AdminSettings />;
    
    return <GuestHome onNavigate={setCurrentPage} onCourseSelect={handleCourseSelect} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <div className="flex">
        {renderSidebar()}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

// Legacy inline pages removed; now using full About & Contact components.