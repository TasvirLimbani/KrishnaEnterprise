"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye } from "lucide-react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { getImageKitUrl } from "@/lib/imagekit"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const productDoc = await getDoc(doc(db, "products", params.id))

        if (productDoc.exists()) {
          setProduct({
            id: productDoc.id,
            ...(productDoc.data() as Omit<Product, "id">),
          })
        } else {
          setError("Product not found")
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{error || "Product not found"}</h1>
        <p className="mb-6 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          <Image
            src={getImageKitUrl(product.imageUrl || "", 600, 600)}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className={`h-3 w-3 rounded-full mr-2 ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>

          <Button className="mt-auto">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Product Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Storage Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Store in a cool, dry place away from direct sunlight. Keep out of reach of children.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Shipping Information</h3>
            <p className="text-sm text-muted-foreground">
              For information about availability and shipping, please contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-32 mb-6">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-lg" />

        <div className="flex flex-col space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full mt-auto" />
        </div>
      </div>
    </div>
  )
}

