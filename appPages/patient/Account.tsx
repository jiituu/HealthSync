"use client"
import React, { useEffect, useState } from "react"
import { useGetCurrentPatientQuery, useUpdatePatientMutation } from "@/redux/api/patientApi"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Calendar, X, Plus, Save, AlertCircle, Activity, Shield, Weight, Ruler, Loader2, Key, Eye, EyeOff } from "lucide-react"
import { allergyOptions, conditionOptions, allergyOptionsEnglish, conditionOptionsEnglish } from "@/data/PatientData"
// import Logout from "@/components/auth/Logout"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Email from "next-auth/providers/email"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { message } from "antd"


const PatientProfile = () => {
  const {
    data: patientData,
    isLoading,
    isError,
    refetch
  } = useGetCurrentPatientQuery()

  const phoneSchema = z.string()
    .min(12, { message: "Phone number must be 12 characters" })
    .max(12, { message: "Phone number must be 12 characters" })
    .regex(/^251\d{9}$/, {
      message: "Phone number must start with 251"
    });


  const [phoneError, setPhoneError] = useState("")


  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation()
  const { toast } = useToast()
  const [messageApi, contextHolder] = message.useMessage();


  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    // email: "",
    gender: "",
    age: "",
    firstName: "",
    lastName: "",
    allergies: [] as string[],
    knownConditions: [] as string[],
    weight: "",
    height: "",
    bloodType: "",
  })
  // Password change state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  useEffect(() => {
    console.log("Patient data received from API:", patientData) // Add this
    if (patientData) {
      setProfile({
        fullName: `${patientData.firstname} ${patientData.lastname}`,
        // email: patientData.email,
        phoneNumber: patientData.phoneNumber || "",
        // gender: patientData.gender ? patientData.gender.charAt(0).toUpperCase() + patientData.gender.slice(1).toLowerCase() : "",
        gender: patientData.gender ? patientData.gender.charAt(0).toUpperCase() + patientData.gender.slice(1).toLowerCase() : "",
        age: patientData.age?.toString() || "",
        firstName: patientData.firstname || "",
        lastName: patientData.lastname || "",
        allergies: patientData.allergies || [],
        knownConditions: patientData.medicalConditions || [],
        weight: patientData.weight?.toString() || "",
        height: patientData.height?.toString() || "",
        bloodType: patientData.blood || "",
      })
    }
  }, [patientData])

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }
  const handlePhoneChange = (field: string, value: string) => {
    if (field === "phoneNumber") {
      const cleanedValue = value.replace(/\D/g, "")
      const validation = phoneSchema.safeParse(cleanedValue)
      if (!validation.success) {
        setPhoneError(validation.error.errors[0].message)
      } else {
        setPhoneError("")
      }
      setProfile(prev => ({ ...prev, [field]: cleanedValue }))
    } else {
      setProfile(prev => ({ ...prev, [field]: value }))
    }
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }
  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSelectAllergy = (value: string) => {
    const englishWord = allergyOptionsEnglish[allergyOptions.indexOf(value)]
    if (englishWord && !profile.allergies.includes(englishWord)) {
      setProfile(prev => ({
        ...prev,
        allergies: [...prev.allergies, englishWord],
      }))
    }
  }

  const handleSelectCondition = (value: string) => {
    const englishWord = conditionOptionsEnglish[conditionOptions.indexOf(value)]
    if (englishWord && !profile.knownConditions.includes(englishWord)) {
      setProfile(prev => ({
        ...prev,
        knownConditions: [...prev.knownConditions, englishWord],
      }))
    }
  }

  const removeAllergy = (allergyToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter(allergy => allergy !== allergyToRemove),
    }))
  }

  const removeCondition = (conditionToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      knownConditions: prev.knownConditions.filter(condition => condition !== conditionToRemove),
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const phoneValidation = phoneSchema.safeParse(profile.phoneNumber);
    if (!phoneValidation.success) {
      setPhoneError(phoneValidation.error.errors[0].message);
      return;
    }

    if (!["Male", "Female"].includes(profile.gender)) {
      console.log("Invalid gender:", profile.gender);
      alert("Please select a valid gender");
      return;
    }

    try {
      const updateData = {
        firstname: profile.firstName,
        lastname: profile.lastName,
        age: Number(profile.age),
        gender: profile.gender.toLowerCase() as "male" | "female",
        height: Number(profile.height),
        weight: Number(profile.weight),
        blood: profile.bloodType,
        phoneNumber: profile.phoneNumber,
        medicalConditions: profile.knownConditions,
        allergies: profile.allergies,
      };

      await updatePatient(updateData).unwrap();
      messageApi.success("Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to update profile:", error);
      }
      messageApi.error("Failed to update profile. Please try again.");
    }
  }
  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords don't match",
      })
      return
    }

    try {
      // api call to change password
      // await changePassword({
      //   oldPassword: passwordData.oldPassword,
      //   newPassword: passwordData.newPassword
      // }).unwrap()

      toast({
        title: "Success",
        description: "Password changed successfully!",
      })
      setIsPasswordDialogOpen(false)
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error) {
      console.error("Failed to change password:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change password. Please try again.",
      })
    }
  }

  const genders = ["Male", "Female"]
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )

  if (isError) return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg">
      <p>Failed to load profile data</p>
      <button
        onClick={() => refetch()}
        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
      >
        Retry
      </button>
    </div>
  )


  return (
    <div className="container mx-auto p-4 md:p-6">
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Profile Header Card */}
          <Card className="overflow-hidden shadow-md border-0 rounded-xl bg-gradient-to-r from-teal-50 via-teal-300 to-teal-600">
            <div className="bg-gradient-to-r from-teal-50 via-teal-300 to-teal-600 h-32 relative rounded-xl"></div>
            <CardHeader className="relative pb-0 pt-0 -mt-16 rounded-xl">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 pb-6 rounded-xl">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
                  <AvatarFallback className="bg-teal-100 text-teal-800 text-xl">
                    {patientData?.firstname?.charAt(0)}{patientData?.lastname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-16 md:pt-0">
                  <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                  <p className="text-gray-500">{patientData?.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      {profile.gender} • {profile.age} years
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {profile.height} cm • {profile.weight} kg
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Blood Type: {profile.bloodType}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:self-start pt-4 md:pt-0">
                  {/* <Logout /> */}
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Key size={16} />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="oldPassword" className="text-sm font-medium">
                            Old Password
                          </label>
                          <div className="relative">
                            <Input
                              id="oldPassword"
                              type={showPassword.oldPassword ? "text" : "password"}
                              placeholder="Enter old password"
                              value={passwordData.oldPassword}
                              onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => togglePasswordVisibility("oldPassword")}
                            >
                              {showPassword.oldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="newPassword" className="text-sm font-medium">
                            New Password
                          </label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showPassword.newPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              value={passwordData.newPassword}
                              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => togglePasswordVisibility("newPassword")}
                            >
                              {showPassword.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showPassword.confirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => togglePasswordVisibility("confirmPassword")}
                            >
                              {showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsPasswordDialogOpen(false)
                              setPasswordData({
                                oldPassword: "",
                                newPassword: "",
                                confirmPassword: ""
                              })
                              setShowPassword({
                                oldPassword: false,
                                newPassword: false,
                                confirmPassword: false
                              })
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            Change Password
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="personal" className="w-full">
            <div className="w-full flex justify-center items-center">
              <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="medical">Medical Information</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Personal Details</h3>
                  <p className="text-sm text-gray-500">Update your personal information</p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Your First Name"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-gray-200 focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Your Last Name"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-gray-200 focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      placeholder="251XXXXXXXXX"
                      value={profile.phoneNumber}
                      onChange={(e) => handlePhoneChange("phoneNumber", e.target.value)}
                      className={`border-gray-200 focus:border-teal-500 ${phoneError ? "border-red-500" : ""}`} maxLength={12}
                    /> {phoneError && (
                      <p className="text-red-500 text-sm">{phoneError}</p>)}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="age" className="text-sm font-medium flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      Age
                    </label>
                    <Input
                      id="age"
                      placeholder="Your Age"
                      value={profile.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="border-gray-200 focus:border-teal-500"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="height" className="text-sm font-medium flex items-center gap-2">
                      <Ruler size={16} className="text-gray-400" />
                      Height (cm)
                    </label>
                    <Input
                      id="height"
                      placeholder="Your Height"
                      value={profile.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="border-gray-200 focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="weight" className="text-sm font-medium flex items-center gap-2">
                      <Weight size={16} className="text-gray-400" />
                      Weight (kg)
                    </label>
                    <Input
                      id="weight"
                      placeholder="Your Weight"
                      value={profile.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className="border-gray-200 focus:border-teal-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="mt-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Medical Information</h3>
                  <p className="text-sm text-gray-500">Manage your medical details</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} className="text-red-500" />
                      <h4 className="font-medium">Allergies</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={handleSelectAllergy} value="">
                        <SelectTrigger className="border-gray-200 focus:border-teal-500 flex-1">
                          <SelectValue placeholder="Add an allergy" />
                        </SelectTrigger>
                        <SelectContent>
                          {allergyOptions.map((allergy) => (
                            <SelectItem key={allergy} value={allergy}>
                              {allergy}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-gray-200 text-gray-500"
                      >
                        <Plus size={16} />
                        <span className="sr-only">Add Allergy</span>
                      </Button>
                    </div>

                    {profile.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5"
                          >
                            {allergy}
                            <button
                              type="button"
                              onClick={() => removeAllergy(allergy)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X size={14} />
                              <span className="sr-only">Remove {allergy}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No allergies added</p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Activity size={18} className="text-teal-600" />
                      <h4 className="font-medium">Medical Conditions</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={handleSelectCondition} value="">
                        <SelectTrigger className="border-gray-200 focus:border-teal-500 flex-1">
                          <SelectValue placeholder="Add a medical condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditionOptions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-gray-200 text-gray-500"
                      >
                        <Plus size={16} />
                        <span className="sr-only">Add Condition</span>
                      </Button>
                    </div>

                    {profile.knownConditions.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.knownConditions.map((condition, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5"
                          >
                            {condition}
                            <button
                              type="button"
                              onClick={() => removeCondition(condition)}
                              className="ml-2 text-teal-500 hover:text-teal-700"
                            >
                              <X size={14} />
                              <span className="sr-only">Remove {condition}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No medical conditions added</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="text-gray-400 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Medical Information Privacy</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Your medical information is protected and will only be shared with healthcare providers involved
                        in your care.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" className="border-gray-200">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal-300 hover:bg-teal-700 text-white"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PatientProfile