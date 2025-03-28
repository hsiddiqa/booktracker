import BookTracker from "@/components/book-tracker"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Book Tracker</h1>
      <BookTracker />
    </main>
  )
}

