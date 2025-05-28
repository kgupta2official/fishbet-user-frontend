import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const VerifyModal = ({ message, onClose  , buttonLabel = "Close"}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <p className="text-gray-800 text-sm mb-6 font-semibold">{message}</p>
        <Button onClick={onClose} className="w-full bg-[#4ADE80] text-[#000] hover:bg-[#4ADE80] font-bold">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default VerifyModal;
