import { Dropdown, Menu, Layout } from "antd";
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import './Header.less'

const { Header } = Layout;
const Top = () => {
    const navi = useNavigate()
    const token = localStorage.getItem('token')
    if (token) {
        const tokenJSON = JSON.parse(token)
        //登录者为求职者时使用name（真实姓名）或username（账号名），为公司hr时使用companyName
        let name
        if(tokenJSON.roleId === 1){
            name = tokenJSON.name || tokenJSON.username
        }else if(tokenJSON.roleId === 2){
            name = tokenJSON.companyName
        }else if(tokenJSON.roleId === 3){
            name = tokenJSON.username
        }
        const menu = (
            <Menu
                items={
                    tokenJSON.roleId === 1?
                    [
                    {
                        key: '1',
                        label: (
                            <h2 style={{ margin: '0' }}>{name}</h2>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <a target="_blank" rel="noopener noreferrer" href="/profile">
                                个人资料
                            </a>
                        )
                    },
                    {
                        key: '3',
                        label: (
                            <a target="_blank" rel="noopener noreferrer" href="/applylist">
                                我的投递
                            </a>
                        ),
                    },
                    {
                        key: '4',
                        danger: true,
                        label: (
                            <a onClick={() => {
                                localStorage.setItem('token', '')
                                navi('/login')
                            }}>
                                退出登录
                            </a>
                        ),
                    }
                ]:
                tokenJSON.roleId === 2?
                [
                    {
                        key: '1',
                        label: (
                            <h2 style={{ margin: '0' }}>{name}</h2>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <a onClick={() => {
                                navi('/position_manage')
                            }}>
                                我的发布
                            </a>
                        ),
                    },
                    {
                        key: '3',
                        danger: true,
                        label: (
                            <a onClick={() => {
                                localStorage.setItem('token', '')
                                navi('/login')
                            }}>
                                退出登录
                            </a>
                        ),
                    }
                ]:
                [
                    {
                        key: '1',
                        label: (
                            <h2 style={{ margin: '0' }}>{name}</h2>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <a onClick={() => {
                                navi('/user_manage')
                            }}>
                                后台管理
                            </a>
                        ),
                    },
                    {
                        key: '3',
                        danger: true,
                        label: (
                            <a onClick={() => {
                                localStorage.setItem('token', '')
                                navi('/login')
                            }}>
                                退出登录
                            </a>
                        ),
                    }
                ]
            }
            />

        );

        return (
            <Header>
                <h1 onClick={() => { navi('/home') }}>inneed</h1>
                <Dropdown overlay={menu} >
                    <Avatar size={40} src="https://joeschmoe.io/api/v1/random" />
                </Dropdown>
            </Header>
        )
        
    }
    return (
        <Header>
            <h1 onClick={() => { navi('/home') }}>inneed</h1>
            <a href="/login">去登录</a>
        </Header>
    )

}

export default Top;