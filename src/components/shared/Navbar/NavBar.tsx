import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GameSubPage } from '../../../utils/types';

function NavBar() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState<GameSubPage>('Local');

    const navigateTo = (page: string): void => {
        navigate(page);
        switch (page) {
            case '/':
                setActivePage('Local');
                break;
            case '/ai':
                setActivePage('AI');
                break;
        }
    }

    return (
        <div className='navbar'>

            <button className={activePage === 'Local' ? "navbar-button-active-page" : 'navbar-button'} onClick={() => navigateTo('/')}>
                Local
            </button>

            <button className={activePage === 'AI' ? "navbar-button-active-page" : 'navbar-button'} onClick={() => navigateTo('/ai')}>
                AI
            </button>

            <button className='navbar-button' disabled>
                Multiplayer
            </button>

            <button className='burger-button'>
                <span className='burger-text'>☰</span>
            </button>

        </div>
    );
}

export default NavBar;