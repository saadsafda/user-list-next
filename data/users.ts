// Simulate fetching user data
export const getUsers = () => {
  return Promise.resolve([
    { id: 1, name: "Alice", age: 23 },
    { id: 2, name: "Bob", age: 27 },
    { id: 3, name: "Charlie", age: 21 },
    { id: 4, name: "Dave", age: 29 },
    { id: 5, name: "Eve", age: 25 },
  ]);
};
