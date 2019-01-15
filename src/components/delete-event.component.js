import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class DeleteEvent extends Component {

	constructor(props) {
		super(props);
		this.state = {id:props.match.params.id, deleted:false};
	}

	componentDidMount() {
		axios.delete('http://localhost:4000/events/delete/'+this.state.id)
		.then(res => this.setState({deleted: true}))
		.catch(err => console.log(err));	
      	
	}

	render() {
		if(this.state.deleted) {
			return (
				<div>	
					<Redirect to='/' />
				</div>
			);
		} else {
			return (
				<div>
					<p>Please Wait...</p>
				</div>
			)
		}
		
	}
}