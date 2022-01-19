import { Form, Input, Button, message } from "antd";
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/fireBaseCredential";
import DashBoard from "./DashBoard";
import { useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);



const Login = (props) => {
  const { setActiveComponent } = props;

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(<Loading3QuartersOutlined />);
    signInWithEmailAndPassword(auth, values.Email, values.Password)
      .then((credentials) => {
        setActiveComponent(<DashBoard />);
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mot de passe"
        name="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Connexion {loading}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

