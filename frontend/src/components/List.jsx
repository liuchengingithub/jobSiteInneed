import { MoreOutlined } from '@ant-design/icons';
import { List, Card, Tag } from 'antd';
import axios from 'axios';
// import http from '../utils/http'
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JobList = () => {
    const [positionList, setPositionList] = useState([])
    const { keyword } = useSelector((state) => state.searchReducer)
    const navi = useNavigate()
    // console.log(keyword)
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/positions?positionState=1&q=${keyword}&_expand=company`).then(
    //         res => {
    //             setPositionList(res.data)
    //         }
    //     )
    // }, [keyword])
    useEffect(() => {
        axios.get(`http://localhost:8080/getPositionByKeyword/key=${keyword}`).then(
            res => {
                const list = res.data.filter(item => item.positionState === 1)
                setPositionList(list)
            }
        )
    }, [keyword])
    console.log(keyword)
    // console.log(positionList)

    if (positionList.length === 0) {
        return (
            <div>
                <h3>抱歉，没有找到<b>{keyword}</b>相关的职位和公司</h3>
                <p>请检查输入是否有误</p>
            </div>
        )
    }
    return (
        <List
            style={{ marginBottom: '290px' }}
        >
            {
                positionList.map(item => {
                    const { id, positionName, city, companyName, minSalary, maxSalary, description } = item
                    const intro = description.length <= 139 ? description.replace(/<[^>]+>/g, '') : (description.replace(/<[^>]+>/g, '').slice(0, 139) + '...')
                    return (
                        <Card
                            title={<div><h3>{positionName}</h3><h4>{companyName}</h4><Tag>{city}</Tag>
                                <Tag>{minSalary + '-' + maxSalary}</Tag></div>}
                            extra={<MoreOutlined />}
                            style={{ width: '100%', marginBottom: '20px', cursor: 'pointer' }} onClick={() => {
                                navi(`/home/${id}`)
                            }}
                            bordered={true}
                            key={id}
                        >
                            <div dangerouslySetInnerHTML={{
                                __html: intro
                            }} />
                        </Card>
                    )
                })
            }

        </List>)

}

export default JobList;

