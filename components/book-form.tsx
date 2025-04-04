"use client"

import type React from "react"

import { useState } from "react"
import type { Book } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void
  onCancel: () => void
}

export default function BookForm({ onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary:"",
    narrator:"",
    status: "To Read",
    rating: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const bookData = {
      ...formData,
      rating: formData.rating ? Number.parseInt(formData.rating) : null,
    }

    onSubmit(bookData as Omit<Book, "id">)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Book</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Book Summary</Label>
            <Input id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="narrator">Narrator</Label>
            <Input id="narrator" name="narrator" value={formData.narrator} onChange={handleChange} required/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Read">To Read</SelectItem>
                <SelectItem value="Reading">Reading</SelectItem>
                <SelectItem value="Read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5) {formData.status !== "Read" && "- only for read books"}</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              disabled={formData.status !== "Read"}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Book</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

