import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Tree,
  Button,
  Modal,
  message
} from "antd";

import DragBox from "../components/DragBox";
import PropertyGrid from "../components/PropertyGrid";
import Element from "../components/Element";
import animationController from "../utils/animation";
import componentFactory from "../utils/ComponentFactory";

import service  from "../utils/service"

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
class editor extends React.Component {
  state = {
    h5: {
      title: "未命名",
      pages: [],
      active_page_index: -1,
     
    }
  };


  componentDidMount() {
    var user = service.getUserInfo();
    console.log(this.props);
    var id= this.props.match.params.id;
	  service.getH5(id).then((res)=>{
       this.setState({
         h5:{...this.state.h5,...res.h5}
       });
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
         <div className="page-item-index"><span>{i+1}</span></div>
         <div ><div className="page-item-thumbnail"></div></div>
         <div className="page-item-remove" onClick={()=>{ this.onPageRemove(i, item);}}><span><Icon type="close" /></span></div>
        </div>
      );
    });
  }


  renderActivePage(){
      var page  = this.getActivePage();
      if(!page) return "";
      var components = page.components||[];
      return (
      <div className="vui-page">
         {components.map((item,i)=>{
           return(
             <Element key={i} component={item} onClick={()=>{this.onElementClick(item,i)}}  />
           );
         })}
      </div>
      );
  }

  onElementClick(item,i){
    var page  = this.getActivePage();
    if(!page) return;

    page.active_component_index = i||0;

    this.setState({
      h5: { ...this.state.h5 }
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

  onPageRemove(i,page){
    if (!this.state.h5) return;
    var pages = this.state.h5.pages || [];
    if (i >= pages.length) {
      console.warn("数组越界");
      return;
    }

    confirm({
      title:"警告",
      content:"确定要删除此页么？删除后不可恢复！",
      onOk:()=>{
        pages.splice(i,1);
        if(i<=this.state.h5.active_page_index)--this.state.h5.active_page_index;

        this.setState({
          h5: { ...this.state.h5 }
        });
      }
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

  getActivePage(){
    if (!this.state.h5) return;
    var pages = this.state.h5.pages || [];
    var index = this.state.h5.active_page_index;
    if (index >= pages.length) {
      console.warn("数组越界");
      return;
    }

    return pages[index];
  }

  getActiveComponent(){
    var active_page = this.getActivePage();
    if(!active_page) return;
    
    var components = active_page.components||[];
    var index = active_page.active_component_index||0;
    if (index >= components.length) {
      console.warn("数组越界");
      return;
    }

    return components[index];

  }

  onComponentAppend(type){

    var page = this.getActivePage();

    if(!page) return;

    var c = componentFactory.create(type,{});
    page.components.push(c);
    this.setState({
      h5: { ...this.state.h5 }
    });
  }




  onSizeChange(e){
    var active_component = this.getActiveComponent();
    if(!active_component) return;
    active_component.propertys={
      ...active_component.propertys,
      ...e
    };
    
    this.setState({
      h5: { ...this.state.h5 }
    });
  }


  onPropertyChange(component){
    var active_component = this.getActiveComponent();
    if(!active_component) return;
    
    
    this.setState({
      h5: { ...this.state.h5 }
    });
  }

  onPreviewAnimation(animation){
    console.log(animation)
    var active_component = this.getActiveComponent();
    if(!active_component) return;
    
    active_component.previewAnimation={...animation};
    
    this.setState({
      h5: { ...this.state.h5 }
    });
    setTimeout(()=>{
      animationController.previewAnimation();
    },10);
    
  }

  onPreviewPageAnimation(){
    setTimeout(()=>{
      animationController.previewPageAnimation();
    },10);
  }


  onH5Save(){
    var user = service.getUserInfo();
    var id= this.props.match.params.id;
    service.getH5(id).then((o)=>{
      o.h5={...this.state.h5};
      service.saveH5(o).then((res)=>{
         console.log(res);
         message.info("已保存");
      })
    });
  }

  render() {
    var page_list_render = this.renderPageList();

    var active_page_render = this.renderActivePage();

    var active_component = this.getActiveComponent();
   
    return (
      <Layout className="layout-page">
        <Header className="header">
          <div className="logo">VUI builder</div>
          <div className="editor-actions">
            <Button type="primary" onClick={()=>{this.onComponentAppend("text")}}>文字</Button>
            <Button type="primary" onClick={()=>{this.onComponentAppend("image")}}>图片</Button>
            <Button type="primary" onClick={()=>{this.onComponentAppend("chart")}}>图表</Button>
          </div>
          <div className="header-menu-right">
            <Button type="primary" onClick={()=>{}}>预览</Button>
            <Button type="primary" onClick={()=>{this.onH5Save()}}>保存</Button>
          </div>
        </Header>
        <Content className="layout-main-wapper">
          <Layout className="layout-main">
            <Sider width={300} className="layout-sider">
              <div className="page-list">
                {page_list_render}
                <div
                  className="page-item page-item-add"
                  onClick={() => {
                    this.onPageAdd();
                  }}
                >
                  <Icon type="plus" style={{ fontSize: 30, color: '#08c' }}  />
                </div>
              </div>
            </Sider>
            <Content>
              <div className="editor-main">
                <div className="editor-page-wapper">
                  <div className="editor-page ">
                      {active_page_render}
                      {active_component?<DragBox onChange={(e)=>{this.onSizeChange(e)}} propertys={{...active_component.propertys}} />:""}        
                      <div className="editor-tools">
                          <div className="editor-tool-item" onClick={()=>{this.onPreviewPageAnimation()}}>
                              <Icon type="play-circle-o" style={{ fontSize: 18 }} />
                          </div>
                          <div className="editor-tool-item" onClick={()=>{this.onPreviewPageAnimation()}}>
                              <Icon type="rollback" style={{ fontSize: 18 }} />
                          </div>
                          <div className="editor-tool-item" onClick={()=>{this.onPreviewPageAnimation()}}>
                              <Icon type="retweet" style={{ fontSize: 18 }} />
                          </div>
                          <div className="editor-tool-item" onClick={()=>{this.onPreviewPageAnimation()}}>
                              <Icon type="reload" style={{ fontSize: 18 }} />
                          </div>
                          <div className="editor-tool-item" onClick={()=>{this.onPreviewPageAnimation()}}>
                              <Icon type="menu-unfold" style={{ fontSize: 18 }} />
                          </div>
                      </div>             
                  </div>
                </div>
                <div className="editor-property-panel">
                    {active_component?<PropertyGrid onChange={(e)=>{this.onPropertyChange(e)}} onPreviewAnimation={(e)=>{this.onPreviewAnimation(e)}} component={active_component} />:""}
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
