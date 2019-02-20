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
      activeTab: '1'
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

  }

  render () {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Saving Goal 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Savings Goal 2
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <h1>College Fund</h1>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <div className="goal">
                <section>
              <h2>Savings Goal</h2>
              <h2>$500</h2>
              </section>
              <section>
                <h2>Amount Saved</h2>
                <h2>$250</h2>
              </section>
              </div>
              <InputGroup>
              <h4></h4>
              <InputGroupAddon addonType="prepend">Add To Savings $:</InputGroupAddon>
              <Input placeholder="Amount" type="number" step="1" />
              <InputGroupAddon addonType="append">.00</InputGroupAddon>
                </InputGroup>
                <Button>Deposit</Button>
                <InputGroup>
              <h4></h4>
              <InputGroupAddon addonType="prepend">Remove From Savings $:</InputGroupAddon>
              <Input placeholder="Amount" type="number" step="1" />
              <InputGroupAddon addonType="append">.00</InputGroupAddon>
                </InputGroup>
                <Button>Withdraw</Button> 
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
