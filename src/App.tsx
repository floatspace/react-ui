import React, { FC } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";
import MenuItem from "./components/Menu/menuItem";
import Upload from "./components/Upload/upload";
import Icon from "./components/Icon/icon";
import Alert from "./components/Alert/alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App: FC = () => {
  // axios.post('https://jsonplaceholder.typicode.com/posts', {data: 123}).then(res =>{
  //   console.log(res)
  // })
  return (
    <div style={{ padding: "20px" }}>
      <Alert type="info" message="Hello, This is Alert!" closeable onClose={(e) => {console.log('closed')}}/>
      <Alert type="danger" message="Hello, This is Alert!" closeable onClose={(e) => {console.log('closed')}}/>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        onError={(err) => {
          console.log(err);
        }}
        name="test_file"
        data={{ age: 12 }}
        headers={{ "x-by": "FLS" }}
        multiple={true}
        accept=".jpg"
        isDrag
      >
        {/* <Button btnType="primary">文件上传</Button> */}
      </Upload>
      <Icon icon="coffee" theme="primary" size="10x" />
      <Icon icon="coffee" theme="danger" size="9x" />
      <Icon icon="coffee" theme="warning" size="8x" />
      <Icon icon="coffee" theme="secondary" size="7x" />
      <Icon icon="coffee" theme="light" size="6x" />
      <div className="menu-wrapper" style={{ width: "500px" }}>
        <Menu
          defaultIndex="1"
          mode="horizental"
          defaultOpenIndex={["3"]}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>首页</MenuItem>
          <MenuItem>产品</MenuItem>
          <MenuItem disabled>其他</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem>下拉菜单001</MenuItem>
            <MenuItem>下拉菜单002</MenuItem>
          </SubMenu>
          <MenuItem>关于我们</MenuItem>
        </Menu>
      </div>
      <Button
        size="lg"
        onClick={() => {
          alert(111);
        }}
      >
        Button
      </Button>
      <Button autoFocus>Button</Button>
      <Button size="sm">Button</Button>
      <Button size="sm" disabled>
        Button
      </Button>
      <hr />
      <Button btnType="primary" size="lg">
        primary
      </Button>
      <Button btnType="primary" size="normal">
        primary
      </Button>
      <Button btnType="primary" size="sm">
        primary
      </Button>
      <Button btnType="primary" size="sm" disabled>
        primary
      </Button>
      <hr />
      <Button btnType="danger" size="lg">
        danger
      </Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="danger" size="sm">
        danger
      </Button>
      <Button btnType="danger" size="sm" disabled>
        danger
      </Button>
      <hr />
      <Button btnType="link" href="http://www.baidu.com" target="_blank">
        Button Link
      </Button>
      <Button btnType="link" size="sm" disabled>
        Button Link
      </Button>
    </div>
  );
};

export default App;
