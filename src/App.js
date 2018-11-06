import React, { Component } from 'react';
import Events from './components/Events'
import CategorySelector from './components/CategorySelector'
import Axios from '../node_modules/axios';

class App extends Component {
  state = {
    events: []
  }

  render() {
    return (
      <main>
        <h1>EVENTS</h1>
        < CategorySelector />
        {this.state.events.length && < Events events={this.state.events} />}
      </main>
    )
  }

  componentDidMount = () => {
    Axios.get('https://app.ticketmaster.com/discovery/v2/events.json?city=Leeds&apikey=oFolx3SJL91d7LQG0WsmPzXZKIGWXwee')
      .then(result => {
        console.log(result)
        // console.log(Object.keys(res.data))
        // console.log(result.data._embedded)
        this.setState({
          // events: result.data._embedded.events
          events: result.data
        })
      })
      .catch('failed')
  }



}

export default App;
