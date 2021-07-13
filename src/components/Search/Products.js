import React from 'react';
import {Data} from './Data';
import './Search.css';

export const Products = () => {
    return (
        <ul className="product-container">
            
            {Data.map((val,key) =>{
                
                return <li className='product-item' key={key}> 
                        <span>{val.id}</span> 
                    </li>
            })}
            
        </ul>
    )
}