import React,{Component} from "react";
import { Menu,Icon } from 'semantic-ui-react';

export default()=>{
    return (
        //custom CSS should be in the javascript {} 
        <Menu style={{marginTop:"10px"}}>
            <Menu.Item >
                CrowdCoin
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item>
                <Icon disabled name='add circle' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};