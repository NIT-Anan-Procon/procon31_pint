import React from 'react';

function PinController(props) {
	return (
		<div className="pinButton" onClick={() => props.addPin(props.getCurrentTime())}>
			<div className="pinButtonImage">
				<svg width="69px" height="100" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
					<path d="M33.6633 0C15.0691 0 0 15.0693 0 33.6633C0 52.6402 9.40586 56.6832 19.802 69.3068C32.2367 84.4064 33.6633 100 33.6633 100C33.6633 100 35.0898 84.4064 47.5246 69.307C57.9207 56.6832 67.3266 52.6402 67.3266 33.6635C67.3266 15.0693 52.2574 0 33.6633 0ZM33.6633 45.2971C27.2381 45.2971 22.0297 40.0885 22.0297 33.6635C22.0297 27.2385 27.2383 22.0299 33.6633 22.0299C40.0883 22.0299 45.2969 27.2385 45.2969 33.6635C45.2969 40.0885 40.0883 45.2971 33.6633 45.2971Z" />
				</svg>
			</div>
		</div>
	)
}

export default PinController;