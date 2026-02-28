import Style from '../Styles/Header.module.css';
const Navbar = ({ isMenuOpen, closeMenu }) => {
    const routes = [
        { name: 'Coberturas', path: '#coberturas' },
        { name: 'Por qué elegirnos', path: '#elegirnos' },
        { name: 'Contacto', path: '#contacto' },
        {  name: 'Eventos', path: '#eventos' }
    ];

    return (
        <nav className={`${Style.navbar} ${isMenuOpen ? Style.open : Style.close}`}>
            <ul className={Style.navList}>
                {routes.map((route, index) => (
                    <li key={index} className={Style.navItem}>
                        <a href={route.path} onClick={closeMenu}>
                            {route.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;