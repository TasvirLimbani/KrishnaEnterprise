"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

interface AddProductFormProps {
  onProductAdded: (product: Product) => void
}

type FormValues = {
  name: string
  description: string
  category: string
  inStock: boolean
}

interface Category {
  category: string
  image?: string
}

export default function AddProductForm({ onProductAdded }: AddProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  // Change state type to include images
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      inStock: true,
    },
  })

  const inStock = watch("inStock")

  // Fetch categories from Firebase
  // Update the fetchCategories effect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true)
        const querySnapshot = await getDocs(collection(db, "Category"))
        const categoriesData = querySnapshot.docs.map(doc => ({
          category: doc.data().category,
          image: doc.data().imageUrl || doc.data().image // Try both common field names
        }))
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([
          { category: "First Aid", image: "/images/first-aid.png" },
          { category: "Medications", image: "/images/medications.png" },
          // Add other default categories with image paths
        ])
      } finally {
        setIsLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setImagePreview(null)
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
    
      // Upload image to Firebase Storage
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
    
      const productData: Omit<Product, "id"> = {
        name: data.name,
        description: data.description,
        category: data.category,
        inStock: data.inStock,
        imageUrl: imageUrl || "",
        createdAt: new Date().toISOString(),
      };
    
      // Add product to Firestore
      const docRef = await addDoc(collection(db, "products"), productData)
      const newProduct: Product = { id: docRef.id, ...productData }
    
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    
      onProductAdded(newProduct)
      reset()
      setImageFile(null)
      setImagePreview(null)
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select category"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.category} value={cat.category}>
                    <div className="flex items-center gap-2">
                      {cat.image ? (
                        <img 
                          src={cat.image} 
                          alt={cat.category} 
                          className="w-6 h-6 object-cover rounded"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded"></div>
                      )}
                      <span>{cat.category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            placeholder="Enter product description"
            rows={4}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="inStock" className="block mb-2">
            Availability
          </Label>
          <div className="flex items-center space-x-2">
            <Switch id="inStock" checked={inStock} onCheckedChange={(checked) => setValue("inStock", checked)} />
            <Label htmlFor="inStock" className="cursor-pointer">
              {inStock ? "In Stock" : "Out of Stock"}
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />

          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
              <div className="relative w-40 h-40 rounded-md overflow-hidden border">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Product preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Product...
          </>
        ) : (
          "Add Product"
        )}
      </Button>
    </form>
  )
}

