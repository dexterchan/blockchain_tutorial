import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import web3 from './web3';
import lottery from './lottery';


class App extends Component {
  /*
  constructor(props){
    super(props);
    this.state={manager:""};//initialize state
  }*/
  //replaced by
  state={//initialize state
    manager:"" ,
    players:[],
    balance:"" ,//must be string to avoid conversion error
    betValue:"",
    message:""
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);


    this.setState({manager:manager,players,balance});
  }

  //with this syntax, no need to do binding in previous version of Babel
  onSubmit=async(event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message:"Waiting on transaction success..."});
    await lottery.methods.enter().send(
      {
        from: accounts[0],
        value:web3.utils.toWei(this.state.betValue,"ether")
      }
    );
    this.setState({message:"transaction completed"});
  };

  onClick = async(event)=>{
    const accounts = await web3.eth.getAccounts();

    this.setState({message:"Waiting on transaction success...."});
    await lottery.methods.pickWinner().send(
      {
        from:accounts[0]
      }
    );
    this.setState({message:"the winner has been picked!"});
  }


  render() {
    console.log(web3.version);
    web3.eth.getAccounts().then(console.log);//legacy callback!!!

    return (
      <div>
        <h2>Lottery Contract</h2>
        <h5>Contract address:{lottery.options.address}</h5>
        <p>This contract manager: {this.state.manager} <br/>
        There are currently {this.state.players.length} people entered  <br/>
        competing to win {web3.utils.fromWei(this.state.balance,"ether")} of ether!
        </p>
        <hr/>
        <form onSubmit={this.onSubmit} >
          <h4>Want to try your luck</h4>
          <div>
            <label> Amount of ether to enter</label>
            <input value={this.state.betValue}
            onChange={(event)=>this.setState({betValue:event.target.value})}/>

          </div>
          <button>Enter</button>
        </form>
        <hr/>
        <h4> Ready to pick a winner</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
