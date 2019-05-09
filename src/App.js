import React, { Component } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Navigator from './components/Navigation';
import Calendar from './components/Calendar';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">    
        <BrowserRouter>
          <div id='nav'>
            <Navigator/>
              <Switch>
                <Route exact path="/" component={CustomerList}/>
                <Route path="/CustomerList" component={CustomerList}/>
                <Route path ="/TrainingList" component={TrainingList}/>
                <Route path ="/Calendar" component={Calendar}/>
              </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;