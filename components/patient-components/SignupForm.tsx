import React, { useState } from "react";
import { Button, Divider, Form, Input, message, Row, Select } from "antd";
import { useRouter } from "next/navigation";

interface PatientSignupFormValues {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  age: number;
  nationality: string;
  password: string;
  height: number;
  weight: number;
  blood: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
}

const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    label: `${start + i}`,
    value: start + i,
  }));
};

const PatientSignupForm = () => {
  const [form] = Form.useForm();
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Step state
  const [formValues, setFormValues] = useState<PatientSignupFormValues>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    gender: "male",
    age: 0,
    nationality: "",
    password: "",
    height: 0,
    weight: 0,
    blood: "A+",
  });

  const router = useRouter();

  const onFinish = async (values: PatientSignupFormValues) => {
    try {
      setIsRegistering(true);
      const res = await fetch(`https://healthsync-backend-bfrv.onrender.com/api/register/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues), // Submit the complete formValues state
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Registration successful.");
        form.resetFields();
        setFormValues({
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          gender: "male",
          age: 0,
          nationality: "",
          password: "",
          height: 0,
          weight: 0,
          blood: "A+",
        });
        router.push("/");
      } else {
        message.error(data.error);
      }
    } catch (error) {
      message.error("An error occurred during registration.");
    } finally {
      setIsRegistering(false);
    }
  };

  const goToStep = (step: number) => setCurrentStep(step); // Navigation between steps

  const handleStepChange = (changedValues: any) => {
    // Update formValues when fields change
    setFormValues((prevValues) => ({ ...prevValues, ...changedValues }));
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => {
        message.error("Please submit the form correctly");
      }}
      onValuesChange={handleStepChange} // Listen for form value changes
      className="w-[100%] flex flex-col gap-4 mt-20"
    >
      {currentStep === 0 && ( // Step 1: Personal Details
        <>
          <Divider orientation="left">Personal Details</Divider>

          <Form.Item
            layout="vertical"
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Valid email is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Phone"
            name="phoneNumber"
            rules={[
              { required: true, message: "Phone number is required" },
              {
                message: "Invalid phone number",
                validator: (_, value) => {
                  if (/^\+?[1-9][0-9]{0,14}$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Invalid phone number");
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row className="w-[100%] justify-between items-center gap-7">
            <Form.Item
              layout="vertical"
              label="Gender"
              name="gender"
              className="w-[45%]"
              rules={[{ required: true, message: "Gender is required" }]}
            >
              <Select
                options={["male", "female"].map((value) => ({
                  label: value[0].toUpperCase() + value.slice(1),
                  value,
                }))}
              />
            </Form.Item>

            <Form.Item
              layout="vertical"
              label="Age"
              name="age"
              className="w-[40%]"
              rules={[{ required: true, message: "Age is required" }]}
            >
              <Select className="w-[100%]" options={generateOptions(0, 120)} />
            </Form.Item>
          </Row>

          <Form.Item
            layout="vertical"
            label="Nationality"
            name="nationality"
            rules={[{ required: true, message: "Nationality is required" }]}
          >
            <Input />
          </Form.Item>

          <Row className="w-[100%] mt-2">
            <Button
              className="primary-button primary-button-white-text"
              onClick={() => goToStep(1)} // Go to step 2
            >
              Continue
            </Button>
          </Row>
        </>
      )}

      {currentStep === 1 && ( // Step 2: Health Details
        <>
          <Divider orientation="left">Health Details</Divider>

          <Form.Item
            layout="vertical"
            label="Height (cm)"
            name="height"
            rules={[{ required: true, message: "Height is required" }]}
          >
            <Select className="w-[100%]" options={generateOptions(100, 300)} />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Weight (kg)"
            name="weight"
            rules={[{ required: true, message: "Weight is required" }]}
          >
            <Select className="w-[100%]" options={generateOptions(1, 300)} />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Blood Type"
            name="blood"
            rules={[{ required: true, message: "Blood type is required" }]}
          >
            <Select
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (value) => ({ label: value, value })
              )}
            />
          </Form.Item>

          <Row className="w-[100%] mt-2">
            <Button
              className="primary-button primary-button-white-text"
              onClick={() => goToStep(0)} // Go back to step 1
            >
              Back
            </Button>
            <Button
              className="primary-button primary-button-white-text ml-2"
              onClick={() => goToStep(2)} // Go to step 3 (Password)
            >
              Continue
            </Button>
          </Row>
        </>
      )}

      {currentStep === 2 && ( // Step 3: Password
        <>
          <Divider orientation="left">Set Password</Divider>

          <Form.Item
            layout="vertical"
            label="Password"
            name="password"
            className="w-[100%]"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Row className="w-[100%] mt-8">
            <Button
              className="primary-button primary-button-white-text"
              onClick={() => goToStep(1)} // Go back to step 2
            >
              Back
            </Button>
            <Button
              className="primary-button primary-button-white-text ml-2"
              htmlType="submit"
              loading={isRegistering}
            >
              Register
            </Button>
          </Row>
        </>
      )}
    </Form>
  );
};

export default PatientSignupForm;
