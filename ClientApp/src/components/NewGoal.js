import React, { Component } from 'react';
import { Button, Row, } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import axios from 'axios'
import Auth from './Auth/Auth.js';
const auth = new Auth();
export class NewGoal extends Component {
constructor(props) {
    super(props);
    this.state = {
        goalTitle: '',
        goalAmount: '',
        initialInvestment: '',
        authed: {
          isLoggedIn: false
        }
      };
    }
    componentDidMount = () => {
      if (auth.isAuthenticated()) {
        auth.getProfile((err, profile) => {
            this.setState({
                authed: {
                    isLoggedIn: true,
                }
            })
        })
    } else {
      window.location.href = "/"
  
    }
  }
    updateTitle = (event) => {
        this.setState({
            goalTitle: event.target.value
        })
    }
    updateGoal = (event) => {
        this.setState({
            goalAmount: event.target.value
        })
    }
    updateInvestment = (event) => {
        this.setState({
            initialInvestment: event.target.value
        })
    }
    addToSavings = () => {
        axios.post(`/api/NewGoal`, {
          "Title": this.state.goalTitle,
          "Goal": this.state.goalAmount,
          "Saved": this.state.initialInvestment
        }, {
          headers: { "Authorization": "Bearer " + auth.getAccessToken() }})
          .then(window.location.href= "/EditSavings")
        }
render () {
    return (
        <div>
            <Row>
            <h1>New Goal</h1>
            <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Goal Title:</InputGroupText>
        </InputGroupAddon>
        <Input onChange={this.updateTitle}/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Goal Amount $:</InputGroupText>
        </InputGroupAddon>
        <Input type="number" onChange={this.updateGoal}/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Initial Investment $:</InputGroupText>
        </InputGroupAddon>
        <Input type="number" onChange={this.updateInvestment}/>
      </InputGroup>
            <Button color="primary" onClick={this.addToSavings}>New Goal</Button>
            </Row>
        </div>
    )
}
}