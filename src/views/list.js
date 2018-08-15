import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Tree, Button, Modal, Input, Avatar,Card,message } from 'antd';
import service from '../utils/service';
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const confirm = Modal.confirm;
class UIList extends React.Component {
	state = {
        list: [],
        showCresteDialog:false,
        h5_title:""
	};
	onChange = () => {};

	componentDidMount() {
		this.refresh();
    }

    refresh(){
        var user = service.getUserInfo();
		service.getH5List(user.id).then((list) => {
			console.log(list);
			this.setState({
				list: list
			});
		});
    }
    
    onEdit(item){
        console.log(item);
        this.props.history.push(`/editor/${item.id}`);
    }

    onDelete(item){
        confirm({
            title:"警告",
            content:"确定要删除此页么？删除后不可恢复！",
            onOk:()=>{
              service.deleteH5(item.id).then(()=>{
                message.info("已删除");
                this.refresh();
              })
            }
          });
    }

    handleCreateH5(){
        this.setState({
            showCresteDialog:true
        })
    }

    onCreateH5(){
        var user = service.getUserInfo();
        var h5={
            userid:user.id,
            title:this.state.h5_title|| "未命名",
            h5:{
                title: this.state.h5_title|| "未命名",
                pages: [],
                active_page_index: -1,
            }
        };
        service.saveH5(h5).then(()=>{
            message.info("创建成功");
            this.refresh();
            this.setState({showCresteDialog:false})
        })
    }

	renderH5List() {
		var list = this.state.list || [];

		return list.map((item, i) => {
			return (
				<div key={i} className="h5-item">
                    <Card hoverable
                        bordered={false}
                        title={item.title||"未命名"}
						style={{ width: 200 }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
                        }
                        bodyStyle={{padding:0}}
						actions={[ <Icon type="delete" onClick={()=>{this.onDelete(item)}} />, <Icon type="edit" onClick={()=>{this.onEdit(item)}} />, <Icon type="ellipsis" /> ]}
					>
						
					</Card>
				</div>
			);
		});
	}

	render() {
		return (
			<Layout className="layout-page">
				<Header className="header">
					<div className="logo">VUI builder</div>
					<div className="editor-actions" />
					<div className="header-menu-right">
						<span className="userinfo">
							<Avatar icon="user" /> admin
						</span>
					</div>
				</Header>
				<Content className="layout-main-wapper">
					<Layout className="layout-main">
						<Sider width={300} className="layout-sider">
							<Menu mode="inline" style={{ width: 300 }}>
								<Menu.Item key="1">我的H5</Menu.Item>
								<Menu.Item key="2">我的模板</Menu.Item>
                                
							</Menu>
						</Sider>
						<Content style={{background:"#efefef"}}>
                            <div className="h5-list">
                                {this.renderH5List()}
                                <div className="h5-item h5-item-add" onClick={()=>{this.handleCreateH5()}}>
                                    <Card hoverable style={{ width: 200 }}>
                                        <Icon type="plus" style={{ fontSize: 40, color: '#08c' }}  />
                                    </Card>                                    
                                </div>
                            </div>

                            <Modal
                                title="创建H5"
                                visible={this.state.showCresteDialog}
                                onOk={()=>{this.onCreateH5()}} 
                                onCancel={()=>{this.setState({showCresteDialog:false})}}
                                >
                            <p><Input placeholder="请输入标题" onChange={(e)=>{this.setState({h5_title:e.target.value})}} /></p>
                            </Modal>
						</Content>
					</Layout>
				</Content>
				
			</Layout>
		);
	}
}
export default UIList;
