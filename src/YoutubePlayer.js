import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

import Pin from "./Pin"
import PinController from './PinController';
import PinHighLight from "./PinHighLight";
import ChatContainer from "./ChatContainer";

import PintLogo from "./image/PintLogo.png";

import './css/reset.css';
import './css/YoutubePlayer.css';
import './css/Pin.css'
import './css/Chat.css';

class YoutubePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videoID: "WwfXzOjcA4s",
			videoEl: null,
			movieID: 4,
			pinID: 78,
			pins: [],
			messages: [],
			replyMessages: [],
			titleMessage: null,
			highLightMessage: null,
			highLightUser: null,
			pinMessageSum: 0,
			pinReactSum: 0
		}
	}

	syncPins = () => {
		const pins = [];
		clearTimeout(this.syncPins);
		const params = new URLSearchParams();
		params.append('MovieID', this.state.movieID);
		this.setState({ pins: [] });
		axios
			.post("http://procon31-server.ddns.net/API/PinGet.php", params)
			.then(res => {
				for (let key in res.data.PinArray) {
					pins[key] = (res.data.PinArray[key]);
				}
				this.setState({
					pins: pins
				}, () => {
					this.initialSetPin()
				});
			})
			.catch(err => alert(err));
		setTimeout(this.syncPins, 10000)
	}

	initialSetPin() {
		if (this.state.pinID != null) {
			const psum = this.state.pins[this.state.pinID].msgSum;
			this.setState({
				pinMessageSum: psum,
				pinReactSum: this.state.pins[this.state.pinID].reactSum,
				titleMessage: (psum === 0) ? null : this.state.titleMessage
			});
		}
	}

	setPinID(pinID) {
		this.setState({
			pinID: pinID
		}, () => {
			this.syncMessage();
			this.initialSetPin();
		});
	}

	addPin(time) {
		const params = new URLSearchParams();
		params.append('MovieID', this.state.movieID);
		params.append('PinTime', time);
		axios
			.post("http://procon31-server.ddns.net/API/PinReg.php", params)
			.then(res => {
				this.syncPins()
			})
			.catch(err => alert(err));
	}

	syncMessage = () => {
		let messages = [];
		clearTimeout(this.syncMessage);
		const params = new URLSearchParams();
		params.append('PinID', this.state.pinID);
		axios
			.post("http://procon31-server.ddns.net/API/ChatGet.php", params)
			.then(res => {
				for (let key in res.data.MessageArray) {
					messages[key] = res.data.MessageArray[key]
				}
				messages.sort((a, b) => {
					if (a.msgGroup < b.msgGroup) return -1;
					if (a.msgGroup > b.msgGroup) return 1;
					return 0;
				});
				if (Number(this.state.messages.length) != Number(messages.length)) {
					this.setState({
						messages: []
					}, () => {
						this.setState({
							messages: messages
						}, () => {
							this.setHighLightMassage();
						})
					});
				}
				for (let key in this.state.messages) {
					if (this.state.messages[key] !== null) {
						this.setState({ titleMessage: this.state.messages[key].msg });
						break;
					}
				}
			})
			.catch(err => alert(err));
		setTimeout(this.syncMessage, 10000)
	}

	setHighLightMassage = () => {
		const params = new URLSearchParams();
		params.append('PinID', this.state.pinID);
		this.setState({ goodMaxMsg: [] });
		axios
			.post("http://procon31-server.ddns.net/API/BestReactGet.php", params)
			.then(res => {
				if (res.data.Result) {
					for (let key in this.state.messages) {
						if (this.state.messages[key].msgId == res.data.msgId) {
							this.setState({
								highLightMessage: this.state.messages[key].msg,
								highLightUser: this.state.messages[key].userName
							});
						}
					}
				}
			})
			.catch(err => alert(err));
	}

	render() {
		const opts = {
			height: '540',
			width: '960',
		};

		return (
			<>
				<header>
					<img src={PintLogo} alt="Pintロゴ" className="pintLogo" />
					<a href="http://procon31-server.ddns.net/API/Logout.php" className="Logout">ログアウト</a>
				</header>
				<div className="all">
					<div className="leftSection">
						<YouTube videoId={this.state.videoID} opts={opts} onReady={(event) => this._onReady(event)} />
						<div className="pinBox">
							<div className="pin">
								{this.state.pins.map((pin, index) => {
									return (
										<Pin
											pinReact={this.state.pins[index].reactSum}
											pinMsgLength={this.state.pins[index].msgSum}
											pinTime={pin.pinTime}
											pinType={pin.pinType}
											pinID={index}
											setPinID={(ID) => this.setPinID(ID)}
											getVideo={() => this.state.videoEl}
											duration={() => this.state.videoEl.target.getDuration()}
										/>
									)
								})}
							</div>
							<hr className="seekBar" />
						</div>
						<div className="pinHighLightAndButton">
							<PinHighLight
								pinMessageSum={this.state.pinMessageSum}
								pinReactSum={this.state.pinReactSum}
								user={this.state.highLightUser}
								message={this.state.highLightMessage}
							/>
							<PinController
								addPin={(time) => this.addPin(time)}
								getCurrentTime={() => Math.round(this.state.videoEl.target.getCurrentTime())}
							/>
						</div>
					</div>
					<div className="rightSection">
						<ChatContainer
							pinID={this.state.pinID}
							messages={this.state.messages}
							replyMessages={this.state.replyMessages}
							titleMessage={this.state.titleMessage}
							syncMessage={this.syncMessage}
						/>
					</div>
				</div>
			</>
		);
	}

	_onReady(event) {
		this.setState({ videoEl: event });
		this.syncPins(this.state.MovieID);
		this.syncMessage();
	}
}

export default YoutubePlayer;