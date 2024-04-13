import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Space, Modal, Divider, Col, Row, notification, PageHeader } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { nanoid } from '@reduxjs/toolkit';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

//表单格式，待用
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};


const ResumeEdit = () => {
    const { resumeId, id: userId } = JSON.parse(localStorage.getItem('token'))
    const [experience, setExperience] = useState([])
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const dateFormat = 'YYYY/MM'
    const navi = useNavigate()
    //如果取得到resumeId，说明用户是在编辑现有简历，则取简历信息设置初始值
    useEffect(() => {
        if (resumeId) {
            axios.get(`http://localhost:8080/getResumeById/${resumeId}`).then(
                res => {
                    const obj = res.data
                    form.setFieldsValue({
                        city: obj.city,
                        name: obj.name,
                        gender: obj.gender,
                        birthDate: moment(obj.birthDate),
                        email: obj.email,
                        phoneNumber: obj.phoneNumber,
                        time: obj.time
                    })
                    setExperience(JSON.parse(obj.experience))
                }
            )
        }
    }, [])

    //如果简历有改动但用户点击取消保存，则会弹框提示
    const [ifValuesChange, setIfValuesChange] = useState(false)
    const onValuesChange = () => {
        setIfValuesChange(true)
    }
    const onCancel = () => {
        ifValuesChange ? setOpen(true) : navi(-1)
    }

    const onFinish = () => {
        //将之前已有的和本次编辑新增的“工作经历”都添加到newExperience，作为简历中experience字段的数据来源
        const newResume = form.getFieldsValue()
        const newExperience = []
        const addExperience = form.getFieldValue('addExperience')
        if (addExperience !== undefined) {
            for (let item of addExperience) {
                newExperience.push({ ...item, id: nanoid() })
            }
        }
        //getFieldsValue()取到的各段工作经验数据，以id:{}的形式存储，因此需要额外处理，统一存放在newExperience数组中
        if (resumeId) {
            const idList = []
            for (let item of experience) {
                idList.push(item.id)
            }
            for (let id of idList) {
                newExperience.push({
                    ...newResume[id],
                    id: id
                })
            }
            // 修改现有简历数据
            axios.patch(`http://localhost:8080/updateResume/${resumeId}`, {
                name: newResume.name,
                gender: newResume.gender,
                birthDate: newResume.birthDate,
                email: newResume.email,
                phoneNumber: newResume.phoneNumber,
                city: newResume.city,
                experience: JSON.stringify(newExperience)
            }).then(res => {
                notification['success']({
                    message: '修改成功',
                });
                setTimeout(() => {
                    navi('/profile')
                }, 1500);
            })
        }else {
            axios.post(`http://localhost:8080/addResume`, {
                    userId,
                    name: newResume.name,
                    gender: newResume.gender,
                    birthDate: newResume.birthDate,
                    email: newResume.email,
                    phoneNumber: newResume.phoneNumber,
                    city: newResume.city,
                    experience: JSON.stringify(newExperience)
                }).then(res => {
                        notification['success']({
                            message: '添加成功',
                        });
                        setTimeout(() => {
                            navi('/profile')
                        }, 1500);
                    })
            }}

    return (
        <div style={{ width: '60%', margin: '20px auto' }}>
            <PageHeader
                className="site-page-header"
                onBack={onCancel}
                title="编辑简历"
            />
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{ padding: '50px 50px', border: '1px solid grey', borderRadius: '5px' }}
                layout="vertical"
                onFinish={(value) => onFinish(value)}
                onValuesChange={onValuesChange}
            >
                <h3><b>基本信息</b></h3>
                <hr />
                <Row gutter={50}>
                    <Col span={8}>
                        <Form.Item label="姓名" name='name' rules={[{ required: true, message: '请填写姓名' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="性别" name='gender' rules={[{ required: true, message: '请选择性别' }]}>
                            <Select>
                                <Select.Option value="男">男</Select.Option>
                                <Select.Option value="女">女</Select.Option>
                                <Select.Option value="拒绝回答">拒绝回答</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="出生年月" name='birthDate' rules={[{ required: true, message: '请选择出生年月' }]}>
                            <DatePicker picker='month' />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={50}>
                    <Col span={8}>
                        <Form.Item label="电子邮箱" name='email' rules={[{ required: true, message: '请填写电子邮箱' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="电话号码" name='phoneNumber'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="当前所在城市" name='city'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <h3><b>工作经历</b></h3>
                <hr />
                {
                    experience.length > 0 && (
                        experience.map((item) => {
                            const { time } = item
                            const [fromTime, toTime] = time
                            return (
                                <div key={item.id}>
                                    <Row gutter={50}>
                                        <Col span={8}>
                                            <Form.Item label="职位" name={[item.id, 'position']} initialValue={item.position} rules={[{ required: true, message: '请填写职位名称' }]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="公司" name={[item.id, 'company']} initialValue={item.company}
                                                rules={[{ required: true, message: '请填写公司名称' }]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <MinusCircleOutlined
                                                style={{ fontSize: '30px', float: 'right' }}
                                                onClick={() => {
                                                    setExperience([...experience.filter(data => data.id !== item.id)])
                                                }} />
                                        </Col>
                                    </Row>
                                    <Form.Item label="任职时期" name={[item.id, 'time']}
                                        rules={[{ required: true, message: '请填写任职时期' }]}
                                        initialValue={[moment(fromTime), moment(toTime)]}
                                    >
                                        <RangePicker picker="month" />
                                    </Form.Item>

                                    <Form.Item label="工作内容" name={[item.id, 'description']} initialValue={item.description} rules={[{ required: true, message: '请填写工作内容' }]}>
                                        <TextArea rows={4} size='large' />
                                    </Form.Item>
                                    <Divider dashed />
                                </div>
                            )
                        })
                    )
                }
                <Form.List name="addExperience" >
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 20 }} align="start" direction='vertical' >
                                        <Space align='start' direction='horizontal'>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'position']}
                                                label='职位'
                                                fieldKey={[field.key, 'position']}
                                                rules={[{ required: true, message: '请填写职位名称' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'company']}
                                                label='公司'
                                                fieldKey={[field.key, 'company']}
                                                rules={[{ required: true, message: '请填写公司名称' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                style={{ fontSize: '30px', float: 'right' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }} />
                                        </Space>
                                        <Form.Item
                                            {...field}
                                            label="任职时期"
                                            name={[field.name, 'time']}
                                            fieldKey={[field.key, 'time']}
                                            rules={[{ required: true, message: '请填写任职时期' }]}>
                                            <RangePicker picker="month" format={dateFormat} />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'description']}
                                            label='工作内容'
                                            fieldKey={[field.key, 'description']}
                                            rules={[{ required: true, message: '请填写工作内容' }]}
                                        >
                                            <TextArea rows={4} size='large' />
                                        </Form.Item>
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        <PlusOutlined /> 添加工作经历
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                <Space direction='horizontal' size='large'>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={onCancel}>
                            取消
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
            <Modal
                open={open}
                title=""
                okText="确认"
                cancelText="取消"
                onCancel={() => {
                    setOpen(false)
                }}
                onOk={() => {
                    navi('/profile')
                }}
            >您还未保存此次修改，是否离开
            </Modal>
        </div>
    )
}

export default ResumeEdit;