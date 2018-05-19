import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NamePlate extends React.Component {
	render() {
		return (
			<div className='inner'>
			  <p className='my-name'>Miguel</p>
			  <p className='my-name middle-name'>Alex Cantu</p>
			  <Button buttonName='my-life' text='My Life' />
			  <Button buttonName='my-resume' text='My Resume' />
			  <SocialMediaButtonLife />
			  <SocialMediaButtonResume />
			</div>
		       );
	}
}

class CenterStage extends React.Component {
	render() {
		return (
			<div className="outer">
			  <div className='middle'>
			    <NamePlate />
			  </div>
			</div>
		       );
	}
}

class Button extends React.Component {
	render() {
		return (
			<div className={this.props.buttonName}>
			  <button className={this.props.buttonName + "-button"}>{this.props.text}</button>
			</div>
		       );
	}
}

class SocialMediaButtonLife extends React.Component {
	render() {
		return (
			<div className='my-life'>
			  <a href="#" className="fab fa-facebook"></a>
			  <a href="#" className="fab fa-twitter"></a>
			  <a href="#" className="fab fa-blogger-b"></a>
			</div>
		       );
	}
}

class SocialMediaButtonResume extends React.Component {
	render() {
		return (
			<div className='my-resume'>
			  <a href="#" className="fab fa-github"></a>
			  <a href="#" className="fab fa-linkedin-in"></a>
			  <a href="#" className="fas fa-file-pdf"></a>
			</div>
		       );
	}
}


ReactDOM.render(<CenterStage />, document.getElementById('root'));
