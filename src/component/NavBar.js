import { Menu, Layout } from "antd";
import Login from "./Login";
import { getAuth , onAuthStateChanged} from "firebase/auth";
import Profile from "./Profile";
import ListRecipes from "./ListRecipes";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";


const NavBar = (props) => {
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const [user, setUser] = useState({});
onAuthStateChanged(auth, (curentUser) =>{
  setUser(curentUser)
});

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
          {labels.map((item) => ((item.key==="listRecipes" && user) || item!=="listRecipes") && showItem(item))}
        </Menu>
    </Layout.Header>
  );
};

export default NavBar;
