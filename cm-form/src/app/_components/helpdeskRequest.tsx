"use client"

import { useState } from "react"
import { Upload, FileText, Phone, Mail, User, RefreshCw, Send, Paperclip, X } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Badge } from "../components/ui/badge"
import { Textarea } from "../components/ui/textarea"

// Mock API data - replace with actual API call
const mockUserData = {
  ticketNumber: "Not assigned",
  phoneNumber: "Not available",
  name: "Not available",
  email: "Not available",
}

export default function HelpdeskRequest() {
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(mockUserData)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "text/*": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 5))
    },
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const loadUserInformation = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setUserData({
        ticketNumber: "HD-2024-001234",
        phoneNumber: "+1 (555) 123-4567",
        name: "John Doe",
        email: "john.doe@company.com",
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Please provide a description of your request.")
      return
    }

    setIsLoading(true)
    // Simulate form submission
    setTimeout(() => {
      alert("Request submitted successfully!")
      setIsLoading(false)
      setDescription("")
      setFiles([])
    }, 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50">
      {/* Mobile-Optimized Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white shadow-lg">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm w-fit">CMGI</div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Helpdesk Request</h1>
              <p className="text-red-100 text-sm mt-1">Submit your support request</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Load User Information - Mobile Optimized */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <Button
                onClick={loadUserInformation}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 h-auto text-base rounded-xl shadow-md"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                    Loading User Information...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-3" />
                    Load User Information
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* User Information - Single Column for Mobile */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black mb-1">Ticket Number</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{userData.ticketNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black mb-1">Phone Number</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{userData.phoneNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                    <User className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black mb-1">Name</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{userData.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black mb-1">Email</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{userData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Request Details - Mobile Optimized */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="bg-red-100 p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-black">Reason for Request</p>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base ml-12 sm:ml-0 text-black">
                Please provide a detailed description of your issue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <Textarea
                placeholder="Please describe your issue or request in detail. Include any relevant information that might help us assist you better..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[140px] sm:min-h-[120px] resize-none border-gray-200 focus:border-red-500 focus:ring-red-500 text-base bg-white text-black placeholder:text-gray-600"
              />
            </CardContent>
          </Card>

          {/* Attachments - Mobile Optimized */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="bg-red-100 p-3 rounded-xl">
                  <Paperclip className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-black">Attachments</p>
              </CardTitle>
              <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 ml-12 sm:ml-0">
                <p className="text-sm sm:text-base text-black">Optional • Max 5 files • 10MB each</p>
                <Badge variant="secondary" className="text-xs w-fit bg-red-100 text-red-800">
                  {files.length}/5 files
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
              {/* Mobile-Friendly File Upload Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-red-50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4" />
                <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                  {isDragActive ? "Drop files here" : "Tap to upload files"}
                </p>
                <p className="text-sm text-black">or drag and drop your files here</p>
              </div>

              {/* Mobile-Optimized File List */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <Separator />
                  <h4 className="font-semibold text-gray-900 text-base">Uploaded Files</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <FileText className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate text-sm">{file.name}</p>
                          <p className="text-xs text-black">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 h-auto flex-shrink-0 ml-2"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mobile-Optimized Submit Button */}
          <div className="sticky bottom-4 sm:static">
            <Card className="border-0 shadow-xl sm:shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !description.trim()}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 h-auto text-lg rounded-xl shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 mr-3" />
                      Submit Request
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}