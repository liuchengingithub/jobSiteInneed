import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space, Modal, Col, Row, notification, PageHeader, Cascader } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import Header from '../../../components/Header'
import Edit from '../../../components/positionEdit'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


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


const PositionAdd = (props) => {
    const { positionId } = props
    const [editorState, setEditorState] = useState('')
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const navi = useNavigate()

    //如果是从编辑职位入口进入的，则获取对应的职位信息并设置为初始值
    useEffect(() => {
        if (positionId) {
            axios.get(`http://localhost:8080/getPositionById/id=${positionId}`).then(
                res => {
                    const obj = res.data
                    console.log(obj)
                    obj.jobCategory = JSON.parse(res.data.jobCategory)
                    form.setFieldsValue(obj)
                    setEditorState(obj.description)
                }
            )
        }
    }, [positionId])

    //获取公司id和公司名称
    const { id: companyId, companyName } = JSON.parse(localStorage.getItem('token'))

    // 将职位分类数据设置为Cascader组件使用的格式
    useEffect(() => {
        axios.get(`http://localhost:8080/getAllJobCategory`).then(
            res => {
                const data = res.data.filter(item => item.categoryState === 1)
                const gradeOne = []
                const gradeTwo = []
                const categoryList = []
                for (let item of data) {
                    if(item.grade === 1){
                        gradeOne.push(item)
                    }else if(item.grade === 2){
                        gradeTwo.push(item)
                    }}
                    for (let i of gradeOne){
                        const children = []
                        for(let j of gradeTwo){
                            if(j.fatherCategoryId === i.id){
                                children.push({ value: j.category, label: j.category })
                            }
                        }
                        categoryList.push({ value: i.category, label: i.category, children })
                    }
                    setCategories(categoryList)
                }
        )
    }, [])

    const [ifValuesChange, setIfValuesChange] = useState(false)
    const onValuesChange = () => {
        setIfValuesChange(true)
    }

    const onFinish = () => {
        //如果是从编辑职位入口进入的，则修改当前职位id对应的职位，否则新增职位数据
        if (positionId) {
            axios.patch(`http://localhost:8080/updatePosition/${positionId}`, {
                ...form.getFieldsValue(),
                jobCategory: JSON.stringify(form.getFieldValue("jobCategory")),
                description: editorState,
                positionState: 0,
                postDate: moment(Date.now()).valueOf(),
            }).then(res => {
                notification['success']({
                    message: '修改成功',
                });
                setTimeout(() => {
                    navi('/position_manage')
                }, 1500);
            })
        }else {
            axios.post(`http://localhost:8080/addPosition`, {
                ...form.getFieldsValue(),
                jobCategory: JSON.stringify(form.getFieldValue("jobCategory")),
                description: editorState,
                positionState: 0,
                postDate: moment(Date.now()).valueOf(),
                companyId,
                companyName
            }).then(res => {
                notification['success']({
                    message: '新建成功',
                });
                setTimeout(() => {
                    navi('/position_manage')
                }, 1500);
            })
        }


    };

    const onCancel = () => {
        ifValuesChange ? setOpen(true) : navi(-1)
    }

    const [form] = Form.useForm()
    return (
        <div>
            <Header />
            <div style={{ width: '60%', margin: '20px auto' }}>
                <PageHeader
                    className="site-page-header"
                    onBack={onCancel}
                    title="编辑职位"
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
                // disabled={componentDisabled}
                >
                    <h3><b>基本信息</b></h3>
                    <hr />
                    <Row gutter={50}>
                        <Col span={8}>
                            <Form.Item label="职位名称" name='positionName' rules={[{ required: true, message: '请填写职位名称' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="职位类别" name='jobCategory' rules={[{ required: true, message: '请选择职位类别' }]}
                                       >
                                <Cascader options={categories} placeholder="Please select" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="学历要求" name='education' rules={[{ required: true, message: '请选择学历要求' }]}>
                                <Select>
                                    <Select.Option value="研究生及以上">研究生及以上</Select.Option>
                                    <Select.Option value="本科及以上">本科及以上</Select.Option>
                                    <Select.Option value="大专及以上">大专及以上</Select.Option>
                                    <Select.Option value="无要求">无要求</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={50}>
                        <Col span={8}>
                            <Form.Item label="工作年限要求" name='year' rules={[{ required: true, message: '请填写电子邮箱' }]}>
                                <Input placeholder='如:1~3年/3年以上/无要求' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Space>
                                <Form.Item label="薪资范围：从" name='minSalary' rules={[{ required: true, message: '请填写最低薪资' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="到" name='maxSalary' rules={[{ required: true, message: '请填写最高薪资' }]}>
                                    <Input />
                                </Form.Item>
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="工作地点" name='city' rules={[{ required: true, message: '请填写工作地点' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3><b>职位详情</b></h3>
                    <hr />
                    <Edit getContent={(values) => {
                        // console.log(value)
                        setEditorState(values)
                    }} content={editorState}
                        hangdleChange={setIfValuesChange}
                    />


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
                        navi(-1)
                    }}
                >您还未保存此次修改，是否离开
                </Modal>
            </div>
        </div>
    )
}

export default PositionAdd;