import strings from "../locales/en.json";
import classNames from "../styles/classNames";
import DialogCover from "./DialogCover";

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
    <DialogCover>
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
    </DialogCover>
  );
}
