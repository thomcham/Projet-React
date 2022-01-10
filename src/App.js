import "./App.css";
import NavBar from "./component/NavBar";
import "antd/dist/antd.css";
import { Layout , Row, Col} from "antd";
import { useState } from "react";


function App() {

  const [activeComponent, setActiveComponent] = useState("Active Component");

  return (
    <Layout>
      <NavBar setActiveComponent = {setActiveComponent} />
      <Layout.Content>
        <Col offset={2} span={20} style={{marginTop:40}}>
          <Row justify="center">{activeComponent}</Row>
        </Col>
      </Layout.Content>
    </Layout>
  );
}

export default App;
