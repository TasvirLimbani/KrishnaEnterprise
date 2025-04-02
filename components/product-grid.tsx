import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getImageKitUrl } from "@/lib/imagekit"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <Card key={product.id} className="overflow-hidden h-full transition-all hover:shadow-md">
          <div className="aspect-square relative">
            <Image
              src={getImageKitUrl(product.imageUrl)}
              alt={product.name}
              fill
              className="object-contain"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{product.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="text-sm text-muted-foreground">
              {product.inStock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

