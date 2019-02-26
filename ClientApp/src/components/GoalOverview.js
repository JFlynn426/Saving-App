import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import axios from 'axios'
import Goal from './Goal';
import Auth from './Auth/Auth.js';
const auth = new Auth();
export class GoalOverview extends Component {
  
  static displayName = GoalOverview.name;
  

  constructor (props) {
    super(props);
    this.state = {
      goals: [],
      authed: {
        isLoggedIn: false
    }
    }
  }
  componentDidMount = () => {
    if (auth.isAuthenticated()) {
      this.getGoals()
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

    getGoals = () => {
      axios.get('/api/GetGoals', {
        headers: {
            "Authorization": "Bearer " + auth.getAccessToken()
        }
    }).then(resp => {
        this.setState({
          goals: resp.data,
        })
      })
    }
    changeAmount = (goalid, amount) => {
      axios.put(`/api/UpdateGoal/${goalid}`,
      {"NewGoal": amount} , {
        headers: { "Authorization": "Bearer " + auth.getAccessToken() }
      }).then(resp => 
          this.setState({
            goals: resp.data
          }))
    }
    changeName = (goalid, name) => {
      axios.put(`/api/UpdateName/${goalid}`, {
        "NewName": name,
      }, {  headers: { "Authorization": "Bearer " + auth.getAccessToken() },}).then(resp => 
          this.setState({
            goals: resp.data
          }))
    }
    deleteGoal = (goalid) => {
      axios.delete(`/api/NewGoal/${goalid}`, {
        headers: { "Authorization": "Bearer " + auth.getAccessToken() }} ).then(resp => 
        this.setState({
          goals: resp.data
        }))
    }
  render () {
    
    return (
      <div>
        <h1>Savings Goals</h1>
        {this.state.goals.map(goal => {
          return(
            <Goal key={goal.id} goal={goal} removeGoal={this.deleteGoal} updateName={this.changeName} updateAmount={this.changeAmount}/>
          )})}  
      </div>
    );
  }
}
