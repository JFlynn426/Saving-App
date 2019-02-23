import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios'

export class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '',
      goals: [],
      addMoney: [],
      subtractMoney: []
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  static displayName = Home.name;
  componentDidMount = () => {
    this.getInitialGoals()
  }
  getInitialGoals = () => {
    axios.get(`/api/GetGoals/${this.state.activeTab}`).then(resp => {
      console.log({ resp })
      this.setState({
        goals: resp.data,
        activeTab: `${resp.data[0].id}`
      })
    })
  }
  getGoals = () => {
    axios.get('/api/GetGoals').then(resp => {
      console.log({ resp })
      this.setState({
        goals: resp.data,
      })
    })
  }
  addToSavings = () => {
    axios.put(`/api/UpdateSaved/${this.state.activeTab}`, {
      "NewGoal": `${this.state.goals[this.state.activeTab].goal+this.state.addMoney}`})
      .then(this.getGoals())
  }
  updateToSaved = (event) => {
    this.setState({
      addMoney: event.target.value
    })
  }
  updateToWithdraw = (event) => {
    this.setState({
      subtractMoney: event.target.value
    })
  }
  render () {
    return (
      <div>
        <Nav tabs>
        {this.state.goals.map(goal => {
          return(
            <NavItem key={goal.id}>
            <NavLink
              className={classnames({ active: this.state.activeTab === `${goal.id}` })}
              onClick={() => { this.toggle(`${goal.id}`); }}
              >{goal.title}
            </NavLink>
          </NavItem>
          )
        })}
        </Nav>
         {this.state.goals.map(goal => {
             return (
        <TabContent activeTab={this.state.activeTab} key={goal.id}>
           <TabPane tabId= {`${goal.id}`} >
            <h1>{goal.title}</h1>
              <Row>
                <Col sm="12">
                <div className="goal">
                  <section>
                <h2>Savings Goal</h2>
                <h2>${goal.goal}</h2>
                </section>
                <section>
                  <h2>Amount Saved</h2>
                  <h2>${goal.saved}</h2>
                </section>
                </div>
                <InputGroup>
                <InputGroupAddon addonType="prepend">Add To Savings $:</InputGroupAddon>
                <Input type="number" step="1"  onChange={this.updateToSaved}></Input>
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  </InputGroup>
                  <Button>Deposit</Button>
                  <InputGroup>
                <InputGroupAddon addonType="prepend">Remove From Savings $:</InputGroupAddon>
                <Input type="number" step="1"  onChange={this.updateToWithdraw}></Input>
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  </InputGroup>
                  <Button>Withdraw</Button> 
                </Col>
              </Row>
            </TabPane>
            </TabContent>
          )
        })}
      </div>
    );
  }
}
