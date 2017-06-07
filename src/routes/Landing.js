import React from 'react';
import IndexBanner from '../components/landing/IndexBanner.js'
import fondo from '../img/tecgreen.jpg'
import Footer from '../components/Footer'

class Landing extends React.Component {
	
	render() { 
		return (
			<div>
				<main>
					<IndexBanner fondo={fondo}/>
				</main>
				<Footer />
			</div>

		)
	}
}

export default Landing;