import React, { useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PhotoUpload: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [guestName, setGuestName] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbz1RukRIBeurcexnrUH1mPlkTPh2SB1LKnNigkCanpVeN8Hinw6pkocZP-hHd9IYwsq/exec';

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const uploadPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guestName || !files || files.length === 0) {
      alert("請輸入姓名並選擇照片");
      return;
    }

    setStatus('uploading');
    setStatusMessage("上傳中，請稍候...");

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const base64Data = await toBase64(file);
        
        const payload = {
          guestName: guestName,
          fileName: file.name,
          mimeType: file.type,
          base64Data: base64Data.split(',')[1] // 移除 Base64 header
        };

        const response = await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        if (result.status === "success") {
          successCount++;
        } else {
          failCount++;
        }
      } catch (error) {
        console.error(error);
        failCount++;
      }
    }

    if (failCount === 0) {
      setStatus('success');
      setStatusMessage("上傳成功！感謝你的分享。");
      setGuestName('');
      setFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else if (successCount > 0) {
      setStatus('error');
      setStatusMessage(`部分上傳成功 (${successCount})，部分失敗 (${failCount})。請再試一次。`);
    } else {
      setStatus('error');
      setStatusMessage("上傳失敗，請再試一次。");
    }
  };

  return (
    <section 
      id="photo-upload" 
      className="py-24 bg-white/90 backdrop-blur-sm relative overflow-hidden" 
      ref={ref}
    >
      {/* Soft gradient orbs for visual depth with float animation */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-wedding-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none animate-float"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-wedding-dark/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none animate-float-delayed"></div>

      <div className={`max-w-3xl mx-auto px-4 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-10">
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-wedding-dark tracking-wider mb-4">
            Share Your Moments
          </h3>
          <p className="text-gray-600 font-medium">分享你的即拍照片</p>
        </div>
        
        <div className="bg-white rounded-[20px] md:rounded-[40px] shadow-xl overflow-hidden border border-wedding-primary/10 relative ring-4 ring-white/50 p-8 md:p-12">
          {/* Decorative accent top bar */}
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-wedding-primary/30 via-wedding-dark/30 to-wedding-primary/30"></div>
          
          <form onSubmit={uploadPhotos} className="flex flex-col gap-6">
            <div>
              <label htmlFor="guestName" className="block text-sm font-semibold text-gray-700 mb-2">請問你的姓名？ (Your Name)</label>
              <input 
                type="text" 
                id="guestName" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="輸入姓名..." 
                required
                disabled={status === 'uploading'}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wedding-primary focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="fileInput" className="block text-sm font-semibold text-gray-700 mb-2">選擇照片 (Select Photos)</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-wedding-primary transition-colors bg-gray-50">
                <input 
                  type="file" 
                  id="fileInput" 
                  accept="image/*" 
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => setFiles(e.target.files)}
                  disabled={status === 'uploading'}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="pointer-events-none">
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-wedding-primary mb-2"></i>
                  <p className="text-gray-600">點擊或拖曳照片至此處</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {files && files.length > 0 ? `已選擇 ${files.length} 張照片` : '支援多張上傳'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 flex items-start gap-1.5 bg-gray-50 p-3 rounded-md border border-gray-100">
                <i className="fa-solid fa-circle-info mt-0.5 text-wedding-primary"></i>
                <span>溫馨提示：由於系統處理時間限制，如果一次上傳太多高清照片可能會超時失敗。若遇到此情況，請嘗試分批上傳 5-10 張照片哦！</span>
              </p>
            </div>

            <button 
              type="submit" 
              disabled={status === 'uploading' || !guestName || !files || files.length === 0}
              className="mt-4 w-full bg-wedding-dark text-white font-semibold py-4 rounded-lg shadow-md hover:bg-wedding-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'uploading' ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> 上傳中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-camera"></i> 上傳照片
                </>
              )}
            </button>

            {statusMessage && (
              <div className={`p-4 rounded-lg text-center font-medium ${
                status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
                status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PhotoUpload;
