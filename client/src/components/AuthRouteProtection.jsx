import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRouteProtechtion = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn) {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to='/sign-in' />
    }

}

export default AuthRouteProtechtion