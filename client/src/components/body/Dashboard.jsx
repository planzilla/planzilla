import React, { Component } from 'react';
import EventCard from './EventCard.jsx';
import { fetchPosts } from '../../actions/postActions.js';
import { connect } from 'react-redux';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    if (!this.props.events.data) {
      return 'loading';
    } else {
      return(
        <div>
          <div className="event-cards">
          {this.props.events.data.map((event, i) => {
            return(
                <EventCard title={event.title} location={event.location} key={i}/>
            )
          })}
          </div>
        </div>
      )
    }
  }
}
