import { type NextRequest, NextResponse } from "next/server"
import { getAllBooks, addBook } from "@/lib/db"

export async function GET() {
  try {
    const books = getAllBooks()
    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookData = await request.json()

    // Validate required fields
    if (!bookData.title || !bookData.author || !bookData.status) {
      return NextResponse.json({ error: "Title, author, and status are required" }, { status: 400 })
    }

    const id = addBook(bookData)

    return NextResponse.json({ id, ...bookData }, { status: 201 })
  } catch (error) {
    console.error("Error adding book:", error)
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
  }
}

