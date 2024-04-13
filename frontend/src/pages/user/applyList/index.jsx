import { Table, Tag, Button, message, PageHeader, Space } from 'antd'
import { useState, useEffect } from 'react';
import Header from '../../../components/Header'
import axios from 'axios';
import moment from 'moment'

const ApplyList = () => {
    const [table, setTable] = useState([])

    const { id } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`http://localhost:8080/getApplicationByUserId/${id}`).then(
            res => {
                setTable(res.data)
            }
        )
    }, [])

    // console.log(positionList)

    const applyStateList = ['已投递简历', 'hr邀请您面试', '简历未通过', '面试中', '已拒绝面试邀请', '面试已通过', '面试未通过', '职位已下线']
    const colorList = ['blue', 'green', 'grey', 'orange', 'grey', 'green', 'grey', 'grey']

    const columns = [
        {
            title: '投递职位',
            dataIndex: 'positionName',
        },
        {
            title: '公司',
            dataIndex: 'companyName',
        },
        {
            title: '当前状态',
            dataIndex: 'applyState',
            render: (applyState) => {
                return <Tag color={colorList[applyState]}>{applyStateList[applyState]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    {
                        item.applyState === 1 &&
                        <Space size='large'>
                            <Button type='primary' onClick={() => {
                                axios.patch(`http://localhost:8080/updateApplication/${item.id}`, {
                                    "applyState": 3
                                }).then(
                                    res => {
                                        message.success('已接受面试邀请')
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    }
                                )
                            }}>接受面试</Button>
                            <Button danger onClick={() => {
                                axios.patch(`http://localhost:8080/updateApplication/${item.id}`, {
                                    "applyState": 4
                                }).then(
                                    res => {
                                        message.success('已拒绝面试邀请')
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    }
                                )
                            }}>拒绝面试</Button>
                        </Space>
                    }
                </div>
            }
        }
    ];

    const expandedRowRender = (record) => {
        const { positionDetail } = record
        const {positionName, companyName, city, minSalary, maxSalary, education, postDate, description} = positionDetail
        return (
            <div>
                <h2><b>{positionName}【{companyName}】</b></h2>
                <Space size={100}>
                    <h4><b>工作地点：</b>{city}</h4>
                    <h4><b>薪资范围：</b>{minSalary + '-' + maxSalary}</h4>
                </Space>
                <br />
                <Space size={100}>
                    <h4><b>学历要求：</b>{education}</h4>
                    <h4><b>发布日期：</b>{moment(postDate).format('YYYY-MM')}</h4>
                </Space>
                <br />
                <h4><b>岗位职责：</b></h4>
                <div dangerouslySetInnerHTML={{
                    __html: description
                }} />
            </div>
        )

    }

    return (
        <>
            <Header />
            <div style={{ width: '80%', margin: '0 auto' }}>
                <PageHeader
                    className="site-page-header"
                    onBack={false}
                    title="我的投递"
                />
                <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} expandable={{
                    expandedRowRender
                }} />;
            </div>
        </>
    )
}



export default ApplyList;