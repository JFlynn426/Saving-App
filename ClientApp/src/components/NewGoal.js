import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import axios from 'axios'
export class NewGoal extends Component {
constructor(props) {
    super(props);
    this.state = {
        goalTitle: '',
        goalAmount: '',
        initialInvestment: ''
      };
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
        })
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
        <Input onChange={this.updateGoal}/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Initial Investment $:</InputGroupText>
        </InputGroupAddon>
        <Input  onChange={this.updateInvestment}/>
      </InputGroup>
            <Button color="primary" onClick={this.addToSavings}>New Goal</Button>
            </Row>
        </div>
    )
}
}