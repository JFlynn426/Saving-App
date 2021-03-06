import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import classnames from 'classnames';
import Auth from './Auth/Auth.js';
import axios from 'axios'
const auth = new Auth();
export class EditSavings extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '',
      goals: [],
      addMoney: '',
      subtractMoney: '',
      refreshedSaved: false,
      authed: {
        isLoggedIn: false,
      }
  }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  static displayName = EditSavings.name;
  componentDidMount = () => {
    if (auth.isAuthenticated()) {
      this.getInitialGoals()
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
  getInitialGoals = () => {
    axios.get(`/api/GetGoals/${this.state.activeTab}`, {
      headers: { "Authorization": "Bearer " + auth.getAccessToken() } }).then(resp => {
      console.log({ resp })
      this.setState({
        goals: resp.data,
        activeTab: `${resp.data[0].id}`
      })
    })
  }
  getGoals = () => {
    axios.get('/api/GetGoals').then(resp => {
      this.setState({
        goals: resp.data,
      })
    })
  }
 
  addToSavings = () => {
    axios.put(`/api/AddToSaved/${this.state.activeTab}`, {
      "AddSaved": this.state.addMoney
    } , {
      headers: { "Authorization": "Bearer " + auth.getAccessToken() }})
      .then(resp => {
        this.setState({
          goals: resp.data,
        })
      })
  }
  withdrawFromSavings = () => {
    axios.put(`/api/RemoveFromSaved/${this.state.activeTab}`, {
      "RemoveSaved": this.state.subtractMoney
    } , {
      headers: { "Authorization": "Bearer " + auth.getAccessToken() }})
      .then(resp => {
        this.setState({
          goals: resp.data,
        })
      })
  }
  updateToSavings = (event) => {
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
                </Col>
                </Row>
            </TabPane>
            </TabContent>
                )
        })}
                <Row>
                <InputGroup>
                <InputGroupAddon addonType="prepend">Add To Savings $:</InputGroupAddon>
                <Input type="number" step="1"  onChange={this.updateToSavings}></Input>
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  </InputGroup>
                  <Button color="primary" onClick={this.addToSavings}>Deposit</Button>
                  <InputGroup>
                <InputGroupAddon addonType="prepend">Remove From Savings $:</InputGroupAddon>
                <Input type="number" step="1"  onChange={this.updateToWithdraw}></Input>
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  </InputGroup>
                  <Button color="primary" onClick={this.withdrawFromSavings}>Withdraw</Button>
                   
                  </Row>
                
             
          
      </div>
    );
  }
}
