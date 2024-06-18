import { createBrowserRouter } from 'react-router-dom'
import App from "../App.jsx"
import Home from "../pages/Home.jsx"
import RegisterPage from "../pages/RegisterPage.jsx"
import CheckEmailPage from "../pages/CheckEmailPage.jsx"
import CheckPasswordPage from "../pages/CheckPasswordPage.jsx"
import MessagePage from '../components/MessagePage.jsx';
import AuthLayouts from "../layout";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element:  <AuthLayouts><RegisterPage/></AuthLayouts>
            },
            {
                path: 'email',
                element: <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },
            {
                path: 'password',
                element: <AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: ':userId',
                        element: <MessagePage />
                    }
                ]
            }
        ]
    }
])

export default routes