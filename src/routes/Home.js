import React from 'react';
import { Redirect} from 'react-router-dom'


class Home extends React.Component {

	
	render() {
		
		return (
				<div className="green lighten-2">
				     <Redirect push to={`/posts`}/>
					
					
				</div>
			)
	}
}




export default Home;