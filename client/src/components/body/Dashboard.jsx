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
    if (!this.props.events) {
      return 'loading';
    } else {
      return(
        <div>
          <div className="event-cards">
          {this.props.events.map((event, i) => {
            return(
                <EventCard 
                  event={event}
                  title={event.title} 
                  location={event.location} 
                  id={event.id} 
                  key={i} 
                  handleClickEventTitle={this.props.handleClickEventTitle}  
                />
            )
          })}
          </div>
        </div>
      )
    }
  }
}
