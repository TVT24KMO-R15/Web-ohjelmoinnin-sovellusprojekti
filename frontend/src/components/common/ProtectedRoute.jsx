import { useUser } from "../../context/UseUser"
import { Outlet,Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
    const { user } = useUser()
    if (!user || !user.token) return <Navigate to ="/" replace />
        return (<Outlet />)
}