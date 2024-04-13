import Header from '../../../components/Header'
import Resume from '../../../components/Resume'
import { PageHeader, Button } from 'antd'
import { useNavigate } from "react-router-dom";


const ProfileShow = () => {
    const navi  = useNavigate()
    return (
        <div>
            <Header />
            <PageHeader
                className="site-page-header"
                onBack={() => {}}
                title="我的简历"
                extra={<Button key="1" type="primary" onClick={() => navi('/profile/edit')}>编辑简历</Button>}
                style={{width: '60%', margin: '0 auto'}}
            />
            <Resume />
        </div>
    )

}

export default ProfileShow;