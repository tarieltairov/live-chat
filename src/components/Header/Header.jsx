import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
            <Link to={'/calculator'}><p>calculator</p></Link>
            <Link to={'/'}><p>longpulling</p></Link>
            <Link to={'/ws'}><p>web-socket</p></Link>
        </div>
    );
};

export default Header;