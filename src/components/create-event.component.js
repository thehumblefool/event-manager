import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreateEvent extends Component {
	
	constructor(props) {
		super(props);

		this.onChangeEventName = this.onChangeEventName.bind(this);
		this.onChangeEventDate = this.onChangeEventDate.bind(this);
		this.onChangeEventTime = this.onChangeEventTime.bind(this);
		this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
		this.onChangeEventFollowerCount = this.onChangeEventFollowerCount.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			eventName: '',
			eventDate: null,
			eventTime: null,
			eventDescription: '',
			eventFollowerCount: '',
		}
	}

	onChangeEventName(e) {
		this.setState({
			eventName: e.target.value,
		});
	}

	onChangeEventDate(date) {
		this.setState({
			eventDate: date
		});
	}

	onChangeEventTime(time) {
		this.setState({
			eventTime: time
		});
	}

	onChangeEventDescription(e) {
		this.setState({
			eventDescription: e.target.value
		});
	}

	onChangeEventFollowerCount(e) {
		this.setState({
			eventFollowerCount: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		console.log(`Form Submitted`);
		console.log(`Name: ${this.state.eventName}`);
		console.log(`Date: ${this.state.eventDate}`);
		console.log(`Time: ${this.state.eventTime}`);
		console.log(`Description: ${this.state.eventDescription}`);
		console.log(`Follower Count: ${this.state.eventFollowerCount}`);

		const newEvent = {
			eventName: this.state.eventName,
			eventDate: this.state.eventDate.getFullYear() + "-" + (this.state.eventDate.getMonth()+1) + "-" + this.state.eventDate.getDate(),
			eventTime: this.state.eventTime,
			eventDescription: this.state.eventDescription,
			eventFollowerCount: this.state.eventFollowerCount,
		}

		axios.post('http://localhost:4000/events/add', newEvent)
		.then(res => console.log(res.data));

		this.setState({
			eventName: '',
			eventDate: null,
			eventTime: null,
			eventDescription: '',
			eventFollowerCount: '',
		})

	}	

	render() {
		return (
            <div style={{marginTop: 10}}>
                <h3>Create New Event</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.eventName}
                                onChange={this.onChangeEventName}
                                />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker 
                                className="form-control"
                                selected={this.state.eventDate}
                                onChange={this.onChangeEventDate}
                                />
                    </div>

                    <div className="form-group">
                        <label>Time: </label>
                        <TimePicker 
                                className="form-control"
                                value={this.state.eventTime}
                                onChange={this.onChangeEventTime}
                                />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.eventDescription}
                                onChange={this.onChangeEventDescription}
                                />
                    </div>

                    <div className="form-group">
                        <label>Follwers Count: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.eventFollowerCount}
                                onChange={this.onChangeEventFollowerCount}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Event" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}