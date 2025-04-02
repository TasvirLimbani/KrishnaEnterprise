export interface Product {
  id: string
  name: string
  description: string
  category: string
  price?: number // Made price optional
  inStock: boolean
  imageUrl: string | null
  createdAt: string
}

