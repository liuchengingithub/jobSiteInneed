import { useEffect, useState } from 'react';
import { Switch, Table, Space } from 'antd'
import axios from 'axios';
import moment from 'moment'

const PositionList = () => {
    const [table, setTable] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/getPositionById/id=").then(
            res => {
                const list = res.data.filter(item => item.positionState === 1)
                setTable([...list])
            }
        )
    }, [])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '职位名称',
            dataIndex: 'positionName'
        },
        {
            title: '公司id',
            dataIndex: 'companyId'
        },
        {
            title: '公司全称',
            dataIndex: 'companyName'
        },
        {
            title: '当前状态',
            render: (title, record) => {
                return <div>
                    {
                        <Switch
                            defaultChecked={title.positionState}
                            checkedChildren="有效"
                            unCheckedChildren="无效"
                            onChange={() => {
                                axios.patch(`http://localhost:8080/updatePosition/${title.id}`, {
                                    ...record,
                                    positionState: 0
                                })
                            }}></Switch>}
                </div>
            }
        }
    ]

    const expandedRowRender = (record) => {
        const {positionName, companyName, city, minSalary, maxSalary, education, postDate, description} = record
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
        <div>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} expandable={{
                    expandedRowRender
                }}/>;
        </div>
    )
}

export default PositionList;