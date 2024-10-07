import Users from './pages/Users';
import User from './pages/User';
import Home from './pages/Home';
import Movies from './pages/Movies';
import ServerCon from './pages/ServerCon';

const routes = [
    {
        path: '/',
        component : Home
    },
    {
        path: '/movies',
        component : Movies
    },
    {
        path: '/users',
        component : Users
    },
    {
        path: '/users/:id',
        component : User
    },
    {
        path: '/server',
        component : ServerCon
    },
];

export default routes;