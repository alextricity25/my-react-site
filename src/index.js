import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './ridearranger.css';
import pdfResume from './resume.pdf';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RideArrangerHome } from './ridearranger';
import axios from 'axios'
import xml2json from 'xml2js'

class NamePlate extends React.Component {
	render() {
		return (
			<div className='outer'>
			  <CurrentlyReading />
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
			</div>
		       );
	}
}

class CurrentlyReading extends React.Component {
	state = {
		bookList: [],
		currentBook: "My Reading List",
		bookNum: 0,
		error: null
	}

	componentWillMount(){
        this.count = 0;
		const apiKey = process.env.REACT_APP_GOODREADS_API_KEY;
		var config = {headers: {"X-Requested-With": "XMLHttpRequest"}};
		axios.get("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/81229333.xml?key=8YvFS344gsnBRBdHhszqlQ&v=2&shelf=currently-reading", config)
		.then(response => {
			let err;
			let _bookList = [];
			let _bookNum = 0;
			xml2json.parseString(response.data, function (_err, result) {
				for (var book of result.GoodreadsResponse.reviews[0].review) {
					_bookList.push(book.book[0].title[0]);
					_bookNum++;
				}
				console.log(_bookList);
				err = _err;
			});
			this.setState({bookList: _bookList, error: err, bookNum: _bookNum});
		})
		.catch(error => {
			this.setState({error: error})
		});

		this.timerID = setInterval(
			() => this.setCurrentBook(),
			5000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	setCurrentBook() {
		this.setState({currentBook: this.state.bookList[this.count % this.state.bookNum], bookList: this.state.bookList});
		this.count++;
	}
	render(){
		return (
			<div className='currently_reading_parent'>
			  <p className='currently-reading-header-text'> Currently Reading:</p>
			  <p className='currently-reading-text'> {this.state.currentBook} </p>
			  <p className='currently-reading-footer'> Data from <a href="https://www.goodreads.com/user/show/81229333-miguel-cantu">Goodreads.com</a> </p>
			</div>
		);
	}
}

class Router extends React.Component {

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
			    className="fab fa-instagram"
			    name="Instagram"
			    link="https://www.instagram.com/miguelalexcantu/"/>
			  <SocialMediaButton
			    className="fab fa-github"
			    name="Github"
			    link="https://github.com/alextricity25"/>
			  <SocialMediaButton
			    className="fab fa-linkedin-in"
			    name="LinkedIn"
			    link="https://www.linkedin.com/in/miguelalexcantu/"/>
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
