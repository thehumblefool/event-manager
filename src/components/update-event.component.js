import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

export default class UpdateEvent extends Component {
	
	constructor(props) {
		super(props);

		this.onChangeEventName = this.onChangeEventName.bind(this);
		this.onChangeEventDate = this.onChangeEventDate.bind(this);
		this.onChangeEventTime = this.onChangeEventTime.bind(this);
		this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
		this.onChangeEventFollowerCount = this.onChangeEventFollowerCount.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			_id: props.match.params.id,
			eventName: '',
			eventDate: null,
			eventTime: null,
			eventDescription: '',
			eventFollowerCount: '',
			updated: false
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/events/'+this.state._id)
		.then(res => {
			this.setState({eventName: res.data.eventName})
			this.setState({eventDate: new Date(res.data.eventDate)});
			this.setState({eventTime: res.data.eventTime});
			this.setState({eventDescription: res.data.eventDescription});
			this.setState({eventFollowerCount: res.data.eventFollowerCount});
		}).catch(err => { console.log('Unable to load data: ' + err);});	
      	
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
		console.log(`Date: ${this.state.eventDate.toISOString()}`);
		console.log(`Time: ${this.state.eventTime}`);
		console.log(`Description: ${this.state.eventDescription}`);
		console.log(`Follower Count: ${this.state.eventFollowerCount}`);

		const newEvent = {
			eventName: this.state.eventName,
			eventDate: this.state.eventDate.toISOString(),
			eventTime: this.state.eventTime,
			eventDescription: this.state.eventDescription,
			eventFollowerCount: this.state.eventFollowerCount,
		}

		axios.put('http://localhost:4000/events/update/'+this.state._id, newEvent)
		.then(res => 
			{ 
				console.log(res.data); 
				alert('Updated');
				this.setState({
						eventName: res.data.eventName,
						eventDate: new Date(res.data.eventDate),
						eventTime: res.data.eventTime,
						eventDescription: res.data.eventDescription,
						eventFollowerCount: res.data.eventFollowerCount,
						updated:true
				});
			});
	}
	
	render() {
		return (
            <div style={{marginTop: 10}}>
                <h3>Update Event</h3>
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
                        <label>Date: </label> <br/>
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
                        <input type="submit" value="Update Event" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}