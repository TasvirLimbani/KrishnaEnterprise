import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Krishna Enterprise</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, Krishna Enterprisehas been a trusted provider of quality medical supplies and equipment for over a
            decade. What started as a small family-owned business has grown into a comprehensive medical supply store
            serving healthcare professionals and individuals alike.
          </p>
          <p className="text-muted-foreground mb-4">
            Our mission is to provide accessible, affordable, and high-quality medical products to improve the health
            and wellbeing of our community. We believe that everyone deserves access to the best healthcare products
            available.
          </p>
          <p className="text-muted-foreground">
            With a team of knowledgeable staff and a wide range of products, we're committed to meeting all your medical
            supply needs with exceptional service and care.
          </p>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="https://cdn6.f-cdn.com/contestentries/587210/15119755/577f7ad68f869_thumb900.jpg" 
            alt="Krishna Enterprise store" 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">Quality Products</h3>
            <p className="text-muted-foreground">
              We source our products from trusted manufacturers and suppliers to ensure the highest quality standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">Expert Advice</h3>
            <p className="text-muted-foreground">
              Our knowledgeable staff can provide guidance and recommendations for your specific needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">Competitive Pricing</h3>
            <p className="text-muted-foreground">
              We offer fair and transparent pricing on all our products to make healthcare accessible.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              We ensure prompt delivery of your orders to meet your healthcare needs without delay.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">Wide Selection</h3>
            <p className="text-muted-foreground">
              From first aid supplies to specialized medical equipment, we offer a comprehensive range of products.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-2">Customer Satisfaction</h3>
            <p className="text-muted-foreground">
              Your satisfaction is our priority, and we strive to provide exceptional service with every interaction.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[
          { 
            name: "Mr. Raj A Gajipara", 
            role: "Founder & CEO", 
            image: "https://firebasestorage.googleapis.com/v0/b/dtlive-22a03.appspot.com/o/products%2FCEO%2FWhatsApp%20Image%202025-03-08%20at%2011.26.41%20AM.jpeg?alt=media&token=81cd6678-455f-4edb-abcf-6dd9df3f5324" 
          },
          // { 
          //   name: "Mr. Pankit A Gajipara", 
          //   role: "Founder & CEO", 
          //   image: "https://firebasestorage.googleapis.com/v0/b/dtlive-22a03.appspot.com/o/products%2FCEO%2FIMG_1928.PNG?alt=media&token=1c956b0a-300c-4c5e-8bb9-a0b5ade76498" 
          // },
          // { 
          //   name: "Mr. Parth A Gajipara", 
          //   role: "Founder & CEO", 
          //   image: "https://firebasestorage.googleapis.com/v0/b/dtlive-22a03.appspot.com/o/products%2FCEO%2FIMG_1929.PNG?alt=media&token=95c73c83-cc0e-44d1-92a2-235b96709d11" 
          // },
        ].map((member, index) => (
          <div key={index} className="text-center">
            <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill
                className="object-cover rounded-full"
                priority
                unoptimized
                style={{
                  objectPosition: 'center',
                  aspectRatio: '1/1'
                }}
              />
            </div>
            <h3 className="text-xl font-medium">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

