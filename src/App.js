import React, { Component } from "react";
import Events from "./components/Events";
import CategorySelector from "./components/CategorySelector";
import Search from "./components/Search";
import Axios from "../node_modules/axios";

class App extends Component {
  state = {
    events: [],
    search: "",
    result: ""
  };

  render() {
    return (
      <main>
        <h1>EVENTS</h1>
        <input
          placeholder="Enter City"
          value={this.state.search}
          onChange={this.onInputChange}
        />
        <button onClick={this.onSubmit}> SUBMIT </button>
        <br />
        <CategorySelector />

        {/* filter below  */}
        {this.state.events.length && <Events events={this.state.events} />}
      </main>
    );
  }

  onInputChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  onSubmit = () => {
    this.setState({
      result: this.state.search,
      search: ""
    });
  };

  componentDidMount = () => {
    Axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=1&countryCode=GB&apikey=oFolx3SJL91d7LQG0WsmPzXZKIGWXwee`
    )
      .then(result => {
        //manipulate the data with a reduce into a new array of objects
        //pass into the state

        const data = [...result.data._embedded.events];
        const eventData = data.reduce((acc, val, i) => {
          // console.log(val.images[0].url, "this gets the images url");

          // console.log(
          //   val._embedded.attractions[0].name,
          //   "this is the name its inside _embedded"
          // );

          // console.log(
          //   val.classifications[0].segment.name,
          //   "what is this? Type? such as music"
          // );
          // console.log(
          //   val.classifications[0].subGenre.name,
          //   "This is the subGenre"
          // );
          // console.log(val.name, "This is the actual title of the event");

          // console.log(val.classifications[0].genre.name, "this is the genre");

          // console.log(val.priceRanges[0].min, "min price range");

          // console.log(val.priceRanges[0].max, "max price range");
          acc[i] = {
            name: val.name,
            genre: val.classifications[0].segment.name,
            venue: val._embedded.venues[0].name
          };
          return acc;
        }, []);
        this.setState({
          events: eventData
        });
      })
      .catch("failed");
  };
}

export default App;
