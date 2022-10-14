import { FaSignOutAlt, FaRegUser, FaRegStar, FaHistory } from 'react-icons/fa';

export default [
    {
        icon: <FaRegStar color="#182C4C" size={16} />,
        label: 'Favoritos',
        to: '/videos'
    },
    {
        icon: <FaHistory color="#182C4C" size={16} />,
        label: 'Histórico',
        to: '/videos'
    },
    {
        icon: <FaRegUser color="#182C4C" size={16} />,
        label: 'Minha conta',
        to: '/videos'
    },
    {
        icon: <FaSignOutAlt color="#182C4C" size={16} />,
        label: 'Sair',
        to: '/logout'
    }
]