import { useState } from "react";

import { Typography } from "@mui/material";
import { Row } from "antd";

import PatientSignupForm from "../patient-components/SignupForm";
import DoctorSignupForm from "../doctor-components/SignupForm";

const Signup = () => {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <>
      <Row className="w-[100%] justify-center">
        <Row className="w-[80%] h-[35px] rounded-3xl mt-6 bg-[#D9D9D9] relative overflow-hidden">
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

      {tab == 0 ? <PatientSignupForm /> : <DoctorSignupForm />}
    </>
  );
};

export default Signup;
