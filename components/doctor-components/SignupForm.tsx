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
  Divider,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { qualifications, specializations } from "@/data/DoctorData";
import { DoctorSignupPayload } from "@/types/doctor";
import { useRegisterDoctorMutation } from "@/redux/api/doctorApi";

const { Dragger } = Upload;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};


const DoctorSignupForm = (
  {setParentTab}
  :{setParentTab:any}
) => {

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

  const [registerDoctor, {isLoading, isError, error}] = useRegisterDoctorMutation();

  const goToStep = (step: number) => setCurrent(step);

  const onFinish = async (value: DoctorSignupPayload) => {
      console.log("Form Values", formValues);
        try {
          await registerDoctor(formValues).unwrap();
          message.success("Registration successful!");
          setParentTab(0); 
        } catch (error: any) {
          message.error(error?.data?.error || "Registration failed, please try again");
        }
  };

  const beforeUpload = (file: any) => {
    const isLt15M = file.size / 1024 / 1024 <= 15;
    if (!isLt15M) {
      message.error(`${file.name} must be smaller than 15MB!`);
      return false;
    }
    return true;
  };

  const handleStepChange = (changedValues: any) => {
    setFormValues((prevValues) => ({ ...prevValues, ...changedValues }));
  };

  const formList = [
    // Step 1: Personal Details
    <Row key="step-1" justify="center">
      <Col span={24}>
        <Divider orientation="left">Personal Details</Divider>
      </Col>
      {[
        "First Name",
        "Last Name",
        "Email",
        "Gender",
        "Age",
      ].map((label, index) => (
        <Col span={24} key={label}>
          <Form.Item
            {...formItemLayout}
            label={label}
            name={label.replace(/\s+/g, "").toLowerCase()}
            className="m-0"
            rules={[{ required: true, message: `${label} is required` }]}
          >
            {label === "Gender" ? (
              <Select
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
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

      <Col span={24}>
        <Form.Item
          {...formItemLayout}
          label='Phone Number'
          name= 'phoneNumber'
          className="m-0"
          rules={[{ required: true, message: `Phone Number is required` }]}
        >
          <Input className="w-full" />
        </Form.Item>
      </Col>

      <Col span={24} key="continue-button">
        <Button
          className="primary-button primary-button-white-text mt-2"
          onClick={() => goToStep(current + 1)}
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
            name={label.replace(/\s+/g, "").toLowerCase()}
            className="m-0"
            rules={[{ required: true, message: `${label} is required` }]}
          >
            <Select
              className="w-full"
              placeholder={`Enter your ${label.toLowerCase()}`}
              mode='multiple'
              showSearch
              options={(label=='Specializations'? specializations:qualifications).map((value)=>({label:value,value}))}
            />
          </Form.Item>
        </Col>
      ))}

      <Col span={24}>
        <Form.Item
          {...formItemLayout}
          label="Licenses"
          name="licenses"
          className="m-0"
          rules={[{ required: true, message: "Please upload your licenses" }]}
        >
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
        </Form.Item>
      </Col>

      <Col span={24} key="continue-button">
        <Button
          className="primary-button primary-button-white-text"
          onClick={() => goToStep(current - 1)}
        >
          Back
        </Button>
        <Button
          className="primary-button primary-button-white-text ml-2 mt-2"
          onClick={() => goToStep(current + 1)}
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
          className="m-0"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password autoComplete="new-password" className="w-full" />
        </Form.Item>
      </Col>

      <Col span={24} key="submit-button">
        <Button
          className="primary-button primary-button-white-text"
          onClick={() => goToStep(current - 1)}
        >
          Back
        </Button>
        <Button
          className="primary-button primary-button-white-text ml-2"
          htmlType="submit"
          loading={isLoading}
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
      onValuesChange={handleStepChange}
      onFinishFailed={() => message.error("Please submit the form correctly")}
      className="w-full flex flex-col gap-4 mt-8"
    >
      {formList[current]}
    </Form>
    
  );
};

export default DoctorSignupForm;
