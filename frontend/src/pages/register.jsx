import { Form, Radio, Button, Input, Cascader, Select, notification, message } from "antd"
import { UserOutlined, LockOutlined, IdcardOutlined, MailOutlined, ManOutlined } from '@ant-design/icons'
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import './register.less'

const Register = () => {
    const [userform] = Form.useForm()
    const [hrform] = Form.useForm()
    const [radioValue, setRadioValue] = useState('user')
    const [categories, setCategories] = useState([])
    const onChangeRadio = ({ target: { value } }) => {
        setRadioValue(value)
    }
    const navi = useNavigate()

    const regMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);// 邮箱格式
    const regPhone = new RegExp(/^1[3456789]\d{9}$/);// 手机号格式

    //校验用户名是否是正确的邮箱或手机号格式
    const checkUsername = (_, value) => {
        if (regMail.test(value) || regPhone.test(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('请输入格式正确的邮箱或手机号'))
        };
    }
    //校验是否用户名被占用
    const checkUsernameIfUsed = async (_, value) => {
        if (radioValue === 'user') {
            let user
            await axios.get(`http://localhost:8080/getUserByUsername/user=${value}`).then(res => {
                user = res.data
            })
            if (!user) {
                return Promise.resolve()
            } else {
                return Promise.reject(new Error('该邮箱/手机号已经被注册'))
            }
        } else if (radioValue === 'hr') {
            let company
            await axios.get(`http://localhost:8080/getCompanyByCompanyName/company=${value}`).then(res => {
                company = res.data
            })
            if (!company) {
                return Promise.resolve()
            } else {
                return Promise.reject(new Error('该邮箱/手机号已经被注册'))
            }

        }
    }
    //校验密码是否是正确格式
    const checkPassword = (_, value) => {
        const reg = new RegExp("^.*(?=.{6,})(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).*$");
        if (reg.test(value)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error('密码必须6位以上，并且包含大写字母、小写字母和数字各一个'))
        };
    }
    //校验邮箱是否是正确格式
    const checkEmail = (_, value) => {
        //如果用户填写了邮箱就进行校验
        if (!value || regMail.test(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('请输入格式正确的邮箱地址'))
        };
    }
    //校验手机号是否是正确格式
    const checkPhone = (_, value) => {
        if (!value || regPhone.test(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('请输入格式正确的手机号码'))
        };
    }
    //校验2次输入的密码是否一致
    const confirmPassword = (_, value) => {
        const password = radioValue === 'user' ? userform.getFieldValue("userPassword") : hrform.getFieldValue("companyPassword")
        if (password === value) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error('密码不一致！'))
        };
    }

    
    useEffect(() => {
        // 将职位分类数据设置为Cascader组件使用的格式
        axios.get(`http://localhost:8080/getAllJobCategory`).then(
            res => {
                const data = res.data.filter(item => item.categoryState === 1)
                const gradeOne = []
                const gradeTwo = []
                const categoryList = []
                for (let item of data) {
                    if (item.grade === 1) {
                        gradeOne.push(item)
                    } else if (item.grade === 2) {
                        gradeTwo.push(item)
                    }
                }
                for (let i of gradeOne) {
                    const children = []
                    for (let j of gradeTwo) {
                        if (j.fatherCategoryId === i.id) {
                            children.push({ value: j.category, label: j.category })
                        }
                    }
                    categoryList.push({ value: i.category, label: i.category, children })
                }
                setCategories(categoryList)
            }
        )
    }, [])
    const onFinish = async (values) => {
        console.log(values)
        if (radioValue === 'user') {
            let obj = {
                id: null,
                username: values.userRegisterName,
                password: values.userPassword,
                name: values.realName,
                roleId: 1,
                roleState: 1,
                gender: values.gender,
                phoneNumber: values.phoneNumber,
                email: values.email,
                wantJob: JSON.stringify(values.wangtJob),
                resumeId: null,
                applications: JSON.stringify('')

            }

            await axios.post('http://localhost:8080/userRegister', obj).then(
                res => {
                    notification['success']({
                        message: '注册成功',
                    });
                }
            )

            await axios.post(`http://localhost:8080/userLogin`, {
                username: obj.username,
                password: obj.password
            }).then(res => {
                if (res.data.length === 0) {
                    message.error('登录不成功')
                } else {
                    console.log(res.data)
                    localStorage.setItem('token', JSON.stringify(res.data))
                    navi('/home')
                }
            })

        } else {
            let obj = {
                id: null,
                username: values.companyRegisterName,
                password: values.companyPassword,
                companyName: values.companyName,
                roleId: 2,
                roleState: 0,
                introduction: JSON.stringify(''),
                position: JSON.stringify(''),
                avatar: JSON.stringify('')
            }

            axios.post('http://localhost:8080/companyRegister', obj).then(
                res => {
                    notification['success']({
                        message: '注册申请提交成功，待平台审核',
                    });
                    setTimeout(() => {
                        navi('/home')
                    }, 1500);
                })
        }

    }

    return (

        <div className="registerform" style={{ width: 500 }}>
            <div className="title"><b>inneed</b></div>
            <div className="roleSelect">
                <Radio.Group
                    value={radioValue}
                    onChange={onChangeRadio}
                    buttonStyle="solid"
                >
                    <Radio.Button value="user">我是求职者</Radio.Button>
                    <Radio.Button value="hr">我是招聘者</Radio.Button>
                </Radio.Group>
            </div>

            <Form
                name="normal_register"
                className="register-form"
                onFinish={onFinish}
                form={userform}
                style={{ display: radioValue === 'user' ? 'block' : 'none' }}
            >
                {/* <div style={{ display: radioValue === 'user' ? 'block' : 'none' }}> */}
                <Form.Item
                    name="userRegisterName"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱或手机号',
                        },
                        {
                            validator: checkUsername
                        },
                        {
                            validator: checkUsernameIfUsed
                        }
                    ]}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱或手机号" />
                </Form.Item>
                <Form.Item
                    name="userPassword"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请设置密码',
                        },
                        {
                            validator: checkPassword
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="设置密码"
                    />
                </Form.Item>
                <Form.Item
                    name="userPasswordConfirm"
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码',
                        },
                        {
                            validator: confirmPassword
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="再次输入密码"
                    />
                </Form.Item>
                <Form.Item
                    name="realName"
                >
                    <Input
                        prefix={<IdcardOutlined className="site-form-item-icon" />}
                        placeholder="您的真实姓名（选填）"
                    />
                </Form.Item>
                <Form.Item
                    name='gender'
                >
                    <Select placeholder='选择您的性别'>
                        <Select.Option value="男">男</Select.Option>
                        <Select.Option value="女">女</Select.Option>
                        <Select.Option value="拒绝回答">拒绝回答</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="email"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: false
                        },
                        {
                            validator: checkEmail
                        }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="您的邮箱（选填）"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: false
                        },
                        {
                            validator: checkPhone
                        }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="您的手机号码（选填）"
                    />
                </Form.Item>
                <Form.Item
                    name="wantJob"
                >
                    <Cascader options={categories} placeholder="选择您感兴趣的岗位" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>&nbsp;
                    已有账号，<a href="/login">去登录</a>
                </Form.Item>
                {/* </div> */}
            </Form>

            <Form
                name="normal_register"
                className="register-form"
                onFinish={onFinish}
                form={hrform}
                style={{ display: radioValue === 'hr' ? 'block' : 'none' }}
            >
                {/* <div style={{ display: radioValue === 'hr' ? 'block' : 'none' }}> */}
                <Form.Item
                    name="companyRegisterName"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的公司邮箱',
                        },
                        {
                            validator: checkEmail
                        },
                        {
                            validator: checkUsernameIfUsed
                        }
                    ]}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入您的公司邮箱" />
                </Form.Item>
                <Form.Item
                    name="companyPassword"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请设置密码',
                        },
                        {
                            validator: checkPassword
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="设置密码"
                    />
                </Form.Item>
                <Form.Item
                    name="companyPasswordConfirm"
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码',
                        },
                        {
                            validator: confirmPassword
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="再次输入密码"
                    />
                </Form.Item>
                <Form.Item
                    name="companyName"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的公司全称',
                        },
                    ]}
                >
                    <Input
                        prefix={<IdcardOutlined className="site-form-item-icon" />}
                        placeholder="您的公司全称"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交注册申请
                    </Button>&nbsp;
                    已有账号，<a href="/login">去登录</a>
                </Form.Item>
                {/* </div> */}
            </Form>
        </div>
    )
}

export default Register;