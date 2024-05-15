import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('');

    const navigateTo = (page: string): void => {
        navigate(page);
        setActivePage(page);
    }

    return (
        <div className='navbar'>

            <button className={activePage === '/' ? "navbar-button-active-page" : 'navbar-button'} onClick={() => navigateTo('/')}>
                Local
            </button>

            <button className={activePage === '/ai' ? "navbar-button-active-page" : 'navbar-button'} onClick={() => navigateTo('/ai')}>
                AI
            </button>

            <button className='navbar-button' disabled>
                Multiplayer
            </button>

        </div>
    );
}

export default NavBar;