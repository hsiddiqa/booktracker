import type { Book } from "./types"

// In-memory database for the v0 preview environment
let books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    summary:"This is about great gatsby",
    author: "F. Scott Fitzgerald",
    narrator: "Teddy Hamilton",
    status: "Read",
    rating: 4,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    summary:"This is about great gatsby",
    author: "Harper Lee",
    narrator: "Jason Clarke",
    status: "Read",
    rating: 5,
  },
  {
    id: 3,
    title: "1984",
    summary:"This is about great gatsby",
    author: "George Orwell",
    narrator: "Ava Erickson",
    status: "Reading",
    rating: null,
  },
  {
    id: 4,
    title: "The Hobbit",
    summary:"This is about great gatsby",
    author: "J.R.R. Tolkien",
    narrator: "Julia Wahlen",
    status: "To Read",
    rating: null,
  },
]

// Get all books
export function getAllBooks(): Book[] {
  return [...books]
}

// Add a new book
export function addBook(book: Omit<Book, "id">): number {
  const id = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1
  const newBook = { ...book, id }
  books = [newBook, ...books]
  return id
}

// Delete a book
export function deleteBook(id: number): boolean {
  const initialLength = books.length
  books = books.filter((book) => book.id !== id)
  return books.length < initialLength
}

