"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getUsers } from "../../data/users";
import classes from "../../styles/classNames";
import LoadingSpinner from "./LoadingSpinner";
import ConfirmationDialog from "./ConfirmationDialog";
import UserFormDialog from "./UserFormDialog";
import strings from "../../locales/en.json";
import classNames from "../../styles/classNames";
import { TrashIcon } from "./Icons";

type User = { id: number; name: string; age: number };

export default function UserList() {
  const [showDialog, setShowDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleShowConfirm = (id: number) => {
    setConfirmId(id);
    setShowConfirm(true);
  };

  const handleRemove = () => {
    setUsers((prev) => prev.filter((user) => user.id !== confirmId));
    setShowConfirm(false);
  };

  const handleAddUser = (name: string, age: number) => {
    const newUser: User = {
      id: Date.now(),
      name,
      age,
    };
    setUsers((prev) => [...prev, newUser]);
    setShowDialog(false);
  };

  const columns = [
    {
      name: <div className={classes.tableHeader}>Name</div>,
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: <div className={classes.tableHeader}>Age</div>,
      selector: (row: User) => row.age.toString(),
      sortable: true,
    },
    {
      name: <div className={classes.tableHeader}>Action</div>,
      cell: (row: User) => (
        <button
          className={classNames.removeButton}
          onClick={() => handleShowConfirm(row.id)}
        >
          {TrashIcon}
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between py-4 items-center">
        <h2 className="text-xl font-bold mb-4">{strings.userList}</h2>
        <button
          className={classNames.addButton}
          type="button"
          onClick={() => setShowDialog(true)}
        >
          {strings.addUser}
        </button>
      </div>
      <div className="border dark:border-0 border-gray-400 rounded-xl">
        <DataTable
          columns={columns}
          data={users}
          progressPending={loading}
          pagination
        />
      </div>

      <UserFormDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={handleAddUser}
      />

      {loading && <LoadingSpinner />}

      {showConfirm && (
        <ConfirmationDialog
          message={strings.confirm}
          onConfirm={handleRemove}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
