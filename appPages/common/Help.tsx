import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Instagram, Twitter, Youtube, MessageCircle, HelpCircle } from "lucide-react"
import { AiOutlineTikTok } from "react-icons/ai";

const TiktokIcon = () => (
  <AiOutlineTikTok className="h-5 w-5" />
)

const faqsDoctor = [
  {
    question: "What information do I need to provide to register as a doctor?",
    answer:
      "You need to provide your name, email, password, specialization, and medical license number. Additional details such as years of experience and clinic address are optional.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I accept a consultation request?",
    answer:
      "You can view and accept consultation requests from patients in the Requests section of your dashboard. Once accepted, a visit instance will be created.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I update my profile information?",
    answer:
      "You can update your profile details by navigating to the Profile Page on your dashboard. However, critical details like email cannot be changed.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I view my past consultations?",
    answer:
      "You can check your past visits in the Previous Visits Section on your dashboard. Detailed records of each consultation are stored in the Log Page.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "Can I reject a consultation request?",
    answer:
      "Yes, you can reject consultation requests from patients. The request will be removed from your Requests section.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I know if a patient has accepted my consultation offer?",
    answer:
      "You will receive a notification once the patient accepts your consultation offer. The visit will then appear in your Active Visits section.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
]

const faqsPatient = [
  {
    question: "What information do I need to provide to register as a patient?",
    answer:
      "You need to provide your name, email, password, age, and gender. You may also add optional details such as medical history (chronic conditions, allergies, previous major health issues).",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I consult with a doctor?",
    answer:
      "Search for a doctor based on specialization and send a request. If the doctor accepts, a visit instance will be created. The doctor determines the duration of the visit.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I update my profile information?",
    answer:
      "You can update your profile details by navigating to the Profile Page on your dashboard. However, critical details like email cannot be changed.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I view my past consultations?",
    answer:
      "You can check your past visits in the Previous Visits Section on your dashboard. You can also find detailed records in the Log Page, where your diagnosis and treatments are stored.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "Can I request a specific doctor?",
    answer:
      "Yes, you can search for doctors based on their specialization and send a consultation request. The doctor can either accept or reject your request.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
  {
    question: "How do I know if my consultation request was accepted?",
    answer:
      "You will receive a notification once the doctor accepts your request. The visit will then appear in your Active Visits section.",
    icon: <HelpCircle className="text-accent" size={24} />,
  },
]

const contactInfo = [
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    value: "+251962212818, +251942512868",
    action: "Call us",
    href: "tel:+18001234567",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    value: "support@healthSync.com",
    action: "Email us",
    href: "mailto:support@healthSync.com",
  }
]

const socialMedia = [
  {
    icon: <Instagram className="h-5 w-5" />,
    title: "Instagram",
    value: "@healthSync",
    href: "",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    title: "Twitter",
    value: "@healthSync",
    href: "",
  },
  {
    icon: <Youtube className="h-5 w-5" />,
    title: "YouTube",
    value: "HealthSync Channel",
    href: "",
  },
  {
    icon: <TiktokIcon />,
    title: "TikTok",
    value: "@healthSync",
    href: "",
  },
]

const Help = ({ isDoctor }: { isDoctor?: boolean }) => {
  // Use the appropriate FAQs based on user type
  const faqs = isDoctor ? faqsDoctor : faqsPatient
  const userType = isDoctor ? "Doctor" : "Patient"

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-primary">Help Center</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to your questions and get in touch with our support team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4 border-b border-accent/20">
              <CardTitle className="text-2xl font-bold text-center text-primary">
                Frequently Asked Questions for {userType}s
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 mt-1 bg-accent/10 p-2 rounded-full text-accent">{faq.icon}</div>
                        <h3 className="font-bold text-lg text-primary">{faq.question}</h3>
                      </div>
                      <p className="ml-12">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-primary text-primary-foreground h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Get in Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 p-3 bg-primary-foreground/10 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">{item.icon}</div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm opacity-90">{item.value}</p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        <a href={item.href}>{item.action}</a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialMedia.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-primary-foreground/10 rounded-lg hover:bg-accent/20 transition-colors"
                    >
                      <div className="shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm opacity-90">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm opacity-80">
                  Our support team is available 24/7 to assist you with any questions or concerns.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Help
