import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Progress } from 'reactstrap';
import axios from 'axios'

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
      barClassName: "progbar" // used to add class to the inner progress-bar element
    }
    super(props);
    this.state = {
      goals: []
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
  
  render () {
    
    return (
      <div>
        {this.state.goals.map(goal => {
          return(
            <div>
            <div className="GoalDisplay">
            <h5>{goal.title}</h5>
            <h5>${goal.goal}/${goal.saved}</h5>
            <div className="buttons">
            <Button className="editgoal" color="primary">Edit Goal Name</Button>
            <Button color="primary">Edit Goal Amount</Button>
            </div>
            </div>
            <section className="progressbar">
            <div className="text-center">{Math.round(goal.saved/goal.goal*100)}%</div>
      <Progress value={goal.saved} max={goal.goal}/>
      </section>
            </div>
          )})}
        
      </div>
    );
  }
}
