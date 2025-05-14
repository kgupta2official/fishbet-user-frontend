'use strict';
import { Button } from '@/components/ui/button';
import useResponsibleGambling from '../../hooks/useResponsibleGambling';
import ConfirmationModal from './components/confirmation-modal';

const ResponsibleGambling = () => {
  const {
    isOpen,
    handleClick,
    checkedValue,
    handleRadio,
    selectedDate,
    handleDate,
    handleRequestSubmit,
    loading,
    message,
    setShowToast,
    showToast,
    status,
  } = useResponsibleGambling();
  return (
    <section className="border border-[rgb(var(--lb-blue-300))] rounded">
      <div className="p-4 border-b border-[rgb(var(--lb-blue-300))]">
        <div className="mb-2">
          <div className="text-white text-[14px] font-bold">Self Exclusion</div>
          <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
            Need a break from Fishbet? To start the automated self
            exclusion process, please click the button below to receive
            confirmation instructions via email.
          </div>
        </div>
      </div>
      <div className="mt-0 p-4 flex flex-col sm:flex-row gap-2 justify-between">
        <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
          Learn more about
          <span className="text-white text-[14px] font-bold cursor-pointer">
            {' '}
            Self Exclusion
          </span>
        </div>
        <Button
          onClick={handleClick}
          className="bg-gray-500 py-2 text-white rounded hover:bg-gray-600 mr-2"
        >
          Request Self Exclusion
        </Button>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        handleClick={handleClick}
        checkedValue={checkedValue}
        handleRadio={handleRadio}
        handleDate={handleDate}
        selectedDate={selectedDate}
        handleRequestSubmit={handleRequestSubmit}
        loading={loading}
        message={message}
        showToast={showToast}
        setShowToast={setShowToast}
        status={status}
      />
    </section>
  );
};
export default ResponsibleGambling;
