import { Descriptions, Row, Col, Divider, PageHeader, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import moment from 'moment';

const Resume = (props) => {
    const [resumeId, setResumeId] = useState(null)
    const { id: userId, roleId } = JSON.parse(localStorage.getItem('token'))
    //区分是hr查看求职者的简历还是求职者查看自己的简历
    useEffect(() => {
        if(roleId === 1){
            const {resumeId} = JSON.parse(localStorage.getItem('token'))
            setResumeId(resumeId)
        }else if(roleId === 2){
            setResumeId(props.resumeId)
        }
    },[roleId, props])
    

    const [resumeState, setResumeState] = useState({})
    const [experience, setExperience] = useState({})
    const navi = useNavigate()
    useEffect(() => {
        if (resumeId) {
            axios.get(`http://localhost:8080/getResumeById/${resumeId}`).then(
                res => {
                    const obj = res.data
                    setResumeState(obj)
                    setExperience(JSON.parse(obj.experience))
                }
            )
        }
    }, [resumeId])


    if (resumeId) {
        const { name, gender, birthDate, email, phoneNumber, city } = resumeState
        return (
            <div style={{ width: '60%', margin: '20px auto', padding: '20px 50px', border: '1px solid grey', borderRadius: '5px', minHeight: '800px' }}>

                <Descriptions layout="vertical" size='small' labelStyle={{ fontWeight: 'bold' }} >
                    <Descriptions.Item label="" span={3}><h3><b>基本信息</b></h3></Descriptions.Item>
                    <Descriptions.Item label="姓名">{name}</Descriptions.Item>
                    <Descriptions.Item label="性别">{gender}</Descriptions.Item>
                    <Descriptions.Item label="出生年月">{moment(birthDate).format('YYYY-MM')}</Descriptions.Item>
                    <Descriptions.Item label="电子邮箱">{email}</Descriptions.Item>
                    <Descriptions.Item label="电话号码">{phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="当前所在城市">{city}</Descriptions.Item>
                    <Descriptions.Item label="" span={3}><h3><b>工作经历</b></h3></Descriptions.Item>
                </Descriptions>

                {
                    experience.length > 0 && (
                        experience.map(item => {
                            const { position, company, time, description } = item
                            return (
                                <div>
                                    <Row>
                                        <Col span={16}>
                                            <p><b>职位：</b>{position}</p>
                                        </Col>
                                        <Col span={8}>
                                            <p><b>公司：</b>{company}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>{moment(time[0]).format('YYYY.MM')} - {moment(time[1]).format('YYYY.MM')}</p>
                                    </Row>
                                    <Row>
                                        <p><b>工作内容：</b>{description}</p>
                                    </Row>
                                    <Divider />
                                </div>
                            )
                        }))
                }

            </div>
        )
    } else {
        return (
            <div style={{ width: '60%', margin: '100px auto', textAlign: 'center' }} id='div'>
                <h2>您还没有简历。<a href='/profile/edit'>去新增</a></h2>
            </div>
        )
    }
    // return <p>1</p>

}

export default Resume;