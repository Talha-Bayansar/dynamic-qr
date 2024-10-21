'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Globe, Briefcase, Calendar, UserPlus } from "lucide-react"

// Mock vCard data
const vCardData = {
  name: "Jane Doe",
  jobTitle: "Senior Software Engineer",
  company: "Tech Innovations Inc.",
  avatar: "/placeholder.svg?height=100&width=100",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  website: "www.janedoe.com",
  address: "123 Tech Street, San Francisco, CA 94105",
  birthday: "1985-04-15"
}

export function VcardProfile() {
  return (
    <div className="container mx-auto p-4 relative">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={vCardData.avatar} alt={vCardData.name} />
            <AvatarFallback>{vCardData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold">{vCardData.name}</CardTitle>
            <CardDescription className="text-xl">{vCardData.jobTitle}</CardDescription>
            <Badge variant="secondary" className="mt-2">{vCardData.company}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground" />
              <span>{vCardData.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-muted-foreground" />
              <span>{vCardData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="text-muted-foreground" />
              <span>{vCardData.website}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-muted-foreground" />
              <span>{vCardData.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="text-muted-foreground" />
              <span>{vCardData.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-muted-foreground" />
              <span>{new Date(vCardData.birthday).toLocaleDateString()}</span>
            </div>
          </div>
          <Separator />
        </CardContent>
      </Card>
      <Button 
        className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={() => {
          // Add contact functionality would go here
          alert("Add contact functionality to be implemented")
        }}
      >
        <UserPlus className="h-6 w-6" />
        <span className="sr-only">Add Contact</span>
      </Button>
    </div>
  )
}