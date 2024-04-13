import { useEffect, useState } from 'react';
import {Switch, Table} from 'antd'
import axios from 'axios';

const HrManageList = () => {
    const [table, setTable] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/getAllCompanies").then(
            res => {
                const list = res.data.filter(item => item.roleState === 1)
                setTable([...list])
            }
        )
    },[])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '公司账号名称',
            dataIndex: 'username'
        },
        {
            title: '公司全称',
            dataIndex: 'companyName'
        },
        {
            title: '账户状态',
            render: (title) => {
                return <div>
                    {
                            <Switch 
                            defaultChecked={title.roleState}
                            checkedChildren="有效" 
                            unCheckedChildren="无效"
                            onChange={() => {
                                axios.patch(`http://localhost:8080/updateRoleState/${title.id}`, {
                                    "roleId": 2
                                })
                            }}></Switch>}
                            </div>}}
    ]

    return (
        <div>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />;
        </div>
    )
}

export default HrManageList;