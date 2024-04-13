import { useEffect, useState } from 'react';
import { Button, Switch, Table, Space, Popover, Modal, Form, Input, Popconfirm, message } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, MinusCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';

const JobCategory = () => {
    const [table, setTable] = useState([])
    const [originTable, setOriginTable] = useState([])
    const [open, setOpen] = useState(false)
    //当前用户正在编辑的一级分类id，如果是新增分类操作则为空
    const [editId, setEditId] = useState()
    const [form] = useForm()
    useEffect(() => {
        axios.get("http://localhost:8080/getAllJobCategory").then(
            res => {
                setOriginTable(res.data)
                const firstGrade = res.data.filter(item => item.grade === 1)
                const secondGrade = res.data.filter(item => item.grade === 2)
                for (let i of firstGrade) {
                    let children = []
                    for (let j of secondGrade) {
                        if (j.fatherCategoryId === i.id) {
                            children.push(j)
                        }
                    }
                    if (children.length !== 0) {
                        i.children = children
                    }
                }
                setTable([...firstGrade])
            }
        )
    }, [])

    // console.log(originTable)

    //如果用户从编辑按钮进入，则设置表单初始值
    const setFormValues = (id) => {
        const firstList = originTable.filter(item => item.id === id)
        const firstCategoryName = firstList[0].category
        const secondList = originTable.filter(item => item.fatherCategoryId === id)
        const secondCategoryName = secondList.map(item => {
            return { second: item.category, id: item.id }
        })
        form.setFieldsValue({
            first: firstCategoryName,
            second: secondCategoryName
        })
    }

    const onEdit = async () => {
        await form.validateFields()
        console.log(form.getFieldsValue())

        const { first, second } = form.getFieldsValue()
        if (editId) {
            const list = originTable.filter(item => item.id === editId || item.fatherCategoryId === editId)
            const oldIdlist = list.map(item => {
                return item.id
            })
            const newGradeTwoIdList = second.map(item => {
                return item.id
            })
            const newIdList = [editId, ...newGradeTwoIdList]
            for (let id of oldIdlist) {
                //如果原来id列表里的id不在新列表里，说明被删除了
                if (!newIdList.includes(id)) {
                    axios.delete(`http://localhost:8080/deleteCategory/id=${id}&grade=2`)
                } else {
                    //如果id还在，说明没被删除，判断内容是否做了修改
                    const [{ category: oldTitle, grade }] = originTable.filter(item => item.id === id)
                    const newTitle = id === editId ? first : second.filter(item => item.id === id)[0].second
                    if (oldTitle !== newTitle) {
                        axios.patch(`http://localhost:8080/updateCategory/${id}`, {
                            category: newTitle,
                            categoryState: 1,
                            grade: grade
                        })
                    }
                }
            }
            //如果没带id，说明是新增的
            for (let item of second) {
                if (!item.id) {
                    axios.post("http://localhost:8080/addCategory", {
                        id: null,
                        category: item.second,
                        grade: 2,
                        fatherCategoryId: editId,
                        categoryState: 1
                    })
                }
            }
        } else {
            await axios.post("http://localhost:8080/addCategory", {
                //id在后端自增
                id: null,
                category: first,
                grade: 1,
                fatherCategoryId: null,
                categoryState: 1
            })

            if (second && second.length > 0) {
                //获取新添加的一级分类的id，作为二级分类的父id
                const res = await axios.get(`http://localhost:8080/getJobCategory/${first}`)
                const category = res.data
                for (let item of second) {
                    await axios.post("http://localhost:8080/addCategory", {
                        id: null,
                        category: item.second,
                        grade: 2,
                        fatherCategoryId: category.id,
                        categoryState: 1
                    })
                }
            }
        }
        setOpen(false)
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        setEditId()
    }

    const deleteCategory = (categoryId, grade) => {
        axios.delete(`http://localhost:8080/deleteCategory/id=${categoryId}&grade=${grade}`).then(
            res => {
                message.success("删除成功")
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        ).catch(
            err => {
                message.error('删除失败')
            }
        )
    }

    const checkCategoryIfUsed = async (_, value) => {
        const list = editId? originTable.filter(item => item.id !== editId && item.fatherCategoryId !== editId): originTable

        const categoryList = list.map(item => { return item.category })
        const ifCategoryExist = categoryList.includes(value)
        if (!ifCategoryExist) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error('该分类已存在'))
        }
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            render: (title, record) => {
                return record.grade === 1 ? <b>{title}</b> : <div>{title}</div>
            }
        },
        {
            title: '分类名称',
            dataIndex: 'category',
            render: (title, record) => {
                return record.grade === 1 ? <b>{title}</b> : <div>{title}</div>
            }
        },
        {
            title: '操作',
            render: (record) => {
                return <div>
                    <Space size='large'>
                        <Switch
                            defaultChecked={record.categoryState}                            
                            checkedChildren="有效"
                            unCheckedChildren="无效"
                            onChange={() => {
                                axios.patch(`http://localhost:8080/updateCategory/${record.id}`, {
                                    categoryState: record.categoryState ? 0 : 1,
                                    grade: record.grade
                                })
                            }}
                        ></Switch>
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={() => deleteCategory(record.id, record.grade)}
                            // onCancel={onCancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <DeleteOutlined style={{ fontSize: '20px', color: 'red', verticalAlign: 'middle' }} />
                        </Popconfirm>
                        {
                            record.grade === 1 &&
                            <Popover content='新增下级分类'>
                                <EditOutlined
                                    style={{ fontSize: '20px', verticalAlign: 'middle' }}
                                    onClick={() => {
                                        setFormValues(record.id)
                                        setOpen(true)
                                        setEditId(record.id)
                                    }}
                                />
                            </Popover>
                        }
                    </Space>
                </div>
            }
        }
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', height: '70px', paddingRight: '20px' }}>
                <Button icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>新增一级分类</Button>
            </div>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
            <Modal
                open={open}
                title="新增职位分类"
                okText="确认"
                cancelText="取消"
                onCancel={() => {
                    setOpen(false)
                    //关闭Modal后清空表单默认值，避免用户点击右上角新增分类时带有已有分类的信息
                    form.setFieldsValue({
                        first: '',
                        second: ''
                    })
                    setEditId()
                }}
                onOk={() => onEdit()}
            >
                <Form form={form} name="addCategoryForm">
                    <Form.Item
                        label="一级分类名称"
                        name="first"
                        rules={[
                            {
                                required: true,
                                message: '分类名称不能为空'
                            },
                            {
                                validator: checkCategoryIfUsed
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.List name="second">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            // {...field}
                                            label="二级分类名称"
                                            name={[field.name, 'second']}
                                            fieldKey={[field.key, 'second']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '分类名称不能为空'
                                                },
                                                {
                                                    validator: checkCategoryIfUsed
                                                }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        添加二级分类
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>

        </div>
    )
}

export default JobCategory;