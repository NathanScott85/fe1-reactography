import React, { Component } from 'react';
import Events from './components/Events'
import CategorySelector from './components/CategorySelector'
import Search from './components/Search'
import Axios from '../node_modules/axios';


class App extends Component {
  state = {
    events: [],
    search: '',
    result: ''
  }

  render() {
    return (
      <main>
        <h1>EVENTS</h1>
        <input placeholder="Enter City" value={this.state.search} onChange={this.onInputChange} />
        <button onClick={this.onSubmit} > SUBMIT </button>
        <br />
        <CategorySelector />

        {/* filter below  */}
        {this.state.events.length && < Events events={this.state.events} />}
      </main>
    )
  }

  onInputChange = event => {
    this.setState({
      search: event.target.value
    })
  }

  onSubmit = () => {
    this.setState({
      result: this.state.search, search: ''
    })
  }

  componentDidMount = () => {
    Axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=5&countryCode=GB&apikey=oFolx3SJL91d7LQG0WsmPzXZKIGWXwee`)
      .then(result => {
        //manipulate the data with a reduce into a new array of objects 
        //pass into the state

        const data = [...result.data._embedded.events]
        const eventData = data.reduce((acc, val, i, array) => {
          acc[i] = {
            name: val.name,
            genre: val.classifications[0].segment.name,
            venue: val._embedded.venues[0].name
          }
          return acc;
        }, [])
        this.setState({
          events: eventData
        })
      })
      .catch('failed')
  }
}

export default App;
