import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import SiderMenu from '../../components/Sider'
import Top from '../../components/Header';

const { Content } = Layout;

const Admin = () => {
    return (
        <div>
            <Top />
            <Layout className="site-layout">
                <SiderMenu />
                <Content className="site-layout-background" style={{ background: 'white' }}>
                    {/* <Spin spinning={modeReducer.isLoading}> */}
                    <Outlet />
                    {/* </Spin> */}
                </Content>
            </Layout>
        </div>
    )
}

export default Admin;