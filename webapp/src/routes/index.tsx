import { createBrowserRouter, redirect } from "react-router-dom";
import Login from '@pages/login/Login'
import Videos from '@pages/videos/Videos'
import NotFound from '@pages/notFound/NotFound'
import { isAuthorized } from './middlewares/isAuthorized'
import { logout } from '@services/users'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/videos",
        element: <Videos />,
        loader: isAuthorized
    },
    {
        path: "/logout",
        loader: () => {
            logout()
            return redirect('/')
        }
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router