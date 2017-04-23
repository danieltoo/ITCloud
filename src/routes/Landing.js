import React from 'react';
import IndexBanner from '../components/landing/IndexBanner.js'
import fondo from '../img/tecgreen.jpg'

class Landing extends React.Component {
	
	render() {
		return (
			<div>
				<main>
					<IndexBanner fondo={fondo}/>
				</main>
			</div>
		)
	}
}

export default Landing;