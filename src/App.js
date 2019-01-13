import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ListEvents from "./components/list-events.component.js";
import CreateEvent from "./components/create-event.component.js";
import UpdateEvent from "./components/update-event.component.js";
import DeleteEvent from "./components/delete-event.component.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <Link to="/" className="navbar-brand">Event Manager</Link>

            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Events</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Event</Link>
                </li>
              </ul>
            </div>

          </nav>

          <Route path="/" exact component={ListEvents} />
          <Route path="/create" component={CreateEvent} />
          <Route path="/update/:id" component={UpdateEvent} />
          <Route path="/delete/:id" component={DeleteEvent} />
        </div>
      </Router>
    );
  }
}

export default App;