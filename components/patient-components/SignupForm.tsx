import React, { useState } from "react";
import { Button, Divider, Form, Input, message, Row, Select } from "antd";

interface PatientSignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  age: number;
  nationality: string;
  password: string;
  height: number;
  weight: number;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
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

  const onFinish = async (values: PatientSignupFormValues) => {
    try {
      setIsRegistering(true);
      const res = await fetch(`http://localhost:5000/api/register/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Registration successful.");
      } else {
        message.error(data.error);
      }
    } catch (error) {
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => {
        message.error("Please submit the form correctly");
      }}
      className="w-[100%] flex flex-col gap-4 mt-20"
    >
      <Divider orientation="left">Personal Details</Divider>

      <Form.Item
        layout="vertical"
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "First name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        layout="vertical"
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Last name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        layout="vertical"
        label="Email"
        name="email"
        rules={[
          { required: true, type: "email", message: "Valid email is required" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        layout="vertical"
        label="Phone"
        name="phone"
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

      <Form.Item
        layout="vertical"
        label="Password"
        name="password"
        className="w-[100%]"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>

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
        name="bloodType"
        rules={[{ required: true, message: "Blood type is required" }]}
      >
        <Select
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
            (value) => ({ label: value, value })
          )}
        />
      </Form.Item>

      <Row className="w-[100%] justify-center mt-8">
        <Button
          className="primary-button primary-button-white-text"
          htmlType="submit"
          loading={isRegistering}
        >
          Signup
        </Button>
      </Row>
    </Form>
  );
};

export default PatientSignupForm;
