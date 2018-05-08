import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CoverPage extends React.Component {
	render() {
		return (
			<div className="outer">
			  <div className="middle">
			    <div className="inner">
			      <p className="my-name">Miguel</p>
			      <p className='my-name'>  Alex Cantu</p>
			      <div>
			        <div className='my-life'>
			          <button className='my-life-button'>My Life</button>
				</div>
				<div className='my-resume'>
				  <button className='my-resume-button'>My Resume</button>
				</div>
			      </div>
			    </div>
			  </div>
			</div>
		       );
	}
}

ReactDOM.render(<CoverPage />, document.getElementById('root'));
