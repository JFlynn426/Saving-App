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
      goals: []
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
    this.getGoals()
  }
  getGoals = () => {
    axios.get('/api/GetGoals').then(resp => {
      console.log({ resp })
      this.setState({
        goals: resp.data,
        activeTab: `${resp.data[0].id}`
      })
      console.log(this.state.activeTab)
    })
  }
  render () {
    return (
      <div>
        <Nav tabs>
        {this.state.goals.map(goal => {
          return(
            <NavItem>
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
        <TabContent activeTab={this.state.activeTab}>
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
                <Input placeholder="Amount" type="number" step="1" />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  </InputGroup>
                  <Button>Deposit</Button>
                  <InputGroup>
                <InputGroupAddon addonType="prepend">Remove From Savings $:</InputGroupAddon>
                <Input placeholder="Amount" type="number" step="1" />
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
