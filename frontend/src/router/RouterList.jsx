import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from '../pages/home'
import ProfileEdit from '../pages/user/profileEdit/index'
import ProfileShow from '../pages/user/profileShow/index'
import ApplyList from '../pages/user/applyList'
import PositionManage from '../pages/hr/positionManage'
import PositionAdd from '../pages/hr/positionAdd'
import PositionEdit from '../pages/hr/positionEdit'
import Admin from '../pages/admin'
import HrManageAudit from '../pages/admin/hr_manage/hr_manage_audit'
import HrManageList from '../pages/admin/hr_manage/hr_manage_list'
import UserManage from '../pages/admin/user_manage'
import PositionAudit from '../pages/admin/positionManage/positionAudit'
import PositionList from '../pages/admin/positionManage/positionList'
import JobCategory from '../pages/admin/positionManage/jobCategory'
import Login from '../pages/login'
import Register from '../pages/register'
import NotFound from '../pages/404'

const routeList = {
    "/home": <Home />,
    "/home/:id": <Home />,
    "/profile": <ProfileShow />,
    "/profile/edit": <ProfileEdit />,
    "/profile/:id": <ProfileShow />,
    "/applylist": <ApplyList />,
    "/position_manage": <PositionManage />,
    "/position_add": <PositionAdd />,
    "/position_edit": <PositionEdit />,
    "/user_manage": <UserManage />,
    "/hr_manage/audit": <HrManageAudit />,
    "/hr_manage/list": <HrManageList />,
    "/admin_position_manage/audit": <PositionAudit />,
    "/admin_position_manage/list": <PositionList />,
    "/position_category": <JobCategory />
}

export default function Routes() {
    const [routerList, setRouterList] = useState([])
    let token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            const rights = JSON.parse(JSON.parse(localStorage.token).rights)
            setRouterList([...rights])           
        } 
        else {
            //用户未登录的情况下请求以下路径，会重定向至登录页
            setRouterList([
                "/profile", "/profile/edit", "/applylist", 
            ])
        }

    }, [token])
    return (
        (token.roleId === 1 || token.roleId === 2)?
        [
            { path: "/", elment: <Navigate to='/home' />, children: [
                ...routerList.map(item => {
                    return ({
                        path: item,
                        element: token? routeList[item]: <Login />
                    })
                }),
                {path: "/", element: <Home />}
            ] },           
            { path: "/home", element: <Home />, children: [
                { path: "/home/:id", element: <Home />},
            ] },
            { path: "/login", element: <Login />},
            { path: "/register", element: <Register />},
            { path: '*', element: <NotFound /> }
        ]:
        [
            { path: "/", element: <Admin />, children: [
                ...routerList.map(item => {
                    return ({
                        path: item,
                        element: token? routeList[item]: <Login />
                    })
                })
                // {path: 'hr_manage/audit', element: <hrManageAudit />}
            ]},
            { path: "/home", element: <Home />, children: [
                { path: "/home/:id", element: <Home />},
            ] },
            { path: "/login", element: <Login />},
            { path: "/register", element: <Register />},
            { path: '*', element: <NotFound /> }
        ]
    )
}