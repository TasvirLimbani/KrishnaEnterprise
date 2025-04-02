import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions about our products or services? We're here to help. Contact us using the information below.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">
                  123 Radhe Complex,
                  <br />
                  Shayamdham
                  <br />
                  Surat, Gujarat 395006
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">
                  Main: +91 63522 08845
                  <br />
                  Support: +91 70694 85515
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">
                  info@KrishnaEnterprise.com
                  <br />
                  support@KrishnaEnterprise.com
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d232.45520549326324!2d72.89233165778049!3d21.220648767434252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1743582864363!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="rounded-md mb-4"
              ></iframe>

              <div className="text-center">
                <h3 className="font-medium mb-2">Visit Our Store</h3>
                <p className="text-sm text-muted-foreground">
                  We're conveniently located in the Healthcare District. Free parking available for customers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

