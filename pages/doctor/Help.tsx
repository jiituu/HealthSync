import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FaEnvelope, FaFileAlt, FaBan, FaScroll, FaDollarSign, FaBell } from "react-icons/fa";

const faqs = [
  {
    question: "What information do I need to provide to register as a patient?",
    answer:
      "You need to provide your name, email, password, age, and gender. You may also add optional details such as medical history (chronic conditions, allergies, previous major health issues).",
      icon: <FaScroll className="text-secondaryColor" size={25}/>,
    },
  {
    question: "How do I consult with a doctor?",
    answer:
      "Search for a doctor based on specialization and send a request. If the doctor accepts, a visit instance will be created. The doctor determines the duration of the visit.",
      icon: <FaScroll className="text-secondaryColor" size={25}/>,
    },
  {
    question: "How do I update my profile information?",
    answer:
      "You can update your profile details by navigating to the Profile Page on your dashboard. However, critical details like email cannot be changed.",
      icon: <FaScroll className="text-secondaryColor" size={25}/>,
    },
  {
    question: "How do I view my past consultations?",
    answer:
      "You can check your past visits in the Previous Visits Section on your dashboard. You can also find detailed records in the Log Page, where your diagnosis and treatments are stored.",
    icon: <FaScroll className="text-secondaryColor" size={25}/>,
  },
  {
    question: "Can I request a specific doctor?",
    answer:
      "Yes, you can search for doctors based on their specialization and send a consultation request. The doctor can either accept or reject your request.",
      icon: <FaScroll className="text-secondaryColor" size={25}/>,
    },
  {
    question: "How do I know if my consultation request was accepted?",
    answer:
      "You will receive a notification once the doctor accepts your request. The visit will then appear in your Active Visits section.",
      icon: <FaScroll className="text-secondaryColor" size={25}/>,
    },
];

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col items-center mb-10 px-4">
      <div className="w-full bg-white p-8 rounded-lg shadow-md space-y-4">
        <h3 className="text-md font-semibold text-center">FAQs</h3>
        <h2 className="text-3xl font-bold text-center mb-4">Ask us anything</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-lg shadow">
              <h3 className="flex flex-col items-start justify-center text-lg font-semibold mb-2">
                <span className="mr-2 text-xl">{faq.icon}</span>
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 w-full bg-primaryColor p-8 rounded-lg shadow-md space-y-4">
        <p className="font-bold text-xl text-center mb-6">
          Have any questions? We're here to assist you.
        </p>
        <form className="relative mb-6">
          <div className="w-full flex justify-center">
            <Textarea
              placeholder="Search here"
              className="mx-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={4}
            />
          </div>
          <div className="text-center mt-4">
            <Button type="submit" className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600">
              Send your question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
