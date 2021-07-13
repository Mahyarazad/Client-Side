import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import {MdFingerprint} from 'react-icons/md'
import {Button} from '../Button'
import './Navbar.css'
import {useHistory} from 'react-router-dom'
import {IconContext} from 'react-icons/lib'
import {LoginContext} from '../Auth/LoginProvider'


function Navbar({responsive}) {
    const history = useHistory()
    const {username ,isLoggedin, field} = React.useContext(LoginContext)
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => {
        setClick(false);
        // history.push('/auth')
    }

    const showButton = () =>{
        if(window.innerWidth <= responsive.width){
            setButton(false)

        } else {
            setButton(true)
        }
    }

    window.addEventListener('resize', showButton)

    React.useEffect(()=>{
        showButton()
    },[])
    return (
        <>  
            <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
                <div className="navbar-container.container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <MdFingerprint className='navbar-icon'/>
                        Maahyar Azad
                    </Link>
                    <div className="menu-icon" onClick={handleClick}> 
                        {click ? <FaTimes/> : <FaBars/> }
                    </div>
                    <ul className={click ? 'nav-menu active ' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/home' className='nav-links' onClick={closeMobileMenu}> Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/services' className='nav-links' onClick={closeMobileMenu}> Services </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}> Products </Link>
                        </li>
                        <li className="nav-btn">
                            {button ? (
                                <Link to='/auth' className="btn-link">
                                    <Button buttonStyle="btn--outline" onClick={closeMobileMenu}> 
                                    {JSON.parse(localStorage.getItem('logSession')) || isLoggedin?
                                localStorage.getItem('email') || username : "Log in"}</Button>
                                </Link>
                            ) : (
                                <Link to='/auth' className="btn-link">
                                    <Button buttonStyle="btn--outline" buttonSize="btn--mobile" onClick={closeMobileMenu}> 
                                    {JSON.parse(localStorage.getItem('logSession')) || isLoggedin? 
                                localStorage.getItem('email') || username : "Log in"}</Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
