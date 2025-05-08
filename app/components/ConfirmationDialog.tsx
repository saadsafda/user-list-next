import strings from "../../locales/en.json";
import classNames from "../../styles/classNames";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a1] z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className={`${classNames.darkButton} w-full`}
          >
            {strings.no}
          </button>
          <button
            onClick={onConfirm}
            className={`${classNames.addButton} w-full`}
          >
            {strings.yes}
          </button>
        </div>
      </div>
    </div>
  );
}
