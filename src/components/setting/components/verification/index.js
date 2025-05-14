"use client"

import React from 'react';
import useVerification from '../../hooks/useVerification';
import CustomToast from '@/common/components/custom-toaster';
import { Button } from '@/components/ui/button';

const Verification = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    renderField,
    renderFileUpload,
    showToast,
    setShowToast,
    message,
    status,
  } = useVerification();

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded border border-[rgb(var(--lb-blue-300))] rounded text-white"
      >
        {/* <h2 className="text-2xl  p-6 font-bold">User Registration</h2> */}

        <div className='grid grid-cols-1  p-6 md:grid-cols-2 gap-6  '>
          {renderField('Username', 'username')}
          {renderField('First Name', 'firstName')}
          {renderField('Last Name', 'lastName')}
          {renderField('Date of Birth', 'dob', 'date')}
          {renderField('City', 'city')}
          {renderField('State', 'stateCode')}
          {renderFileUpload('Upload File', 'file')}
        </div>
        <div className="border-t border-[rgb(var(--lb-blue-300))]">
          <div className="mt-0 p-4 flex justify-end ">
            <Button
              type="submit"
              className="bg-green-500 px-4  py-2  text-white rounded hover:bg-green-600"
            >
              Verification
            </Button>
          </div>
        </div>
        <CustomToast
          message={message}
          showToast={showToast}
          setShowToast={setShowToast}
          status={status}
        />
      </form>
    </section>
  );
};

export default Verification;



// import CustomToast from '@/common/components/custom-toaster';
// import useVerification from '../../hooks/useVerification';


// const VerificationForm = () => {
//   const {
// control,
// handleSubmit,
// onSubmit,
// renderField,
// renderFileUpload,
// showToast,
// setShowToast,
// message,
// status,
//   } = useVerification();

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {renderField('Full Name', 'fullName')}
//         {renderField('Email', 'email', 'email')}
//         {renderFileUpload('Upload ID', 'idUpload')}
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
//           Submit
//         </button>
//       </form>

// <CustomToast
//   message={message}
//   showToast={showToast}
//   setShowToast={setShowToast}
//   status={status}
// />
//     </div>
//   );
// };

// export default VerificationForm;

