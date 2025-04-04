export interface Book {
  id: number
  title: string
  summary: string
  author: string
  narrator: string
  status: "To Read" | "Reading" | "Read"
  rating: number | null
}

