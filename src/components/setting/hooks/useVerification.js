'use client';

 import { useState } from 'react';
 import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';

const useVerification = () => {


  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('success');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      dob: '',
      city: '',
      stateCode: '',
      file: null,
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem('verificationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const { ...rest } = parsed;
      // const { file, ...rest } = parsed;
      reset(rest); // Populate form fields (excluding file)
    }
  }, [reset]);
  
  

  // const onSubmit = (data) => {
  //   console.log('Submitted data:', data);
  //   alert('Form submitted!');
  //   // Handle backend submission here
  //   reset(); // Optional: Reset form after submit
  // };
  const onSubmit = (data) => {
    try {
      console.log('Submitted data:', data);
      setMessage('Form submitted successfully!');
      setStatus('success');
      setShowToast(true);
      reset();
    } catch (error) {
      setMessage('Something went wrong.');
      setStatus('error');
      console.error(error)
      setShowToast(true);
    }
  };

  const renderField = (label, name, type = "text", rules = {}) => (
    <div >
    <div key={name}>
     
      <div className="text-white text-[14px] font-bold">{label}</div>
      <Controller
        control={control}
        name={name}
        rules={{ required: `Please enter ${label.toLowerCase()}`, ...rules }}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type={type}
              className={`mt-1 ${
                fieldState.error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {fieldState.error && (
              <div className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </div>
            )}
          </>
        )}
      />
    </div>
    </div>
  );

  const renderFileUpload = (label, name) => (
    <div className="mb-4">
      <div className="text-white text-sm font-bold">{label}</div>
      <Controller
        control={control}
        name={name}
        rules={{ required: 'Please upload a file' }}
        render={({ field, fieldState }) => (
          <>
            <input
              type="file"
              onChange={(e) => field.onChange(e.target.files[0])}
              className={`block mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                fieldState.error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {fieldState.error && (
              <div className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </div>
            )}
          </>
        )}
      />
    </div>
  );

  return {
    control,
    handleSubmit,
    onSubmit,
    renderField,
    renderFileUpload,
    errors,
    showToast,
    setShowToast,
    message,
    status,
  };
};


export default useVerification;

// 'use client';

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { useForm, Controller } from 'react-hook-form';

// const useVerification = () => {
//   const [showToast, setShowToast] = useState(false);
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('success');
//   const [selectedFile, setSelectedFile] = useState(null); // Only this file state is needed

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       if (selectedFile) {
//         const reader = new FileReader();

//         reader.onloadend = () => {
//           const base64File = reader.result;

//           const finalData = {
//             ...data,
//             file: {
//               name: selectedFile.name,
//               type: selectedFile.type,
//               size: selectedFile.size,
//               content: base64File, // base64-encoded string
//             },
//           };

//           localStorage.setItem('verificationData', JSON.stringify(finalData));

//           setMessage('Form submitted and saved to local storage!');
//           setStatus('success');
//           setShowToast(true);
//           reset();
//           setSelectedFile(null);
//         };

//         reader.readAsDataURL(selectedFile); // start reading the file
//       } else {
//         setMessage('No file uploaded');
//         setStatus('error');
//         setShowToast(true);
//       }
//     } catch (error) {
//       setMessage('Something went wrong.');
//       setStatus('error');
//       setShowToast(true);
//     }
//   };

//   const renderField = (label, name, type = 'text', rules = {}) => (
//     <div key={name}>
//       <div className="text-white text-[14px] font-bold">{label}</div>
//       <Controller
//         control={control}
//         name={name}
//         rules={{ required: `Please enter ${label.toLowerCase()}`, ...rules }}
//         render={({ field, fieldState }) => (
//           <>
//             <Input
//               {...field}
//               type={type}
//               className={`mt-1 ${
//                 fieldState.error ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {fieldState.error && (
//               <div className="text-red-500 text-sm mt-1">
//                 {fieldState.error.message}
//               </div>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );

//   const renderFileUpload = (label, name) => (
//     <div className="mb-4">
//       <div className="text-white text-sm font-bold">{label}</div>
//       <Controller
//         control={control}
//         name={name}
//         rules={{ required: 'Please upload a file' }}
//         render={({ fieldState }) => (
//           <>
//             <input
//               type="file"
//               onChange={(e) => setSelectedFile(e.target.files[0])}
//               className={`block mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
//                 fieldState.error ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {fieldState.error && (
//               <div className="text-red-500 text-sm mt-1">
//                 {fieldState.error.message}
//               </div>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );

//   return {
//     control,
//     handleSubmit,
//     onSubmit,
//     renderField,
//     renderFileUpload,
//     errors,
//     showToast,
//     setShowToast,
//     message,
//     status,
//   };
// };

// export default useVerification;



// "use client"

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { useForm, Controller } from 'react-hook-form';

// const useVerification = () => {
  // const [showToast, setShowToast] = useState(false);
  // const [message, setMessage] = useState('');
  // const [status, setStatus] = useState('success'); // or 'error'

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

  // const onSubmit = (data) => {
  //   try {
  //     console.log('Submitted data:', data);
  //     setMessage('Form submitted successfully!');
  //     setStatus('success');
  //     setShowToast(true);
  //     reset(); // Optional
  //   } catch (error) {
  //     setMessage('Something went wrong.');
  //     setStatus('error');
  //     setShowToast(true);
  //   }
  // };

//   const renderField = (label, name, type = 'text', rules = {}) => (
//     <div key={name}>
//       <div className="text-white text-[14px] font-bold">{label}</div>
//       <Controller
//         control={control}
//         name={name}
//         rules={{ required: `Please enter ${label.toLowerCase()}`, ...rules }}
//         render={({ field, fieldState }) => (
//           <>
//             <Input
//               {...field}
//               type={type}
//               className={`${
//                 fieldState.error ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {fieldState.error && (
//               <div className="text-red-500 text-sm mt-1">
//                 {fieldState.error.message}
//               </div>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );

//   const renderFileUpload = (label, name) => (
//     <div className="mb-4">
//       <div className="text-white text-sm font-bold">{label}</div>
//       <Controller
//         control={control}
//         name={name}
//         rules={{ required: 'Please upload a file' }}
//         render={({ field, fieldState }) => (
//           <>
//             <input
//               type="file"
//               onChange={(e) => field.onChange(e.target.files[0])}
//               className={`w-full p-2 rounded ${
//                 fieldState.error ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {fieldState.error && (
//               <div className="text-red-500 text-sm mt-1">
//                 {fieldState.error.message}
//               </div>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );

//   return {
    // control,
    // handleSubmit,
    // onSubmit,
    // renderField,
    // renderFileUpload,
    // errors,
    // showToast,
    // setShowToast,
    // message,
    // status,
//   };
// };

// export default useVerification;
