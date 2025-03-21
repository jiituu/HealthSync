import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Button,
  message,
  InputNumber,
  Col,
  Divider,
} from "antd";
import { qualifications, specializations } from "@/data/DoctorData";
import { DoctorSignupPayload } from "@/types/doctor";
import { useRegisterDoctorMutation } from "@/redux/api/doctorApi";
import CloudinaryUploader from "./CloudinaryUploader";


const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};


const DoctorSignupForm = ({ setParentTab }: { setParentTab: any }) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0); 
  const [formValues, setFormValues] = useState<DoctorSignupPayload>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    gender: "male",
    age: 0,
    password: "",
    role: "doctor",
    specializations: [],
    qualifications: [],
    licenses: []
  });

  const [registerDoctor, { isLoading }] = useRegisterDoctorMutation();

  const goToStep = (step: number) => setCurrent(step);

  const onFinish = async (value: DoctorSignupPayload) => {
    console.log("Form values", formValues);
    try {
      await registerDoctor(formValues).unwrap();
      message.success("Registration successful!");
      setParentTab(0); 
    } catch (error: any) {
      message.error(error?.data?.error || "Registration failed, please try again");
    }
  };

  const handleStepChange = (changedValues: any) => {
    setFormValues((prevValues) => ({ ...prevValues, ...changedValues }));
  };

  const handleLicenseUpload = (url: string) => {
    setFormValues(prev => ({
      ...prev,
      licenses: [...prev.licenses, { url, type: "pdf", isVerified: false }]
    }));
  };

  const formList = [
    // Step 1: Personal Details
    <Row key="step-1" justify="center">
      <Col span={24}>
        <Divider orientation="left">Personal Details</Divider>
      </Col>
      {["First Name", "Last Name", "Email", "Gender", "Age"].map((label) => (
        <Col span={24} key={label}>
          <Form.Item
            {...formItemLayout}
            label={label}
            name={label.replace(/\s+/g, "").toLowerCase()}
            rules={[{ required: true, message: `${label} is required` }]}
          >
            {label === "Gender" ? (
              <Select
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            ) : label === "Age" ? (
              <InputNumber min={1} max={120} className="w-full" />
            ) : (
              <Input />
            )}
          </Form.Item>
        </Col>
      ))}
      <Col span={24}>
        <Form.Item
          {...formItemLayout}
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "Phone Number is required" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          onClick={() => goToStep(current + 1)}
          className="primary-button primary-button-white-text" 
        >
          Continue
        </Button>
      </Col>
    </Row>,

    // Step 2: Professional Details
    <Row key="step-2" gutter={[16, 8]} justify="center">
      <Col span={24}>
        <Divider orientation="left">Professional Details</Divider>
      </Col>
      {["Specializations", "Qualifications"].map((label) => (
        <Col span={24} key={label}>
          <Form.Item
            {...formItemLayout}
            label={label}
            name={label.toLowerCase()}
            rules={[{ required: true, message: `${label} is required` }]}
          >
            <Select
              mode="multiple"
              showSearch
              options={(label === "Specializations" ? specializations : qualifications).map(value => ({
                label: value,
                value
              }))}
            />
          </Form.Item>
        </Col>
      ))}
      <Col span={24}>
        <Form.Item
          {...formItemLayout}
          label="Licenses"
          name="licenses"
          rules={[{ required: true, message: "Please upload your licenses" }]}
        >
          <CloudinaryUploader onUploadSuccess={handleLicenseUpload} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Button
          onClick={() => goToStep(current - 1)}
          className="primary-button primary-button-white-text"
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => goToStep(current + 1)}
          className="primary-button primary-button-white-text" 
          style={{ marginLeft: 8 }}
        >
          Continue
        </Button>
      </Col>
    </Row>,

    // Step 3: Password
    <Row key="step-3" gutter={[16, 8]} justify="center">
      <Col span={24}>
        <Divider orientation="left">Password</Divider>
      </Col>
      <Col span={24}>
        <Form.Item
          {...formItemLayout}
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Button
          onClick={() => goToStep(current - 1)}
          className="primary-button primary-button-white-text"
        >
          Back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="primary-button primary-button-white-text" 
          style={{ marginLeft: 8 }}
        >
          Register
        </Button>
      </Col>
    </Row>
  ];

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={handleStepChange}
      onFinishFailed={() => message.error("Please fill all required fields")}
      layout="vertical"
    >
      {formList[current]}
    </Form>
  );
};

export default DoctorSignupForm;