import { Outlet } from "react-router-dom"
import axios from 'axios'
import { useEffect } from "react"

const Home = () => {
    const fetchUserDetails = async () => {
        try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`

            const response = await axios({
                url: URL,
                withCredentials: true,
            })

            console.log("User details: ", response)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <div>Home

            <section>
                <Outlet />
            </section>
        </div>
    )
}

export default Home