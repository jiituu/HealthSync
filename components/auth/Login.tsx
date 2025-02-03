import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Button, Divider, Form, Input, message, Row } from "antd";
import { GoogleCircleFilled } from "@ant-design/icons";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useRouter } from "next/navigation";

type LoginProb = {
  setTab: any;
};

interface FormValues {
  phone: string;
  password: string;
}

const Login = ({ setTab }: LoginProb) => {
  const [form] = Form.useForm();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const onFinish = async (values: FormValues) => {
    const { phone, password } = values;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone);
    const isPhone = /^\+?[1-9]\d{1,14}$/.test(phone);

    if (!isEmail && !isPhone) {
      message.error("Please enter a valid email or phone number");
      return;
    }

    try {
      setIsLoggingIn(true);
      const res = await fetch(`https://healthsync-backend-bfrv.onrender.com/api/login/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          [isEmail ? "email" : "phone"]: phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Login successful.");
        router.push('patient/dashboard');
      } else {
        message.error(data.error);
      }
    } catch (error) {
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={() => {
          message.error("Please submit the form correctly");
        }}
        className="w-[100%] flex flex-col gap-7 mt-20 p-4 md:p-0"
      >
        <Form.Item
          layout="vertical"
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Phone number or Email is required" },
          ]}
        >
          <Input />
        </Form.Item>
        <Row className="flex flex-col w-[100%] gap-4 items-end">
          <Form.Item
            layout="vertical"
            label="Password"
            name="password"
            className="w-[100%]"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
          <Typography className="text-primary-foreground text-xs cursor-pointer">
            Forgot password?
          </Typography>
        </Row>
        <Row className="flex-col items-center gap-3 w-[100%]">
          <Button
            htmlType="submit"
            loading={isLoggingIn}
            className="primary-button primary-button-white-text"
          >
            Login
          </Button>
          <Typography className="text-primary-foreground text-sm">{`Don't have an account?`}</Typography>
          <Typography
            className="text-primary font-semibold cursor-pointer"
            onClick={() => setTab(1)}
          >
            SIGN UP
          </Typography>
        </Row>
        <Box className="w-[100%]">
          <Divider className="!mb-2">
            <span className="text-[#afafaf]">Continue with</span>
          </Divider>
          <Row className="w-[100%] justify-center items-center gap-2">
            <GoogleCircleFilled className="text-3xl text-[#cccccc] cursor-pointer" />
            <FacebookRoundedIcon className="text-[35px] text-[#cccccc] cursor-pointer" />
          </Row>
        </Box>
      </Form>
    </>
  );
};

export default Login;
