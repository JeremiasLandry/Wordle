import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleQuestion, faSquarePollVertical} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from './chardleLogo.png'

function NavBar() {
  return (
    <nav className="navbar">
        <Link to='/how-to-play' className='how-to-play-link'>
            <FontAwesomeIcon icon={faCircleQuestion}/>
        </Link>
        <Link to='/' className='how-to-play-link'>
            <img src={Logo} className='chardleLogo'/>
            {/* <h1 className='navbar-title'>CHARDLE</h1> */}
        </Link>
        <Link to='/statistics' className='how-to-play-link'>
            <FontAwesomeIcon icon={faSquarePollVertical}/>
        </Link>
    </nav>
  )
}

export default NavBar