import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { EditSavings } from './components/EditSavings';
import { FetchData } from './components/FetchData';
import { GoalOverview } from './components/GoalOverview';
import { NewGoal } from './components/NewGoal'
import { Login } from './components/Login'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path= '/login' component = {Login} />
        <Route path='/EditSavings' component={EditSavings} />
        <Route path= '/NewGoal' component={NewGoal} />
        <Route path='/GoalOverview' component={GoalOverview} />
      </Layout>
    );
  }
}
