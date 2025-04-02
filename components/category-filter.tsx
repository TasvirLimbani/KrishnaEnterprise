"use client"

import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-medium text-lg">Categories</h2>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCategory("all")}
        >
          All Products
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

