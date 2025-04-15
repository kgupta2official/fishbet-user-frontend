import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarIcon,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useAvatar from '../../hooks/useAvatar';
import Image from 'next/image';
import { headPortrait } from '@/assets/png';
import CustomToast from '@/common/components/custom-toaster';

const Avatar = () => {
  const {
    onSubmit,
    setFile,
    user,
    message,
    setShowToast,
    showToast,
    status,
    loading,
    sizeError,
    setSizeError
  } = useAvatar();
  const { profileImage } = user || {};

  const handleChange=(e)=>{
    const selectedFile = e?.target?.files[0];
    if(selectedFile && selectedFile?.size > 2 * 1024 * 1024){
      setSizeError('File size must be less than 2MB!');
      setFile(null);
    }
    else{
      setSizeError('');
      setFile(selectedFile);
    }
  };

  // if (userLoading) return <>...Loading</>;
  return (
    <section className="border border-[rgb(var(--lb-blue-300))] rounded">
      <form onSubmit={onSubmit}>
        <div className="p-4 border-b border-[rgb(var(--lb-blue-300))] flex justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <AvatarIcon className="h-16 w-16">
                <AvatarImage src={profileImage} alt="avatar" />
                <AvatarFallback>
                  <Image
                    src={headPortrait}
                    alt="profileImage"
                    width={64}
                    height={64}
                  />
                </AvatarFallback>
              </AvatarIcon>
            </div>

            <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
              * JPG or PNG
            </div>
            <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
              * Max File Size 2MB
            </div>
          </div>
        </div>
        <div className="mt-4 p-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {sizeError && <p className="text-red-500 text-sm mt-2">{sizeError}</p>}
        </div>
        <div className="mt-0 p-4 flex justify-end">
          <Button
            type="submit"
            disabled={loading || sizeError}
            loading={loading}
            className="bg-green-500 py-2  text-white rounded hover:bg-green-600"
          >
            Update
          </Button>
        </div>
      </form>
      <CustomToast
        message={message}
        setShowToast={setShowToast}
        showToast={showToast}
        status={status}
      />
    </section>
  );
};
export default Avatar;
