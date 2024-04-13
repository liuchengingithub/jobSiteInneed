import { Table, Tag, Button, message, PageHeader, Space, Drawer, Card, Modal } from 'antd'
import { useState, useEffect } from 'react';
import Header from '../../../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Resume from '../../../components/Resume';

const PositionManage = () => {
    const [table, setTable] = useState([])
    const [positionList, setPositionList] = useState([])
    const [applicationList, setApplicationList] = useState([])
    const [open, setOpen] = useState(false)
    const navi = useNavigate()
    const { id } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`http://localhost:8080/getPositionByCompanyId/${id}`).then(
            res => {
                setPositionList(res.data)
    
            }
        )
    },[])
    useEffect(() => {
        axios.get(`http://localhost:8080/getApplicationByCompanyId/${id}`).then(
            res => {
                setApplicationList(res.data)
            }
        )
    },[])
    useEffect(() => {
        for(let position of positionList){
            position.applications = []
            for(let application of applicationList){
                if(application.positionId === position.id){
                    position.applications.push(application)
                }
            }
        }
        setTable(positionList)
    },[positionList, applicationList])

    // useEffect(() => {
    //     axios.get(`http://localhost:5000/positions?companyId=${id}&_embed=applications`).then(
    //         res => {
    //             setTable(res.data)
    //         }
    //     )
    // },[id])

    const applyStateList = ['收到简历', '已邀请面试', '简历已拒绝', '面试中', '求职者拒绝面试邀请', '面试已通过', '面试未通过', '所应聘职位已下线']
    const applyColorList = ['blue', 'green', 'grey', 'orange', 'grey', 'green', 'grey', 'grey']
    const [resumeId, setResumeId] = useState()

    const expandedRowRender = (record) => {
        const { applications } = record
        
        const handleClick = (id) => {
            setResumeId(id)
            setOpen(true)
        }

        const columns = [
            {
                title: '求职者姓名',
                dataIndex: 'userName'
            },
            {
                title: '简历',
                render: (title, item) => {
                    return <Button type="link" onClick={() => {handleClick(item.resumeId)}}>查看简历</Button>
                }
            },
            {
                title: '当前状态',
                dataIndex: 'applyState',
                render: (title) => {
                    return <Tag color={applyColorList[title]}>{applyStateList[title]}</Tag>
                }
            },
            {
                title: '操作',
                render: (title) => {
                    return <div>
                        {
                            title.applyState === 0 &&
                            <Space size='middle'>
                                <Button type='primary' size='small' onClick={() => {
                                    axios.patch(`http://localhost:8080/updateApplication/${title.id}`, {
                                        "applyState": 1
                                    }).then(
                                        res => {
                                            message.success('已发送面试邀请')
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 1000)
                                        }
                                    )
                                }}>邀请面试</Button>
                                <Button danger size='small' onClick={() => {
                                    // setTable(table.filter(data => data.id !== item.id))
                                    axios.patch(`http://localhost:8080/updateApplication/${title.id}`, {
                                        "applyState": 2
                                    }).then(
                                        res => {
                                            message.success('已拒绝简历')
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 1000)
                                        }
                                    )
                                }}>拒绝简历</Button>
                            </Space>
                        }
                        {
                            title.applyState === 3 &&
                            <Space size='middle'>
                                <Button type='primary' size='small' onClick={() => {
                                    // setTable(table.filter(data => data.id !== item.id))
                                    axios.patch(`http://localhost:8080/updateApplication/${title.id}`, {
                                        "applyState": 5
                                    }).then(
                                        res => {
                                            message.success(`已将${title.userName}的面试结果设为：已通过`)
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 1000)
                                        }
                                    )
                                }}>通过面试</Button>
                                <Button danger size='small' onClick={() => {
                                    // setTable(table.filter(data => data.id !== item.id))
                                    axios.patch(`http://localhost:8080/updateApplication/${title.id}`, {
                                        "applyState": 6
                                    }).then(
                                        res => {
                                            message.success(`已将${title.userName}的面试结果设为：未通过`)
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 1000)
                                        }
                                    )
                                }}>未通过面试</Button>
                            </Space>
                        }
                    </div>
                }
            }
        ]

        return <Table columns={columns} dataSource={applications} pagination={{ pageSize: 5 }} />;
    }

    const positionStateList = ['待审核', '有效', '审核未通过', '已下线']
    const positionColorList = ['blue', 'green', 'grey', 'grey']

    const columns = [
        {
            title: '职位',
            dataIndex: 'positionName'
        },
        Table.EXPAND_COLUMN,
        {
            title: '应聘人数',
            dataIndex: 'applications',
            render: (title) => {
                return <p>{title.length}</p>
            }
        },
        {
            title: '职位状态',
            dataIndex: 'positionState',
            render: (title) => {
                return <Tag color={positionColorList[title]}>{positionStateList[title]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Space size='large'>
                        <Button onClick={() => {
                            navi('/position_edit',{state:{positionId: item.id}})
                            // console.log(item.id)
                            }}>编辑职位</Button>
                    {
                        item.positionState === 1 &&
                        // <Space size='large'>
                            <Button onClick={() => {
                                // setTable(table.filter(data => data.id !== item.id))
                                axios.patch(`http://localhost:8080/updatePosition/${item.id}`, {
                                    ...item,
                                    positionState: 3
                                }).then(
                                    res => {
                                        message.success('职位已下线')
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    }
                                )
                            }}>下线职位</Button>
                            
                        // </Space>
                    }
                    {
                        item.positionState === 3 &&
                        // <Space size='large'>
                            <Button onClick={() => {
                                // setTable(table.filter(data => data.id !== item.id))
                                axios.patch(`http://localhost:8080/updatePosition/${item.id}`, {
                                    ...item,
                                    positionState: 0
                                }).then(
                                    res => {
                                        message.success('待管理员审核通过后自动上线')
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    }
                                )
                            }}>重新上线</Button>
                            
                        // </Space>
                    }
                    </Space>
                </div>
            }
        }
    ];

    return (
        <>
            <Header />
            <div style={{ width: '80%', margin: '0 auto' }}>
                <PageHeader
                    className="site-page-header"
                    onBack={false}
                    title="我发布的职位"
                    extra={<Button key="1" type="primary" onClick={() => navi('/position_add')}>新建职位</Button>}
                />
                <Table dataSource={table} columns={columns} pagination={{ pageSize: 10 }} rowKey={item => item.id} expandable={{
                    expandedRowRender
                }} />;
            </div>
            <Modal
               open={open}
               onCancel={() => {
               setOpen(false)
                open = false
                }}
               width={800}
               footer={null}
            >
              <Resume resumeId={resumeId}/>
            </Modal>
        </>
    )
}



export default PositionManage;