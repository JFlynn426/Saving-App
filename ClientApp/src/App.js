import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { EditSavings } from './components/EditSavings';
import { GoalOverview } from './components/GoalOverview';
import { NewGoal } from './components/NewGoal'
import Auth from './components/Auth/Auth.js';
import Callback from './components/Callback'
import  Login  from './components/Login'
const auth = new Auth();
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path= '/' component = {Login} />
        <Route path='/EditSavings' component={EditSavings} />
        <Route path= '/NewGoal' component={NewGoal} />
        <Route path='/GoalOverview' component={GoalOverview} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </Layout>
    );
  }
}
