import { Form, Input, Button, message, Radio } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import './login.less'
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const [form] = Form.useForm()
    const [radioValue, setRadioValue] = useState('user')
    const onChangeRadio = ({ target: { value } }) => {
        setRadioValue(value)
    }
    const navi = useNavigate()
    const onFinish = (values) => {
        // axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
        //     if(res.data.length === 0){
        //         message.error('登录不成功')

        //     }else {
        //         localStorage.setItem('token', JSON.stringify(res.data[0]))
        //         navi('/home')
        //     }
        // })
        if (radioValue === 'user') {
            axios.post(`http://localhost:8080/userLogin`, {
                username: values.username,
                password: values.password
            }).then(res => {
                if (res.data.length === 0) {
                    message.error('登录不成功')
                } else {
                    console.log(res.data)
                    localStorage.setItem('token', JSON.stringify(res.data))
                    navi('/home')
                }
            })
        } else if (radioValue === 'hr') {
            axios.post(`http://localhost:8080/companyLogin`, {
                username: values.username,
                password: values.password
            }).then(res => {
                if (res.data.length === 0) {
                    message.error('登录不成功')
                } else {
                    localStorage.setItem('token', JSON.stringify(res.data))
                    navi('/position_manage')
                }
            })
        } else if (radioValue === 'admin') {
            axios.post(`http://localhost:8080/adminLogin`, {
                username: values.username,
                password: values.password
            }).then(res => {
                if (res.data.length === 0) {
                    message.error('登录不成功')
                } else {
                    localStorage.setItem('token', JSON.stringify(res.data))
                    navi('/user_manage')
                }
            })

    }}

        return (
            <div style={{ height: '100vh', background: 'rgb(243,242,241)' }}>
                <div className="loginform">
                    <div className="title"><b>inneed</b></div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item className="roleSelect">
                            <Radio.Group
                                value={radioValue}
                                onChange={onChangeRadio}
                                buttonStyle="solid"
                            >
                                <Radio.Button value="user">我是求职者</Radio.Button>
                                <Radio.Button value="hr">我是招聘者</Radio.Button>
                                <Radio.Button value="admin">我是管理员</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱/手机号码',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱/手机号码" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入登录密码',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="登录密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>&nbsp;&nbsp;
                            {/* <Button htmlType="button" onClick={onHrLogin}>
                            HR登录
                        </Button>&nbsp; */}
                            没有账号 <a href="/register">去注册</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    export default Login;