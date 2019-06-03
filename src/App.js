import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import "./style.scss"
import { Container, Button } from 'react-bootstrap'
import Menubar from './components/Menubar'
import Home from './components/Home'
import About from './components/About'
import First from './components/First'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Menubar />
          <Container fluid className="mt-3">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route component={First} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
