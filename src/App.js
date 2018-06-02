import React, { Component } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';

import Layout from './components/Layout';
import Main from './components/Main';
import Campaign from './components/Campaign';
import NewCampaign from './components/NewCampaign';
import Requests from './components/Requests';
import NewRequest from './components/NewRequest';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/campaigns/new" exact component={NewCampaign}/>
          <Route path="/campaigns/:address" exact component={Campaign}/>
          <Route path="/campaigns/:address/requests" exact component={Requests}/>
          <Route path="/campaigns/:address/requests/new" component={NewRequest}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
