"use client";

import strings from "../locales/en.json";
import UserList from "../components/UserList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">
      <h1 className="text-3xl mt-4 text-center">{strings.welcome}</h1>
      <UserList />
    </main>
  );
}
