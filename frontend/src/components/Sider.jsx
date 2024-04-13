import { Layout, Menu } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const { Sider } = Layout

const SiderMenu = () => {
    const [pathList, setPathList] = useState([])
    const [menulist, setMenulist] = useState([])
    const navi = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const rights = JSON.parse(JSON.parse(localStorage.token).rights)
        setMenulist(rights)
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/getRightsList").then(
            res => {
                setPathList(res.data)
            }
        )
    }, [])
    console.log(pathList,menulist)

    const check = (pathList, menulist) => {
        const parentPath = pathList.filter(item => item.grade === 1 && menulist.includes(item.path) && item.pagepermission === 1)
        const childPath = pathList.filter(item => item.grade === 2 && menulist.includes(item.path) && item.pagepermission === 1)
        let finalPath = parentPath.map((item) => {
            return {
                key: item.path,
                label: item.title,
                children: []
            }
        })
        //将子路径的key和label添加到父路径中，根据子路径的fatherRightId和父路径的id是否匹配来判断
        for (let i of parentPath) {
            for (let j of childPath) {
                if (j.fatherRightId === i.id) {
                    finalPath[parentPath.indexOf(i)].children.push({
                        key: j.path,
                        label: j.title
                    })
                }
            }
            //如果没有子路径，则删除children
            if(finalPath[parentPath.indexOf(i)].children.length === 0){
                delete finalPath[parentPath.indexOf(i)].children
            }
        }
        return finalPath
    }



    return (
        <Sider style={{height: '100vh'}}>
            <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
            <div style={{ flex: 1, overflow: 'auto' }}>
                <Menu
                    items={check(pathList, menulist)}
                    mode="inline"
                    style={{height: '100%'}}
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
                    onClick={({ key }) => {
                        navi(key)
                        console.log(key)
                    }}
                />
            </div>
            </div>
        </Sider>
    )
}

export default SiderMenu;