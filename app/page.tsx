"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Product } from "@/types"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Get all products
        const querySnapshot = await getDocs(collection(db, "products"))
        const productsData: Product[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Product, "id">
          productsData.push({ id: doc.id, ...data })
        })

        // Filter and sort in memory instead of in the query
        const filtered = productsData
          .filter((product) => product.inStock)
          .sort((a, b) => {
            // Sort by createdAt in descending order (newest first)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          .slice(0, 4) // Limit to 4 products

        setFeaturedProducts(filtered)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to Krishna Enterprise</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted source for quality medical supplies and equipment
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <Link href="/products">
            <Button size="lg" className="mr-4">
              Browse All Products
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {isLoading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available.</p>
            <Link href="/products">
              <Button variant="link">View all products</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

