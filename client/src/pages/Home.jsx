import { Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout, setUser, setOnlineUser, setSocketConnection } from "../redux/userSlice"
import Sidebar from "../components/Sidebar"
import logo from '../assets/logo.png'
import io from 'socket.io-client'


const Home = () => {
    const user = useSelector( state => state.user )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

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

    //socket.io

    useEffect(() => {
        const socketConnection = io(import.meta.env.VITE_REACT_APP_BACKEND_URL, {
            auth : {
                token : localStorage.getItem("token"),
            }
        })

        socketConnection.on("onlineUser",(data)=>{
           // console.log("user online", data)
            dispatch(setOnlineUser(data))
        })

        dispatch(setSocketConnection(socketConnection))

        return ()=>{
            socketConnection.disconnect()
        }
    }, [])

    //console.log("location", location)
    const basePath = location.pathname === '/'
    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
                <Sidebar />
            </section>

            <section className={`${basePath && "hidden"}`}>
                <Outlet />
            </section>

            <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
        </div>
    )
}

export default Home