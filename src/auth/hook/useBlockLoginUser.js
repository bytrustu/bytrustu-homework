import {useSelector} from "react-redux";
import {useEffect} from "react";
import {AuthStatus} from "../../common/constant";
import {useHistory} from "react-router-dom";

export default function useBlockLoginUser() {
    const history = useHistory();
    const status = useSelector(state => state.auth.status);
    useEffect(() => {
        if ( status === AuthStatus.Login) {
            history.replace('/')
        }
    }, [status, history])
}