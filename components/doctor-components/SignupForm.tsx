import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Button,
  message,
  InputNumber,
  Upload,
  Col,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

interface DoctorSignupFormValues {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  gender: string;
  age: number;
  specializations: string;
  qualifications: string;
  licenses: File[];
  password: string;
}

const DoctorSignupForm = () => {
  const [current, setCurrent] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [form] = Form.useForm();

  const goToStep = (step: number) => setCurrent(step);

  const onFinish = async (values: DoctorSignupFormValues) => {
    try {
      setIsRegistering(true);
      console.log("Form Submitted:", values);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "licenses" && values[key].length > 0) {
          formData.append("licenses", values[key][0]);
        } else {
          formData.append(key, values[key] as string | number);
        }
      });

      const response = await fetch(
        "http://localhost:5000/api/register/doctor",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register doctor");
      }

      message.success("Registration successful!");
      // Handle successful registration (e.g., redirect, clear form, etc.)
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const beforeUpload = (file: any) => {
    const isLt15M = file.size / 1024 / 1024 <= 15;
    if (!isLt15M) {
      message.error(`${file.name} must be smaller than 15MB!`);
      return false;
    }
    return false;
  };

  const formList = [
    // Step 1: Personal Details
    <Row key="step-1" gutter={[16, 16]} justify="center">
      {[
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Gender",
        "Age",
      ].map((label, index) => (
        <Col span={12} key={label}>
          <Form.Item
            {...formItemLayout}
            label={label}
            name={label.replace(/\s+/g, "").toLowerCase()}
            rules={[{ required: true, message: `${label} is required` }]}
          >
            {label === "Gender" ? (
              <Select
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                className="w-full"
              />
            ) : label === "Age" ? (
              <InputNumber min={1} max={120} className="w-full" />
            ) : (
              <Input className="w-full" />
            )}
          </Form.Item>
        </Col>
      ))}

      <Col span={24} className="flex justify-center" key="continue-button">
        <Button
          className="primary-button primary-button-white-text"
          onClick={() => goToStep(current + 1)}
        >
          Continue
        </Button>
      </Col>
    </Row>,

    // Step 2: Professional Details
    <Row key="step-2" gutter={[16, 16]} justify="center">
      {["Specializations", "Qualifications", "Licenses", "Password"].map(
        (label) => (
          <Col span={24} key={label}>
            <Form.Item
              {...formItemLayout}
              label={label}
              name={label.replace(/\s+/g, "").toLowerCase()}
              rules={[{ required: true, message: `${label} is required` }]}
            >
              {label === "Licenses" ? (
                <Dragger
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  listType="picture-card"
                  className="w-full"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ fontSize: "25px" }} />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Dragger>
              ) : label === "Password" ? (
                <Input.Password
                  autoComplete="new-password"
                  className="w-full"
                />
              ) : (
                <Input
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="w-full"
                />
              )}
            </Form.Item>
          </Col>
        )
      )}

      <Col span={24} className="flex justify-center gap-5" key="buttons">
        <Button
          className="primary-button primary-button-white-text"
          onClick={() => goToStep(current - 1)}
        >
          Back
        </Button>
        <Button
          className="primary-button primary-button-white-text"
          htmlType="submit"
          loading={isRegistering}
        >
          Register
        </Button>
      </Col>
    </Row>,
  ];

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => message.error("Please submit the form correctly")}
      className="w-full flex flex-col gap-4 mt-8"
    >
      {formList[current]}
    </Form>
  );
};

export default DoctorSignupForm;
