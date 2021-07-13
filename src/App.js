import React from 'react'
import Navbar from './components/pages/Navbar'
import Landing from './components/pages/Landing'
import './App.css'
import {BrowserRouter as Router, Route, Redirect, useLocation , Switch, Link} from 'react-router-dom';
import Search from './components/Search/Search'
import { createBrowserHistory } from 'history';
import Auth from './components/Auth/Auth';
import {FourOFour} from './components/Auth/FourOFour';
import {Provider} from './components/Auth/LoginProvider'
import {LoginContext} from './components/Auth/LoginProvider'


const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLoggedin} = React.useContext(LoginContext)
    const {location} = useLocation()
    const isLogin = localStorage.getItem('logSession') || isLoggedin
    console.log(isLogin)
    return (
        <Route {...rest} render={ props => (
            isLogin ?
                <Component {...props} />
                : <Redirect to={{
                    pathname: '/auth',
                    state: {from: location}
                }} />
        )} />
    );
};

export const responsive = {width: 1185};
function App() {

    const history = createBrowserHistory();

    return (
        <Provider>
            <Router>
            {/* <Router forceRefresh={true} >    */}
                <Navbar responsive={responsive}/>
                <Switch> 
                <Route path='/' 
                    exact 
                    component={() => <Landing responsive={responsive} />}
                    />
                   
                <Route path='/auth' 
                    exact
                    component={() => <Auth responsive={responsive} />}
                    />
                        
                
                    <PrivateRoute
                        path='/home'
                        exact
                        component={()=> <Search responsive={responsive}/>}
                        />
                  
                    <Route path='*' component={()=> <FourOFour/>}/>
        
                </Switch>
                
            </Router>
        </Provider>
    )
}

export default App
