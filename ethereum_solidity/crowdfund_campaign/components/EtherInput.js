import React,{Component} from 'react';
import web3 from '../ethereum/web3';

import {Input,Message,Dropdown}  from 'semantic-ui-react'; 

class EtherInput extends Component {
    state={
        statusMessage:"",
        value:""
    };

    checkValue = (event)=>{
        const r = event.target.value;
        console.log(r);
        let parseValue=Number.parseFloat(r);
        
        if (Number.isNaN(parseValue)) {
            
            this.setState({value:""});
            this.setState({statusMessage:"numeric value"});
            return;
        }
        if(r.endsWith(".") || r.endsWith("0")) {
            parseValue=r;
        }else{
            parseValue=parseValue.toString();
        }
        this.setState({value:parseValue})
        this.setState({statusMessage:""})
    };

    render(){
        console.log(this.state.statusMessage);
        return (
            <div error={this.state.statusMessage.length>0}>
            <Input  
                    label={<Dropdown defaultValue='ether' options={[
                        { key: 'ether', text: 'ether', value: 'ether' },
                        { key: 'wei', text: 'wei', value: 'wei' }
                      ]} />}
                    labelPosition='right'
                    placeholder='numeric value' 
                    value={this.state.value}
                    onChange={this.checkValue}
            />
            <Message error header="oops!" content={this.state.statusMessage} />
            </div>
        );
    }
};

export default EtherInput;