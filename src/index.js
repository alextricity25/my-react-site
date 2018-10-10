import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './ridearranger.css';
import pdfResume from './resume.pdf';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";


class RideArrangerHome extends React.Component {
	render() {
		return (
			<div className='ridearrangerbase'>
			  <div className='formscontainer'>
			      <PeopleListForm 
			       selectboxtitle="Drivers:"/>
			      <PeopleListForm
			       selectboxtitle="Passengers:"/>
			  </div>
			  <div className='buttoncontainer'>
			    <button className='arrangebuttonstyle'>ARRANGERATE!</button>
			  </div>
			</div>
		       );
	}
}


class PeopleListForm extends React.Component {
	constructor(props) {
		super(props);
		this.myList = ["Alex", "Amy"];
		this.state = {
			people: this.myList.map((name) => 
						 <option>{name}</option>
				),
			inputValue: "Some Value"};

		this.handleChange = this.handleChange.bind(this);
	}

	handleAddDriverButtonClick(e) {
		this.myList.push(this.state.inputValue);
		this.setState({
			people: this.myList.map((name) =>
						 <option>{name}</option>
						)
		});
	}

	handleChange(e) {
		this.setState({
			people: this.myList.map((name) =>
						 <option>{name}</option>
						),
			inputValue: e.target.value
		});
	}
	render() {
		return (
			<div className='driversformcontainer'>
			  <div className='inputfieldcontainer'>
			    <form>
			      <input className='inputfieldstyle' type="text" value={this.state.inputValue} onChange={this.handleChange}/>
    			      <button onClick={this.handleAddDriverButtonClick.bind(this)} type="button">
    			      Add Person >>>
    			      </button>
			    </form>
			  </div>
			  <div className='listcontainer'>
			    <div className='selectboxtitlecontainer'>
			      {this.props.selectboxtitle}
			    </div>
			    <div className='selectboxcontainer'>
			      <select className='selectboxstyle' multiple>
			        {this.state.people}
			      </select>
			    </div>
			  </div>
			</div>
		       );
	}
}


class NamePlate extends React.Component {
	render() {
		return (
			<div className='inner'>
			  <p id='firstname' className='my-name'>Miguel</p>
			  <p
			    className='my-name'>
			    <span
			      className="middle-name"
			      id='middlename'>Alex
			    </span>
			    <span
			      id='lastname'
			      className='last-name'> Cantu
			    </span>
			  </p>
			  <SocialMediaButtonGroup />
			</div>
		       );
	}
}

class Router extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
			  <Switch>
			    <Route exact path="/" component={NamePlate} />
			    <Route path="/ridearranger" component={RideArrangerHome} />
			  </Switch>
			</BrowserRouter>
		       );
	}
}

class SocialMediaButtonGroup extends React.Component {
	render() {
		return (
			<div id='socialmediabuttons' className='my-life'>
			  <SocialMediaButton
			    className="fab fa-blogger-b"
			    name="Blog"
			    link="http://blog.miguelalexcantu.com"/>
			  <SocialMediaButton
			    className="fab fa-twitter"
			    name="Twitter"
			    link="https://twitter.com/MiguelAlexCantu"/>
			  <SocialMediaButton
			    className="fab fa-google-plus-g"
			    name="Google +"
			    link="https://plus.google.com/u/0/111967829169666843012"/>
			  <SocialMediaButton
			    className="fab fa-github"
			    name="Github"
			    link="https://github.com/alextricity25"/>
			  <SocialMediaButton
			    className="fab fa-linkedin-in"
			    name="LinkedIn"
			    link="https://www.linkedin.com/in/miguel-alex-cantu-57440856/"/>
			  <SocialMediaButton
			    className="fas fa-file-pdf"
			    name="Resume"
			    link={pdfResume}/>
			</div>
		       );
	}
}

class SocialMediaButton extends React.Component {
	handleMouseOver(e, socialMediaName) {
		document.getElementById('firstname').style.opacity = 0;
		document.getElementById('middlename').innerHTML = "Alex's ";
		document.getElementById('lastname').innerHTML = this.props.name;
	}
	handleMouseOut(e) {
		document.getElementById('firstname').style.opacity = 1;
		document.getElementById('middlename').innerHTML = "Alex ";
		document.getElementById('lastname').style.opacity = 1;
		document.getElementById('lastname').innerHTML = "Cantu";
	}
	render() {
		return (
			<a
			  onMouseOver={this.handleMouseOver.bind(this)}
			  onMouseOut={this.handleMouseOut.bind(this)}
			  href={this.props.link}
			  className={this.props.className}>
			</a>
		       )
	}
}


ReactDOM.render(<Router/>, document.getElementById('root'));
