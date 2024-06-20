import { Outlet, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout, setUser } from "../redux/userSlice"
import Sidebar from "../components/Sidebar"



const Home = () => {
    const user = useSelector( state => state.user )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUserDetails = async () => {
        try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`

            const response = await axios({
                url: URL,
                withCredentials: true,
            })

            dispatch(setUser(response.data.data))


            if(response.data.logout) {
                dispatch(logout())
                navigate("/email")
            }

            // console.log("User details: ", response)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    // const basePath = location.pathname === '/'
    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className="bg-white lg:block">
                <Sidebar />
            </section>

            <section>
                <Outlet />
            </section>
        </div>
    )
}

export default Home