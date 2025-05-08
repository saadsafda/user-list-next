"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getUsers, createUser, deleteUser } from "@/lib/api";
import classes from "../styles/classNames";
import LoadingSpinner from "./LoadingSpinner";
import ConfirmationDialog from "./ConfirmationDialog";
import UserFormDialog from "./UserFormDialog";
import strings from "../locales/en.json";
import classNames from "../styles/classNames";
import { TrashIcon } from "./Icons";
import DialogCover from "./DialogCover";

type User = { id: number; name: string; age: number };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Fetch all users
  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  // Show confirm delete dialog
  const handleShowConfirm = (id: number) => {
    setConfirmId(id);
    setShowConfirm(true);
  };

  // Delete user
  const handleRemove = async () => {
    if (confirmId !== null) {
      setLoadingDelete(true);
      try {
        setShowConfirm(false);
        await deleteUser(confirmId);
        setUsers((prev) => prev.filter((user) => user.id !== confirmId));
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setLoadingDelete(false);
        setShowConfirm(false);
      }
    }
  };

  // Add new user
  const handleAddUser = async (name: string, age: number) => {
    setLoadingCreate(true);
    try {
      setShowDialog(false);
      const newUser = await createUser({ name, age });
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoadingCreate(false);
    }
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
      {loading && <LoadingSpinner />}
      {loadingDelete && (
        <DialogCover>
          <LoadingSpinner />
        </DialogCover>
      )}
      {loadingCreate && (
        <DialogCover>
          <LoadingSpinner />
        </DialogCover>
      )}

      <UserFormDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={handleAddUser}
      />

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
