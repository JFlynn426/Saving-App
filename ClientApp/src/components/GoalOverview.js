import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Progress } from 'reactstrap';
import axios from 'axios'
import Goal from './Goal';

export class GoalOverview extends Component {
  
  static displayName = GoalOverview.name;
  

  constructor (props) {
    Progress.propTypes = {
      multi: false,
      bar: false,
      tag: "",
      animated: false,
      striped: false,
      color: "blue",
      className: "progress",
      barClassName: "progbar"
    }
    super(props);
    this.state = {
      goals: [],
    }
  }
  componentDidMount = () => {
    this.getGoals()
  }
    getGoals = () => {
      axios.get('/api/GetGoals').then(resp => {
        this.setState({
          goals: resp.data,
        })
      })
    }
    changeAmount = (goalid, amount) => {
      axios.put(`/api/UpdateGoal/${goalid}`, {
        "NewGoal": amount,
      }).then(resp => 
          this.setState({
            goals: resp.data
          }))
    }
    changeName = (goalid, name) => {
      axios.put(`/api/UpdateName/${goalid}`, {
        "NewName": name,
      }).then(resp => 
          this.setState({
            goals: resp.data
          }))
    }
  render () {
    
    return (
      <div>
        <h1>Savings Goals</h1>
        {this.state.goals.map(goal => {
          console.log({goal})
          return(
            <Goal goal={goal} updateName={this.changeName} updateAmount={this.changeAmount}/>
          )})}  
      </div>
    );
  }
}
