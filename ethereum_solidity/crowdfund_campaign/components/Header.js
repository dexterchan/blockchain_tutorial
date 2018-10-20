import React,{Component} from "react";
import { Menu,Icon } from 'semantic-ui-react';
import {Link} from "../routes";
//Link object is a React component to render anchor tags in React component
//Link and Menu.Item css conflict with each other!!!
//Link and Menu.Item are mutually exclusive

export default()=>{
    return (
        //custom CSS should be in the javascript {} 
        <Menu style={{marginTop:"10px"}}>
        
            <Link  route="/">
                <a className="item">CrowdCoin</a>     
            </Link>

            <Menu.Menu position='right'>
                
                <Link  route="/">
                    <a className="item">Campaigns</a> 
                </Link>

                <Link route="/campaigns/new">
                    <a className="item"><Icon disabled name='add circle' /></a>
                </Link>
                
            </Menu.Menu>
        </Menu>
    );
};
//<Icon disabled name='add circle' />