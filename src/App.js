import React, { Component } from "react";
import Events from "./components/Events";
import CategorySelector from "./components/CategorySelector";
import Axios from "../node_modules/axios";
import Chart from "./components/Chart";
import "./components/css/app.css";
class App extends Component {
  state = {
    events: [],
    search: "",
    result: "",
    category: ""
  };

  render() {
    return (
      <main>
        <div class="grid">
          <h1 className="header">EVENTS</h1>

          <div className="input">
            <input
              placeholder="Enter City"
              value={this.state.search}
              onChange={this.onInputChange}
            />
            <br />
            <button onClick={this.onSubmit}> SUBMIT </button>
          </div>
          <div className="selector">
            <br />
            <CategorySelector onChange={this.onChange} />
          </div>
          <div>
            <Chart
              events={this.state.events.filter(
                event => event.city === this.state.result
              )}
            />
          </div>

          <div className="info">
            {this.state.events.length && (
              <Events
                events={this.state.events.filter(
                  event => event.city === this.state.result
                )}
              />
            )}
          </div>
        </div>

        {/* filter below  */}
      </main>
    );
  }

  onChange = event => {
    console.log(event.target.value, "here");
    this.setState({
      category: event.target.value
    });
  };

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
      `https://app.ticketmaster.com/discovery/v2/events.json?size=200&countryCode=GB&apikey=oFolx3SJL91d7LQG0WsmPzXZKIGWXwee`
    )
      .then(result => {
        const data = [...result.data._embedded.events];
        const eventData = data.reduce((acc, val, i) => {
          acc[i] = {
            name: val.name,
            genre: val.classifications[0].segment.name,
            venue: val._embedded.venues[0].name,
            image: val.images[0].url,
            price: val.priceRanges === undefined ? 0 : val.priceRanges[0].min,
            info:
              val.info === undefined ? "No information available" : val.info,
            dateAndTime: {
              date: val.dates.start.localDate,
              time:
                val.dates.start.localTime === undefined
                  ? "No time available"
                  : val.dates.start.localTime
            },
            city: val._embedded.venues[0].city.name
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

/*
Clean up request per Pauls suggestion

componentDidMount() {
  this.getData();
}

getData = async () => {
  try {
    const data = await axois.get('https://app.ticketmaster.com/discovery/v2/events.json?size=5&countryCode=GB&apikey=oFolx3SJL91d7LQG0WsmPzXZKIGWXwee');
    const event = [...result.data._embedded.events]

    ...reduce...

    this.setState({
      events: allEvents
    })
  } catch (err);
}


TO DO: 

1. Define a function to fetch the data
2. set the state in component did mount

3. Define a function in here to filter the event object with the value of the result in state
4. Pass the result of the function down to the events

CATEGORY OPTIONS - genre, venue, price 
RETURNED VALUE - name, image, info, date and time, price 


3. Map over the result inside of the Events component and display





*/
