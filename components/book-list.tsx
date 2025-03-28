"use client"

import type { Book } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BookListProps {
  books: Book[]
  onDelete: (id: number) => void
}

export default function BookList({ books, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-muted-foreground">No books found. Add some books to get started!</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Narrator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
            {/* //Add Narrators
            //Add Summary of the book with Hover */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>

              <TableCell>{book.narrator}</TableCell>
              <TableCell>
                <Badge variant={book.status === "Read" ? "success" : book.status === "Reading" ? "warning" : "default"}>
                  {book.status}
                </Badge>
              </TableCell>
              <TableCell>{book.rating ? `${book.rating}/5` : "Not rated"}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onDelete(book.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

