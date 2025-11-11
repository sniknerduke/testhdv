import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface TeacherVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TeacherVerificationDialog({ open, onOpenChange }: TeacherVerificationDialogProps) {
  const [documentType, setDocumentType] = useState('certificate');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setIsSubmitted(true);
      
      // Auto close after success
      setTimeout(() => {
        onOpenChange(false);
        // Reset state after dialog closes
        setTimeout(() => {
          setIsSubmitted(false);
          setSelectedFile(null);
          setDocumentType('certificate');
        }, 300);
      }, 2000);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Xác thực tài khoản giáo viên</DialogTitle>
          <DialogDescription>
            Vui lòng tải lên tài liệu chứng minh bạn là giáo viên để được xác thực
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-3 block">Loại tài liệu</Label>
              <RadioGroup value={documentType} onValueChange={setDocumentType}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="certificate" id="certificate" />
                  <Label htmlFor="certificate" className="cursor-pointer">
                    Chứng chỉ giảng dạy
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="id" id="id" />
                  <Label htmlFor="id" className="cursor-pointer">
                    Chứng minh nhân dân / CCCD
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="degree" id="degree" />
                  <Label htmlFor="degree" className="cursor-pointer">
                    Bằng cấp (Đại học, Thạc sĩ, Tiến sĩ)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer">
                    Tài liệu khác
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">Tải lên tài liệu</Label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <FileText className="w-12 h-12 mx-auto text-blue-600" />
                      <p className="text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Kéo thả file hoặc click để chọn
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG (Tối đa 10MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Tài liệu của bạn sẽ được bảo mật và chỉ dùng để xác thực tài khoản. 
                Quá trình xác thực thường mất 1-3 ngày làm việc.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? 'Đang tải lên...' : 'Gửi xác thực'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <div>
              <h3 className="mb-2">Gửi thành công!</h3>
              <p className="text-sm text-gray-600">
                Tài liệu của bạn đã được gửi đi. Chúng tôi sẽ xem xét và thông báo kết quả trong vòng 1-3 ngày làm việc.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
