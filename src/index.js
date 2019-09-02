import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './ridearranger.css';
import pdfResume from './resume.pdf';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RideArrangerHome } from './ridearranger';

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
