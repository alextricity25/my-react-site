import React from 'react';
import './index.css';
import './ridearranger.css';


export class RideArrangerHome extends React.Component {
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
			outputString += String(key) + "\n";
			for(var i = 0; i < data[key].length; i++){
				outputString += "    " + String(data[key][i]) + "\n";
			}
		});
		return outputString;
	}

	handleArrangeButtonClick(e) {
		var passengers = Array.from(document.getElementById("Passengersselectbox").getElementsByTagName("li")).map((option) => {
			return "+" + option.textContent
		});
		var drivers = Array.from(document.getElementById("Driversselectbox").getElementsByTagName("li")).map((option) => {
			return ">" + option.textContent
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

class PersonName extends React.Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick(e) {
		if(document.getElementById(this.props.name + this.props.role + "entry").style.backgroundColor === "red") {
			
			document.getElementById(this.props.name + this.props.role + "entry").style.backgroundColor = "#f000";
		} else {
			document.getElementById(this.props.name + this.props.role + "entry").style.backgroundColor = "red";
		}
	}

	render() {
		return(
			<li onClick={this.handleOnClick} id={this.props.name + this.props.role  + "entry"}>{this.props.name}</li>
		      )
	}
}


class PeopleListForm extends React.Component {
	constructor(props) {
		super(props);
		this.myList = ["Alex", "Amy"];
		this.state = {
			people: this.myList.map((name) =>
						<PersonName name={name} role={this.props.selectboxtitle}/>
				),
			inputValue: "Name..."};

		this.handleChange = this.handleChange.bind(this);
		this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
		this.handleInputOnClick = this.handleInputOnClick.bind(this);
	}

	handleInputOnClick(e) {
		// When input box is clicked, inputValue is cleared and
		// font styling is set to normal
		document.getElementById("InputField" + this.props.selectboxtitle).className = "inputfieldstyle";
                this.setState({
			inputValue: ""
		});
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
						<PersonName name={name} role={this.props.selectboxtitle}/>
						)
		});
	}

	handleChange(e) {
		this.setState({
			people: this.myList.map((name) =>
						<PersonName name={name} role={this.props.selectboxtitle}/>
						),
			inputValue: e.target.value
		});
	}

	handleRemoveButtonClick(e) {
		// How do I know what option is selected?
		var removeList = this.getSelectValues(document.getElementById(this.props.selectboxtitle + 'selectbox'));
		for(var i = 0; i < removeList.length; i++) {
			for(var k = this.myList.length - 1; k >= 0; k--) {
				if(removeList[i] === this.myList[k]) {
					this.myList.splice(k, 1);
				}
			}
		}
		this.setState({
			people: this.myList.map((name) =>
						<PersonName name={name} role={this.props.selectboxtitle}/>
						)
		});

	}

	getSelectValues(select) {
		var result = [];
		var options = select.getElementsByTagName("li");
		var opt;
		for(var i=0, iLen=options.length; i<iLen; i++) {
			opt = options[i];
			if (opt.style.backgroundColor === "red") {
				result.push(opt.textContent);
			}
		}
		return result;
	}


	render() {
		return (
			<div className='driversformcontainer'>
			  <div className='inputfieldcontainer'>
			    <div className='formcontainer'>
  			      <form>
  			        <input id={"InputField" + this.props.selectboxtitle} onClick={this.handleInputOnClick} className='inputfieldstyleplaceholder' type="text" value={this.state.inputValue} onChange={this.handleChange}/>
      			        <div className="addbutton" onClick={this.handleAddDriverButtonClick.bind(this)} type="button">+</div>
  			      </form>
			    </div>
			  </div>
			  <div className='listcontainer'>
			    <div className='selectboxtitlecontainer'>
			      {this.props.selectboxtitle}
			    </div>
			    <div className='selectboxcontainer'>
			      <ul id={this.props.selectboxtitle + 'selectbox'} className='selectboxstyle' multiple>
			        {this.state.people}
			      </ul>
			    </div>
			    <div className='removebuttoncontainer'>
			      <button onClick={this.handleRemoveButtonClick}>Remove</button>
			    </div>
			  </div>
			</div>
		       );
	}
}
