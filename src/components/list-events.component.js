import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Event = props => (
	<tr>
		<td>{props.event.eventName}</td>
		<td>{props.event.eventDate}</td>
		<td>{props.event.eventTime}</td>
		<td>{props.event.eventFollowerCount}</td>
		<td><Link to={"/update/"+props.event._id} className="btn btn-primary">Edit</Link></td>
		<td><Link to={"/delete/"+props.event._id} className="btn btn-danger">Delete</Link></td>
	</tr>
);

export default class ListEvents extends Component {
	
	constructor(props) {
		super(props);
		this.state = {events: []};
	}

	eventList() {
		return this.state.events.map((currentEvent, index) => {
			return <Event event={currentEvent} key={index} />;
		});
	}

	static delete(id) {
		axios.get('http://localhost:4000/events/delete/'+id)
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}

	componentDidMount() {
		axios.get('http://localhost:4000/events')
			.then( res => {
				this.setState({events: res.data});
			}).catch( err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<h3>Events</h3>
				<table className="table table-stripped" style={{marginTop: 20}}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Date</th>
							<th>Time</th>
							<th>Followers</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.eventList()}
					</tbody>
				</table>
			</div>
		);
	}
}