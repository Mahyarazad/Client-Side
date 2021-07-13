import React from 'react'
import './Auth.css'
import axios from 'axios'
import {LoginContext} from './LoginProvider'
import {useHistory, Link} from 'react-router-dom'
import {passwordStrength} from 'check-password-strength'


const initialState = {
    username : '',
    password : '',
    confirmPassword:'',
    isloading : false,
    error : '',
    isLoggedin : false
}

export default function Auth(){

    const userField = React.useRef(null)
    const passField = React.useRef(null)
    const history = useHistory()
    const [logState, setLogState] = React.useState(['signin', 'Please Login', true, 'Logging in...', 'Login'])
    const [errorLog, setErrorLog] = React.useState('')
    const [ps, setPS] = React.useState(null)
    const [windowSize, setWindowSize] = React.useState(false)
    
    const {username ,password ,confirmPassword,isloading ,errorP ,isLoggedin,
        loading,success,errorM,loggedout,field} = React.useContext(LoginContext)

    const handleLogState = () =>{
        errorM()
        setLogState(['signup', 'Please Sign up', false, 'Signing up...', 'Sign up']) 
    }

    const handleLogStateBack = () =>{
        errorM()
        setLogState(['signin', 'Please Login', true, 'Logging in...', 'Login'])
    }

    const handleSubmitLogin = async(e) =>{
       
        e.preventDefault()
        const passControl = passwordStrength(password).value
        if ((!logState[2] && passControl) === 'Too weak' || (!logState[2] && passControl) === 'Weak'){
            errorP()
            setErrorLog("Choose a stronger password")
            passField.current.focus()
            
        } else {
            try{
                loading()
            
                const response = await axios.post(`https://express-react-server398.herokuapp.com/${logState[0]}`
                ,{email: username, password: password})
                    
                success()
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('uid', response.data.uid)
                localStorage.setItem('logSession', true)
                history.push('/home')
            } catch(err){
                errorM()
                if(err.response.status === 400){
                    setErrorLog("You have to provide email and password!")
                } else if (err.response.status === 401){
                    setErrorLog("Email or password is wrong!")
                } else {
                    setErrorLog(err.response.data.message)
                }
                userField.current.focus()
            }  
        }
    }
   
    const handleResize = () =>{
        if(window.innerWidth < 1185){
            setWindowSize(true)
        } else {
            setWindowSize(false)
        }

    }
    window.addEventListener('resize', handleResize)
    
    React.useEffect(()=>{
        handleResize()
        const id = setInterval(()=>{
            setErrorLog('')
            console.log('it gets fire')
            clearInterval(id)
        }, 3000);

       
    },[errorLog])

    return (
        <div className="log">
            <div className="login-container">
                {JSON.parse(localStorage.getItem('logSession')) || isLoggedin?  
                    <>
                        <h2 className="user-welcome"> Hello {localStorage.getItem('email') || username}!</h2>
                        <button className="submit-logout" onClick={()=> {
                           loggedout();
                           localStorage.clear()}
                            }> Logout </button>
                    </> :
                <form className="login-form" onSubmit={handleSubmitLogin}>
                    <p className="text">{logState[1]}</p>
                    {logState[2] ? (<span className="log-state" onClick={handleLogState}>
                        Haven't registered yet, sign up </span>
                    ) : (<span className="log-state" onClick={handleLogStateBack}>
                    Already have an account, Login </span>)}
                    <p className={errorLog ? "error-active" : 'error'}> {errorLog} </p>
                   
                    <input ref={userField} className={windowSize?'username-small':'username'} type="text"
                        placeholder="Username" name="username"
                        value={username} onChange={e=> field(e.target)}/>
                    <input ref={passField} className={windowSize?'password-small':'password'} type="password"
                        placeholder="Password" name="password"
                        autoComplete="new-password"
                        value={password} onChange={e=> {
                            field(e.target);
                            setPS((passwordStrength(password).value));
                        }}/>
                    {!logState[2]?
                    <input className={windowSize?'confirm-password-small':'confirm-password'} type="password"
                    placeholder="Confirm Password" name="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword} onChange={e=> {field(e.target)}}/>:
                     <></>}
                    {password === confirmPassword?
                             <></>:
                             confirmPassword?
                             <span className='password-check'>Password doesn't match</span>:<></>}
                    {!logState[2] ? password ? <span className='password-strength' data-password={ps}> {ps} </span>: <></>:<></>}
                    
                   
                    <button className={`submit-${logState[0]}`} type="submit" disabled={isloading} >
                        {isloading ? (logState[3]) : (logState[4])}
                    </button>
                </form>}
            </div>
        </div>
    )

}