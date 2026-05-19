"use client"

import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Rechercher des jobs..." }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <div className="w-full max-w-md mx-auto h-12">
      <div className="relative flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm">
        <Search className="h-10 w-5 items-center text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  )
}
