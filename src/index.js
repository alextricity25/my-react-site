import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NamePlate extends React.Component {
	render() {
		return (
			<div className='inner'>
			  <p id='firstname' className='my-name'>Miguel</p>
			  <p className='my-name'><span className="middle-name" id='middlename'>Alex</span><span id='lastname' className='last-name'> Cantu</span></p>
			  <SocialMediaButtonGroup />
			</div>
		       );
	}
}

class CenterStage extends React.Component {
	render() {
		return (
			<NamePlate />
		       );
	}
}

class SocialMediaButtonGroup extends React.Component {
	render() {
		return (
			<div id='socialmediabuttons' className='my-life'>
			  <SocialMediaButton className="fab fa-facebook" name="Facebook"/>
			  <SocialMediaButton className="fab fa-twitter" name="Twitter"/>
			  <SocialMediaButton className="fab fa-blogger-b" name="Blog"/>
			  <SocialMediaButton className="fab fa-github" name="Github"/>
			  <SocialMediaButton className="fab fa-linkedin-in" name="LinkedIn"/>
			  <SocialMediaButton className="fas fa-file-pdf" name="Resume"/>
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
			<a onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} href='#' className={this.props.className}></a>
		       )
	}
}


ReactDOM.render(<CenterStage />, document.getElementById('root'));


