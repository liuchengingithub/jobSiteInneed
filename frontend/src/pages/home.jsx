import Header from '../components/Header'
import { Layout, Button, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import JobList from '../components/List';
import JobDetail from '../components/JobDetail'
import { useDispatch } from 'react-redux';
import { onSearch } from '../redux/reducers/searchSlice'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Content } = Layout;

const Home = () => {
    // const [offsetTop, setOffsetTop] = useState()
    const [form] = Form.useForm()
    const navi = useNavigate()
    const dispatch = useDispatch()
    const onFinish = (value) => {
        dispatch(onSearch(value.keyword))
        // console.log(value.keyword)
        navi('/home')
    }

    // useEffect(() => {
    //     // setOffsetTop(document.querySelector('#detail').offsetTop)
    //     const offsetTop = document.querySelector('#detail').offsetTop
    // },[])
    // console.log(offsetTop)


    return (
        <div>
            <Header />
            <Content
                style={{
                    margin: '0 150px',
                    height: '100vh',
                }}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                    style={{
                        margin: '30px auto',
                        width: '90%',
                    }}
                >
                    <Row gutter={12}>
                        <Col
                            span={16}
                        >
                            <Form.Item
                                name='keyword'
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入输入职位/公司/工作地点！',
                            //     },
                            // ]}
                            >
                                <Input size="large" prefix={<SearchOutlined />} placeholder="输入职位/公司/工作地点" />
                            </Form.Item>
                        </Col>
                        {/* <Col
                            span={10}
                        >
                            <Form.Item>
                                <Input size="large" prefix={<EnvironmentOutlined />} placeholder="输入工作地点" />
                            </Form.Item>
                        </Col> */}
                        <Col
                            span={8}
                        >
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large">
                                    找工作
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
                <div style={{
                    margin: '30px auto',
                    width: '90%',
                }} id='detail'>
                    <Row gutter={12}>
                        <Col
                            span={10}>
                            <JobList />
                        </Col>
                        <Col
                            span={14}>
                            <JobDetail/>
                        </Col>
                    </Row>
                </div>
            </Content>
        </div>
    )
}

export default Home