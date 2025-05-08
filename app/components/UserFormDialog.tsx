"use client";

import classNames from "../../styles/classNames";
import strings from "../../locales/en.json";

import { useState } from "react";
import InputWithIcon from "./InputField";
import { AgeIcon, UserIcon } from "./Icons";

type UserFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, age: number) => void;
};

export default function UserFormDialog({
  isOpen,
  onClose,
  onSubmit,
}: UserFormDialogProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;
    onSubmit(name, Number(age));
    setName("");
    setAge("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000a1] flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4 text-center">{strings.addNewUser}</h3>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <InputWithIcon
            id="name"
            label={strings.name}
            type="text"
            placeholder={strings.name}
            icon={UserIcon}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputWithIcon
            id="age"
            label={strings.age}
            type="number"
            placeholder={strings.age}
            icon={AgeIcon}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="flex justify-center gap-2 mt-6">
            <button
              type="button"
              className={`${classNames.darkButton} w-full`}
              onClick={onClose}
            >
              {strings.cancel}
            </button>
            <button
              type="submit"
              className={`${classNames.addButton} w-full`}
            >
              {strings.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
