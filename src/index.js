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
			       selectboxtitle="Drivers"/>
			      <PeopleListForm
			       selectboxtitle="Passengers"/>
			  </div>
			  <div className='buttoncontainer'>
			    <ArrangeButton />
			  </div>
			</div>
		       );
	}
}

class ArrangeButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleArrangeButtonClick = this.handleArrangeButtonClick.bind(this);
	}

	getTreeOutput(data) {
		var outputString = "";
		Object.keys(data).forEach(function(key) {
			console.log(key, data[key]);
			outputString += String(key) + "\n";
			for(var i = 0; i < data[key].length; i++){
				outputString += "    " + String(data[key][i]) + "\n";
			}
		});
		return outputString;
	}

	handleArrangeButtonClick(e) {
		var passengers = Array.from(document.getElementById("Passengersselectbox").options).map((option) => {
			return "+" + option.text
		});
		var drivers = Array.from(document.getElementById("Driversselectbox").options).map((option) => {
			return ">" + option.text
		});
		fetch("http://35.226.83.8:8080/rides/", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: "#rides " + drivers.join(" ") + passengers.join(" ")
			})
		}).then(results => {
			return results.json();
		}).then(data => {
			console.log(data);
			alert(this.getTreeOutput(data['same']));
			//alert(JSON.stringify(data['same'], null, 2));
		})
	}

	render() {
		return (
			<button onClick={this.handleArrangeButtonClick} className='arrangebuttonstyle'>ARRANGERATE!</button>
		       )
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
		this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
	}

	handleAddDriverButtonClick(e) {
		// If inputValue has commas, then run through the comma
		// delimited list and add each token to the list
		if(this.state.inputValue.includes(',')){
			var listOfNames = this.state.inputValue.split(",");
			for(var i = 0; i < listOfNames.length; i++){
				this.myList.push(listOfNames[i].trim());
			}
		} else {
			this.myList.push(this.state.inputValue);
		}
		// Set the state to the new list
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

	handleRemoveButtonClick(e) {
		// How do I know what option is selected?
		var removeList = this.getSelectValues(document.getElementById(this.props.selectboxtitle + 'selectbox'));
		for(var i = 0; i < removeList.length; i++) {
			for(var k = this.myList.length - 1; k >= 0; k--) {
				if(removeList[i] == this.myList[k]) {
					this.myList.splice(k, 1);
				}
			}
		}
		this.setState({
			people: this.myList.map((name) =>
						 <option>{name}</option>
						)
		});

	}

	getSelectValues(select) {
		var result = [];
		var options = select && select.options;
		var opt;
		for(var i=0, iLen=options.length; i<iLen; i++) {
			opt = options[i];
			if (opt.selected) {
				result.push(opt.value || opt.text);
			}
		}
		return result;
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
			      <select id={this.props.selectboxtitle + 'selectbox'} className='selectboxstyle' multiple>
			        {this.state.people}
			      </select>
			    </div>
			    <div className='removebuttoncontainer'>
			      <button onClick={this.handleRemoveButtonClick}>Remove</button>
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
