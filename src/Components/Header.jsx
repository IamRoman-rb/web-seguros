import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import logo from '../Assets/logo.png';
import { IconMenu3, IconX } from '@tabler/icons-react';
import Style from '../Styles/Header.module.css';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={`${Style.header} ${isSticky ? Style.sticky : ''}`}>
            <a href="#" className={Style.logo}>
                <img src={logo} alt="Logo Seguros" className={Style.imgLogo}/>
            </a>
            <Navbar isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
            
            <button className={Style.menuToggle} onClick={toggleMenu}>
                {isMenuOpen ? <IconX size={24} /> : <IconMenu3 size={24} />}
            </button>
        </header>
    );
}

export default Header;