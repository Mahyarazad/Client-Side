import React from 'react';
import {useLocation} from 'react-router-dom';

export const FourOFour = ({responsive}) =>{
    const {pathname} = useLocation();
    const style = {fontSize: '26px',color: 'white', marginLeft: '2vw', marginTop:'20vh'}
    return (
        <h3 style={style}> Page does not exist! 
            <p style={{fontSize: '26px', paddingTop: '20px', fontFamily: 'monospace', paddingBottom:'65vh'}}> 
                There is not route for <span style={{color:'red'}}>{pathname}</span>
            </p>
        </h3>)
}