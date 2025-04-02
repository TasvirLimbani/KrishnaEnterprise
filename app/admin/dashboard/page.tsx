"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase/config"
import type { Product } from "@/types"
import AdminProductList from "@/components/admin-product-list"
import AddProductForm from "@/components/add-product-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        fetchProducts()
      } else {
        setIsAuthenticated(false)
        router.push("/admin/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)

      // Get all products without complex queries
      const querySnapshot = await getDocs(collection(db, "products"))
      const productsData: Product[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Product, "id">
        productsData.push({ id: doc.id, ...data })
      })

      // Sort products by createdAt in memory
      productsData.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      setProducts(productsData)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      // Directly delete from Firestore
      await deleteDoc(doc(db, "products", id))

      setProducts(products.filter((product) => product.id !== id))
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products])
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Manage Products</TabsTrigger>
          <TabsTrigger value="add">Add New Product</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {isLoading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <AdminProductList products={products} onDeleteProduct={handleDeleteProduct} />
          )}
        </TabsContent>

        <TabsContent value="add">
          <AddProductForm onProductAdded={handleAddProduct} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

