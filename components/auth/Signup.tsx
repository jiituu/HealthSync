import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Row } from "antd";
import { Modal, Input, Button, message } from "antd";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/api/commonApi";

import PatientSignupForm from "../patient-components/SignupForm";
import DoctorSignupForm from "../doctor-components/SignupForm";

const Signup = ({ setParentTab }: { setParentTab: any }) => {
  const [tab, setTab] = useState<0 | 1>(0);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"doctor" | "patient">("patient");
  const [timeLeft, setTimeLeft] = useState(300); 
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (isOtpModalVisible) {
      setTimeLeft(300); 
    }
  }, [isOtpModalVisible]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleOtpSubmit = async () => {
    try {
      await verifyOtp({ email, otp, role }).unwrap();
      message.success("Verification successful!");
      setIsOtpModalVisible(false);
      setParentTab(0); 
    } catch (error: any) {
      message.error(error?.data?.error || "Invalid OTP, please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email, role }).unwrap();
      message.success("OTP resent successfully!");
      setTimeLeft(300); 
    } catch (error: any) {
      message.error(error?.data?.error || "Failed to resend OTP.");
    }
  };

  const handleSignupSuccess = (userEmail: string, userRole: "doctor" | "patient") => {
    setEmail(userEmail);
    setRole(userRole);
    setIsOtpModalVisible(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Row className="w-[100%] justify-center">
        <Row className="w-full md:w-[80%] h-[35px] rounded-3xl mt-6 bg-[#D9D9D9] relative overflow-hidden">
          {/* Sliding Indicator */}
          <div
            className={`absolute h-full w-[50%] bg-accent rounded-3xl transition-transform duration-300`}
            style={{
              transform: tab === 0 ? "translateX(0)" : "translateX(100%)",
            }}
          />
          <Row
            className={`w-[50%] justify-center items-center cursor-pointer z-10 transition-colors duration-300 
                            ${
                              tab == 0
                                ? `bg-accent rounded-3xl text-neutral-100`
                                : ""
                            }`}
            onClick={() => setTab(0)}
          >
            <Typography>I am a patient</Typography>
          </Row>
          <Row
            className={`w-[50%] justify-center items-center cursor-pointer z-10 transition-colors duration-300 
                            ${
                              tab == 1
                                ? `bg-accent rounded-3xl text-neutral-100`
                                : ""
                            }`}
            onClick={() => setTab(1)}
          >
            <Typography>I am a doctor</Typography>
          </Row>
        </Row>
      </Row>

      {tab == 0 ? (
        <PatientSignupForm setParentTab={setParentTab} onSignupSuccess={handleSignupSuccess} />
      ) : (
        <DoctorSignupForm setParentTab={setParentTab} onSignupSuccess={handleSignupSuccess} />
      )}

      <Modal
        title="Verify your account"
        visible={isOtpModalVisible}
        onCancel={() => setIsOtpModalVisible(false)}
        footer={null}
        centered
        maskClosable={false} 
        closable={true} 
      >
        <p>Please enter the 6-digit Verification Code sent to your email.</p>
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        <div className="flex justify-between mt-4">
          <Button onClick={handleResendOtp} loading={isResending} disabled={timeLeft > 0}>
            Resend OTP {timeLeft > 0 && `(${formatTime(timeLeft)})`}
          </Button>
          <Button className="bg-secondaryColor text-white" onClick={handleOtpSubmit} loading={isVerifying}>
            Verify
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Signup;
