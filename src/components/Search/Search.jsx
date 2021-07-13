import React, {useEffect, useState} from 'react';
import {Data} from './Data.js';
import {Products} from './Products'
import {useRouteMatch} from 'react-router-dom';
import './Search.css'

function Search({responsive}){
    
    const [searchTerm, setSearchTerm] = React.useState('');
    const [classChanger, setClassChanger] = React.useState(true);

    const checkWidth = () =>{

        if (window.innerWidth <= responsive.width) {
            setClassChanger(false)
        } else {
            setClassChanger(true)
        }
    }

    window.addEventListener('resize', checkWidth)

    React.useEffect(()=>{
        checkWidth()
    },[])

    const basicStyle = {
        heigh: '50%',
        display: 'flex',
        backgroundColor: '1c2237',
        color: '#FFF',
        marginLeft: '20px',
        marginTop: '3px'
    }
    const basicStyleSmall = {

        backgroundColor: '1c2237',
        color: '#FFF',
        height: '45px',
        width: '45px'
    }
    const imgStyle = {
        width:'45px',
        height:'45px',
        marginRight:'10px'                                 
    }
    const imgStyleSmall = {
        width:'35px',
        height:'35px',
        marginLeft:'20px',
        marginTop: '0px',
        marginBottom: '0px'                                  
    }
    // const taghi = useRouteMatch();
    return(

        <div className="search-content">
            <input className={classChanger ? "search-bar" : "search-bar-small"}
                type="text" 
                placeholder="Search..." 
                onChange={e => {setSearchTerm(e.target.value)}}>
            </input>
            {searchTerm? <span style={basicStyle}>Results: </span> : "" }
            {searchTerm ? Data.filter(val => {
                return val.email.toLowerCase().includes(searchTerm.toLowerCase())
            }).map((key,val)=>{

                return (
                    <div style={classChanger ? basicStyle : basicStyleSmall}
                         key={val}>
                        <ul
                            style={{listStyleType:'none'}}>
                            <li className="search-res" key={val}> 
                                
                                <img src='https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg'
                                    alt='img'
                                    style={classChanger ? imgStyle : imgStyleSmall}
                                />
                                <span className={classChanger ? "search-para" : "search-para-small"}
                                    style={{float:'right'}}
                                > {key.email} </span>
                                <div className={classChanger ? "hover-search" : "hover-search-small"}/>
                            </li>
                        </ul>
                    </div>
                )
            }) : "" }

        </div>
    )
}

export default Search