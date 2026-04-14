import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const PhotoUpload: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [guestName, setGuestName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const initWidget = () => {
      if (window.cloudinary && !widgetRef.current) {
        widgetRef.current = window.cloudinary.createUploadWidget({
          cloudName: "dcnq5labq", 
          uploadPreset: "Wedding Preset",
          sources: ["local", "camera"], // 支援手機相簿和直接拍照
          multiple: true,               // 允許多圖上傳
          maxFiles: 10,                 // 每次最多上傳 10 張，防止過載
          clientAllowedFormats: ["jpg", "png", "heic", "jpeg"],
          
          // --- 速度優化設定 ---
          maxImageWidth: 2000,          // 將寬度限制在 2000px 內
          maxImageHeight: 2000,
          imageShrink: true,            // 關鍵：在客戶端先壓縮圖片再傳送，速度提升 5x
          
          // 介面美化 (配合婚禮色調)
          styles: {
            palette: {
              window: "#FFFFFF",
              action: "#8e7cc3", // matching wedding-primary
              tabIcon: "#8e7cc3",
              textDark: "#444444",
              textLight: "#FFFFFF",
              link: "#8e7cc3",
              inactiveTabIcon: "#999999",
              error: "#F44235",
              inProgress: "#8e7cc3",
              complete: "#20B832",
              sourceBg: "#F4F4F4"
            }
          }
        }, (error: any, result: any) => { 
          if (!error && result && result.event === "success") { 
            setStatusMessage("上傳成功！感謝分享。");
            
            // 顯示縮圖預覽
            const thumbUrl = result.info.secure_url.replace("/upload/", "/upload/c_thumb,w_200,g_face/");
            setUploadedPhotos(prev => [...prev, thumbUrl]);
          }
        });
      }
    };

    // If script is already loaded
    if (window.cloudinary) {
      initWidget();
    } else {
      // Fallback if script takes time to load
      const script = document.querySelector('script[src="https://upload-widget.cloudinary.com/global/all.js"]');
      if (script) {
        script.addEventListener('load', initWidget);
      }
    }
  }, []);

  const handleOpenWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    const name = guestName.trim();
    
    if (!name) {
        alert("請先輸入你的名字，讓我們知道是誰傳的相片 😊");
        return;
    }

    if (widgetRef.current) {
      // 更新 Widget 的 Tags，這樣你在後台就能看到是誰上傳的
      widgetRef.current.update({ 
          tags: [name, "wedding_2026"],
          context: { uploader: name }
      });
      widgetRef.current.open();
    } else {
      alert("上傳組件載入中，請稍後再試...");
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
          <p className="text-gray-600 font-medium">分享你在婚禮現場捕捉到的精彩瞬間</p>
        </div>
        
        <div className="bg-white rounded-[20px] md:rounded-[40px] shadow-xl overflow-hidden border border-wedding-primary/10 relative ring-4 ring-white/50 p-8 md:p-12">
          {/* Decorative accent top bar */}
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-wedding-primary/30 via-wedding-dark/30 to-wedding-primary/30"></div>
          
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="guestName" className="block text-sm font-semibold text-gray-700 mb-2">請問你的姓名？ (Your Name)</label>
              <input 
                type="text" 
                id="guestName" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="請輸入你的名字 (例如: Andrew)" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wedding-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <button 
              onClick={handleOpenWidget}
              className="mt-2 w-full bg-wedding-dark text-white font-semibold py-4 rounded-lg shadow-md hover:bg-wedding-primary transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-camera"></i> 選擇並上傳相片
            </button>

            {statusMessage && (
              <div className="p-4 rounded-lg text-center font-medium bg-green-50 text-green-700 border border-green-200">
                {statusMessage}
              </div>
            )}

            {uploadedPhotos.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3 text-center">已上傳的照片：</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {uploadedPhotos.map((url, index) => (
                    <img 
                      key={index} 
                      src={url} 
                      alt={`Uploaded ${index + 1}`} 
                      className="w-20 h-20 object-cover rounded-md border border-gray-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoUpload;
