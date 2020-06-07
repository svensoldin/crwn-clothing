import React from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
	constructor() {
		super();

		this.state= {
			hasErrored: false
		}
	}

	static getDerivedStateFromError(error) {
		//process the error
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error)
	}

	render() {
		return(
			this.state.hasErrored ? 
			<ErrorImageOverlay>
			<ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
			<ErrorImageText>Oops... It appears that this page has drifted off into the vast darkness of space</ErrorImageText>
			</ErrorImageOverlay>
			 : 
			this.props.children
		);
	}
};

export default ErrorBoundary;