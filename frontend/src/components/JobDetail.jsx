import { Card, Tag, Button, Modal, message } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Resume from './Resume'
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import './JobDetail.less'

const JobDetail = () => {
    const [offsetTop, setOffsetTop] = useState()
    // console.log(offsetTop)
    const token = localStorage.getItem('token')
    // const {id: userId} = JSON.parse(localStorage.getItem('token'))
    const { keyword } = useSelector((state) => state.searchReducer)
    const [positionDetail, setPositionDetail] = useState({})
    const [appliedPosition, setAppliedPosition] = useState([])
    const [needFixed, setNeedFixed] = useState(false)
    const [open, setOpen] = useState(false)
    const navi = useNavigate()
    const params = useParams()
    const jobId = Object.keys(params).length === 0 ? '' : params.id
    console.log(jobId)

    useEffect(() => {
        setOffsetTop(document.getElementById('detail').offsetTop)
        fix()
    })

    useEffect(() => {
        axios.get(`http://localhost:8080/getPositionByKeyword/key=${keyword}`).then(
            res => {
                const list = res.data.filter(item => item.positionState === 1)
                setPositionDetail({ ...list[0] })
            }
        )
    }, [keyword])

    useEffect(() => {
        if (jobId) {
            axios.get(`http://localhost:8080/getPositionById/id=${jobId}`).then(
                res => {
                    const list = res.data.filter(item => item.positionState === 1)
                    setPositionDetail({ ...list[0] })
                })
        }
    }, [jobId])

    useEffect(() => {
        if (token && token.roleId === 1) {
            const { id: userId } = JSON.parse(token)
            axios.get(`http://localhost:8080/getApplicationByUserId/${userId}`).then(
                res => {
                    let list = []
                    for (let item of res.data) {
                        list.push(item.positionId)
                    }
                    setAppliedPosition([...list])
                }
            )
        }

    }, [])

    const fix = () => {
        // console.log(fixedTop)
        window.onscroll = () => {
            let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
            if (scrollTop >= offsetTop - 10) {
                setNeedFixed(true)
            }
            else if (scrollTop < offsetTop - 10) {
                setNeedFixed(false)
            }
        }
    }

    const handleClick = () => {
        if (token && token.roleId === 1) {
            setOpen(true)
        } else {
            message.warning('请先以求职者身份登录')
            setTimeout(() => {
                navi('/login')
            }, 1500)
        }
    }

    const handleSubmit = () => {
        const { id: userId, name, resumeId } = JSON.parse(token)
        axios.post(`http://localhost:8080/addApplication`, {
            positionId: positionDetail.id,
            positionName: positionDetail.positionName,
            companyId: positionDetail.companyId,
            companyName: positionDetail.companyName,
            userId: userId,
            userName: name,
            resumeId,
            applyState: 0
        }).then(res => {
            message.success('简历投递成功')
            setOpen(false)
        })
        axios.patch(`http://localhost:8080/updateUserApplyList/${userId}`, {
            applications: [...appliedPosition, positionDetail.id]
        })
        setAppliedPosition([...appliedPosition, positionDetail.id])
    }


    if (positionDetail === undefined) {
        return (
            <Card
                title='试试这些关键词：'
                style={{ width: '60%' }}
            >
                <a>前端</a><br />
                <a>后端</a><br />
                <a>测试</a><br />
                <a>运维</a>
            </Card>
        )
    }

    return (
        <div className={needFixed ? 'a-fixed' : ''} id='detail'>
            <Card
                title={<div>
                    <h3>{positionDetail.positionName}</h3>
                    <h4>{positionDetail.companyName}</h4>
                    <Tag>{positionDetail.city}</Tag>
                    <Tag>{positionDetail.minSalary + '-' + positionDetail.maxSalary}</Tag>
                    <br />
                    <div style={{ marginTop: '20px', alignItems: 'center' }}>
                        <Button
                            type="primary"
                            onClick={handleClick} 
                            disabled={appliedPosition.includes(positionDetail.id)}
                        >
                            {appliedPosition.includes(positionDetail.id) ? '已投递' : '投递简历'}
                        </Button>
                        <HeartOutlined style={{ fontSize: '18px', marginLeft: '20px' }} />
                    </div>
                </div>
                }
                bordered={true}
            >
                <div style={{ height: '430px', overflow: 'auto' }}>
                    <h4><b>工作地点：</b>{positionDetail.city}</h4>
                    <h4><b>薪资范围：</b>{positionDetail.minSalary + '-' + positionDetail.maxSalary}</h4>
                    <h4><b>学历要求：</b>{positionDetail.education}</h4>
                    <h4><b>工作年限要求：</b>{positionDetail.year}</h4>
                    <h4><b>发布日期：</b>{moment(positionDetail.postDate).format('YYYY-MM')}</h4>
                    <br />
                    <h4><b>岗位职责：</b></h4>
                    <div dangerouslySetInnerHTML={{
                        __html: positionDetail.description
                    }} />
                    {/* <p>{positionDetail.description}</p> */}
                </div>
            </Card>
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
                width={1000}
                footer={[
                    <Button key="cancel" onClick={() => { setOpen(false) }}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        确认投递
                    </Button>,
                    <Button
                        key="edit"
                        type="primary"
                        onClick={() => navi('/profile/edit')}
                    >
                        编辑简历
                    </Button>,
                ]}
            >
                <h2 style={{ color: '#096dd9' }}>确认投递以下简历？</h2>
                <Resume />
            </Modal>
        </div>
    )
}

export default JobDetail;

