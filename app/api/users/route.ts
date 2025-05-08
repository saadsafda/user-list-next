import { NextRequest, NextResponse } from "next/server";

let users = [
  { id: 1, name: "Alice", age: 23 },
  { id: 2, name: "Bob", age: 27 },
  { id: 3, name: "Charlie", age: 21 },
  { id: 4, name: "Dave", age: 29 },
  { id: 5, name: "Eve", age: 25 },
];

// GET all users
export async function GET() {
  return NextResponse.json(users);
}

// POST create a new user
export async function POST(req: NextRequest) {
  const body = await req.json();
  const newUser = { id: Date.now(), ...body };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}

// DELETE user (pass id in query param, e.g., /api/users?id=123)
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  users = users.filter((user) => user.id !== id);
  return NextResponse.json({ success: true });
}
