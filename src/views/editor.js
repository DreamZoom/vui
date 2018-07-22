import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Tree,
  Button,
  Modal,
  Input
} from "antd";

import ComponentProvider from "../utils/componentProvider";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
class editor extends React.Component {
  state = {
    h5: {
      title: "未命名",
      pages: [
        {
          components: []
        }
      ],
      active_page_index: 0,
      active_component_index: 0
    }
  };

  showInsert() {
    this.setState({
      insertVisible: true,
      insertModel: {
        type: "",
        title: ""
      }
    });
  }

  handleInsert() {
    console.log(this.state.insertModel);

    this.state.pageData.children.push({
      ...this.state.insertModel
    });
    this.state.insertVisible = false;

    this.setState({ ...this.state });
  }

  handleCancelInsert() {
    this.setState({
      insertVisible: false
    });
  }

  renderPageList() {
    if (!this.state.h5) return;
    var pages = this.state.h5.pages || [];

    return pages.map((item, i) => {
      var activeClass =
        i == this.state.h5.active_page_index ? "page-item-active" : "";
      return (
        <div
          key={i}
          className={"page-item " + activeClass}
          onClick={() => {
            this.onPageActive(i, item);
          }}
        >
          page {i + 1}
        </div>
      );
    });
  }

  onPageAdd() {
    if (!this.state.h5) return;
    var pages = this.state.h5.pages || [];
    pages.push({
      components: []
    });

    this.state.h5.pages = pages;
    this.state.h5.active_page_index = pages.length - 1;
    this.setState({
      h5: { ...this.state.h5 }
    });
  }

  onPageActive(i, page) {
    if (!this.state.h5) return;
    var pages = this.state.h5.pages || [];
    if (i >= pages.length) {
      console.warn("数组越界");
      return;
    }
    this.state.h5.active_page_index = i;
    this.setState({
      h5: { ...this.state.h5 }
    });
  }

  render() {
    var page_list = this.renderPageList();

    return (
      <Layout className="layout-page">
        <Header className="header">
          <div className="logo">VUI builder</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Text</Menu.Item>
            <Menu.Item key="2">Image</Menu.Item>
            <Menu.Item key="3">Video</Menu.Item>
          </Menu>
        </Header>
        <Content className="layout-main-wapper">
          <Layout className="layout-main">
            <Sider width={300} style={{ background: "#fff" }}>
              <div className="page-list">
                {page_list}
                <div
                  className="page-item page-add"
                  onClick={() => {
                    this.onPageAdd();
                  }}
                >
                  +
                </div>
              </div>
            </Sider>
            <Content>
              <div className="editor-main">
                <div className="editor-page-wapper">
                  <div className="editor-page">qqq</div>
                </div>
              </div>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Vui Builder ©2016 Created by Dreamzoom
        </Footer>
      </Layout>
    );
  }
}

export default editor;
