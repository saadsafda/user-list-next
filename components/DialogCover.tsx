import { ReactNode } from "react";

type DialogCoverProps = {
  children: ReactNode;
};

const DialogCover = ({ children }: DialogCoverProps) => {
  return (
    <div className="fixed inset-0 bg-[#000000a1] flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default DialogCover;
