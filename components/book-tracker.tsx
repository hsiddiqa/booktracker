"use client"

import { useState, useEffect } from "react"
import type { Book } from "@/lib/types"
import BookList from "./book-list"
import BookForm from "./book-form"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BookTracker() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/books")

      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }

      const data = await response.json()
      setBooks(data)
    } catch (err) {
      setError("Error loading books. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      })

      if (!response.ok) {
        throw new Error("Failed to add book")
      }

      await fetchBooks()
      setShowForm(false)
    } catch (err) {
      setError("Error adding book. Please try again.")
      console.error(err)
    }
  }

  const deleteBook = async (id: number) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete book")
      }

      await fetchBooks()
    } catch (err) {
      setError("Error deleting book. Please try again.")
      console.error(err)
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add New Book"}</Button>
      </div>

      {showForm && <BookForm onSubmit={addBook} onCancel={() => setShowForm(false)} />}

      {loading ? (
        <div className="text-center py-10">Loading books...</div>
      ) : (
        <BookList books={filteredBooks} onDelete={deleteBook} />
      )}
    </div>
  )
}

