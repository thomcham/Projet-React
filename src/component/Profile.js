import { createUserWithEmailAndPassword , signOut} from "@firebase/auth";
import { Button, Form, Input, message } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/fireBaseCredential.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Profile = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore();
  const [user, setUser] = useState({});
    onAuthStateChanged(auth, (curentUser) =>{
    setUser(curentUser)
  });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();

  const onFinish = (values) => {
    console.log(values);
    setLoading(<Loading3QuartersOutlined />);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        addDoc(collection(db, "Users"), state)
          .then((doc) => console.log(doc))
          .catch((err) => console.log(err.message));

        message.success("Vous êtes inscrit");
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

  const items = [
    {
      name: "email",
      label: "Email",
      required: true,
      message: "Please input your email!",
      type: "email",
      action: (e) => {
        setState({ ...state, email: e.target.value });
      },
    },
    {
      name: "password",
      label: "Mot de passe",
      required: true,
      message: "Please input your password!",
      type: "password",
    },
    {
      name: "firstName",
      label: "Prenom",
      required: true,
      message: "Please input your first name!",
      type: "text",
      action: (e) => {
        setState({ ...state, firstName: e.target.value });
      },
    },
    {
      name: "lastName",
      label: "Nom",
      required: true,
      message: "Please input your last name!",
      type: "text",
      action: (e) => {
        setState({ ...state, lastName: e.target.value });
      },
    },
    {
      name: "age",
      label: "Age",
      required: false,
      message: "Please input your age!",
      type: "number",
      action: (e) => {
        setState({ ...state, age: e.target.value });
      },
    },
  ];

  const createInputLabels = (label) => {
    return (
      <Form.Item
        key={label.name}
        label={label.label}
        name={label.name}
        rules={[
          {
            required: label.required,
            message: label.message,
          },
        ]}
      >
        <Input type={label.type} onChange={label.action} />
      </Form.Item>
    );
  };

  return (
    <Form
      name="inscription"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {items.map((label) => createInputLabels(label))}

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        {user ? <Button type="primary" htmlType="submit">
          Déconnexion {loading}
        </Button> : <Button type="primary" htmlType="submit">
          Inscription {loading}
        </Button>}
        

        
      </Form.Item>
    </Form>
  );
};

export default Profile;
