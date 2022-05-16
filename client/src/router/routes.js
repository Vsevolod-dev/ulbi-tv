import About from "../pages/About";
import Posts from "../pages/Posts";
import PostPage from "../pages/PostPage/PostPage";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/about', component: <About/>},
    {path: '/posts', component: <Posts/>},
    {path: '/posts/:id', component: <PostPage/>},
    {path: '*', component: <Posts/>},
]

export const publicRoutes = [
    {path: '/about', component: <About/>},
    {path: '/login', component: <Login/>},
    {path: '*', component: <Login/>},
]