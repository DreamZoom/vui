import React from 'react';
import { Layout, Menu, Breadcrumb, Icon,Tree,Button } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
class editor extends React.Component{


  state={
      pageData:{
        title:"page 1",
        children:[{
          title:"carousel 1",
          type:"carousel"
        },{
          title:"layout 1",
          type:"layout",
          children:[{
            title:"image 1",
            type:"image"
          }]
        }]
      }
  }

    render(){


      const loop = item => {
        item.key=item.key||"0";
        if (item.children && item.children.length) {
          var childs = item.children.map((d,i)=>{
            d.key=item.key+"-"+i;
            return loop(d);
          });
          return <TreeNode key={item.key} title={item.title}>{childs}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.title} />;
      };

        return (<Layout>
          <Header className="header">
            <div className="logo" >VUI builder</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <div className="actions">
                <ButtonGroup>
                    <Button icon="plus"></Button>
                    <Button icon="minus"></Button>
                </ButtonGroup>
                   
                </div>
                <Tree className="draggable-tree" draggable>
                  {loop(this.state.pageData)}
                </Tree>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                Content
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Vui Builder ©2016 Created by Dreamzoom
          </Footer>
        </Layout>);
    }
}

export default editor;