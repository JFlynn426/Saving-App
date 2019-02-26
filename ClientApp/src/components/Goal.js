import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import { Progress } from 'reactstrap';


class Goal extends Component {
    constructor(props) {
      super(props);
      this.state ={
        isEditingName :false,
        isEditingAmount: false,
        isDeletingGoal: false,
        amount: '',
        name: '',
    }
    }
    toggleNameForm = () =>{
this.setState({
    isEditingName: !this.state.isEditingName
})
    }
    toggleAmountForm = () => {
        this.setState({
            isEditingAmount: !this.state.isEditingAmount
        })
    }
    toggleDeleteForm = () => {
      this.setState({
          isDeletingGoal: !this.state.isDeletingGoal
      })
  }
    updateName = (event) => {
        this.setState({
          name: event.target.value
        })
      }
    updateAmount = (event) => {
        this.setState({
          amount: event.target.value
        })
      }
      sendApiCallToUpdateName = () =>{
          this.props.updateName(this.props.goal.id, this.state.name)
      }
      sendApiCallToUpdateAmount = () =>{
        this.props.updateAmount(this.props.goal.id, this.state.amount)
    }
    sendApiCallToDeleteGoal = () => {
      this.props.removeGoal(this.props.goal.id)
    }
    render() {
        const goal = this.props.goal
        return (
            <div>
            <div className="GoalDisplay">
            <h5>{goal.title}</h5>
            <h5>${goal.goal}/${goal.saved}</h5>
            <div className="buttons">
            <Button color="primary" onClick={() => this.toggleNameForm()} id={`${goal.id}names`}>Edit Name</Button>
            <Button color="primary" onClick={() => this.toggleAmountForm()} id={`${goal.id}amounts`}>Edit Amount</Button>
            <Button color="danger" onClick={() => this.toggleDeleteForm()}>Delete</Button>
            </div>
            </div>
            {this.state.isEditingName &&  <FormGroup id={`${goal.id}name`}>
          <Input type="text" name="password"  placeholder="Goal Name" onChange={this.updateName}/>
          <Button color="primary" onClick={this.sendApiCallToUpdateName}>Update Goal Name</Button>
          </FormGroup> }
          {this.state.isEditingAmount &&  <FormGroup id={`${goal.id}amount`}>
          <Input type="number" name="password"  placeholder="Goal Amount" onChange={this.updateAmount}/>
          <Button color="primary" onClick={this.sendApiCallToUpdateAmount}>Update Goal Amount</Button>
        </FormGroup>}
        {this.state.isDeletingGoal && <div><h5>Are you sure you want to delete this goal?</h5>
        <Button color="danger" onClick={this.sendApiCallToDeleteGoal}>Delete</Button></div>}
            <section className="progressbar">
            <div className="text-center">{Math.round(goal.saved/goal.goal*100)}%</div>
            <Progress value={goal.saved} max={goal.goal}/>
            </section>
            </div>
        );
    }
}

export default Goal;
