import { Menu, Layout } from "antd";
import Login from "./Login";
import Profile from "./Profile";
import ListRecipes from "./ListRecipes";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const NavBar = (props) => {

const { setActiveComponent } = props;

  useEffect(() => {
    setActiveComponent(<ListRecipes setActiveComponent = {setActiveComponent}/>);
  }, [setActiveComponent])


  const showItem = (item) => {
    return (
      <Menu.Item key={item.key} onClick={item.action} icon={item.icon}>
         {item.title}
      </Menu.Item>
    );
  };


  const labels = [
    {
      key: "connexion",
      action: () => setActiveComponent(<Login setActiveComponent = {setActiveComponent}/>),
      title: "Connexion",
      icon: <UserOutlined />,
    },
    {
      key: "inscription",
      action: () => setActiveComponent(<Profile setActiveComponent = {setActiveComponent}/>),
      title: "Inscription",
      icon: <UserOutlined />,
    },
    {
      key: "listRecipes",
      action: () => setActiveComponent(<ListRecipes setActiveComponent = {setActiveComponent}/>),
      title: "Recettes",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout.Header>
      <Menu mode="horizontal">
          {labels.map((item) => showItem(item))}
        </Menu>
    </Layout.Header>
  );
};

export default NavBar;
