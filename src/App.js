import React, {Component} from 'react';
import CardList from './CardList';
import Searchbox from './Searchbox';
import './App.css';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';


class App extends Component {
	constructor () {
		super()
		this.state = {
			robot: [],
			searchfield : ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robot:users}));
	}

	onSearchChange = (event) => {
		this.setState({searchfield : event.target.value})
		
	}
	render () {
		const filteredRobots = this.state.robot.filter(robo => {
			return robo.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if (this.state.robot.length === 0) {
			return <h1> Loading </h1>
		} else {
			return (
				<div className = 'tc'>
					<h1 className= "f1">Robofriends</h1>
					<Searchbox searchChange= {this.onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots = { filteredRobots } />
						</ErrorBoundary>
					</Scroll>	
				</div>
			
			);
		}
		
	}
	
}

export default App;