import React from "react";
import { ExamInstructionScreen } from "../ExamInstructionScreen";

interface MockTestInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockTestInstructionsModal: React.FC<MockTestInstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1120]/70 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1340px] max-h-[94vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-[#e2e8f0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ExamInstructionScreen
          isModal={true}
          onClose={onClose}
          showHeader={false}
          showFooter={false}
          showStrip={false}
          examTitle="Test Instructions"
          actionButtonText="Close Instructions"
        />
      </div>
    </div>
  );
};

export default MockTestInstructionsModal;
