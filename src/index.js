import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NamePlate extends React.Component {
	render() {
		return (
			<div className='inner'>
			  <p className='my-name'>Miguel</p>
			  <p className='my-name'>Alex Cantu</p>
			  <Button buttonName='my-life' text='My Life' />
			  <Button buttonName='my-resume' text='My Resume' />
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

ReactDOM.render(<CenterStage />, document.getElementById('root'));
