import React from 'react';
import spinner from './utilits/spinner.gif';

export default () => {
		return (
			<div>
				<img src={spinner} alt="Loading..." style={{width:'200px',margin:'40px auto', display:'block'}} 
				/>
			</div>
		)
}
