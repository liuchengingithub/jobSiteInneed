import PositionAdd from "../positionAdd";
import { useLocation } from "react-router-dom";

const PositionEdit = () => {
    const location = useLocation()
    const {positionId} = location.state
    // console.log(positionId)
    return <PositionAdd positionId={positionId}/>
}

export default PositionEdit;