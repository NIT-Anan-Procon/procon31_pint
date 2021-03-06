import React from "react";

import Message from "./Message";
import InputContainer from "./InputContainer";
import ReplyMessage from "./ReplyMessage";

class ChatContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			replyID: null,
			replyMessages: []
		};
	}

	// 返信ボタンが押されたときの動作
	replyClicked(messageID) {
		this.setState({ replyID: messageID });
	}

	// 返信が終わったときの動作
	replyFinished = () => {
		this.setState({ replyID: null });
	}

	render() {
		return (
			<div>
				<div className="chatTitleBox">
					{this.props.titleMessage}
				</div>
				<div className="chatContainer">
					<div className="messageContainer">
						<div>
							{this.props.messages.map((message, index) => {
								if (Number(message.msgId) === Number(message.msgGroup)) {
									return (
										<Message
											key={index}
											messageID={message.msgId}
											groupID={message.msgGroup}
											sendTime={message.msgTime}
											user={message.userName}
											message={message.msg}
											reactNum={message.reactNum}
											replyClicked={(ID) => this.replyClicked(ID)}
											replyMessages={this.props.replyMessages}
											syncPins={this.props.syncPins}
										/>
									)
								}
								if (Number(message.msgId) !== Number(message.msgGroup)) {
									return (
										<ReplyMessage
											key={index}
											messageID={message.msgId}
											groupID={message.msgGroup}
											sendTime={message.msgTime}
											user={message.userName}
											message={message.msg}
											reactNum={message.reactNum}
											replyClicked={(ID) => this.replyClicked(ID)}
											replyMessages={this.props.replyMessages}
											syncPins={this.props.syncPins}
										/>
									)
								}
								return (0);
							})}
						</div>
					</div>
					<InputContainer
						pinID={this.props.pinID}
						replyID={this.state.replyID}
						syncMessage={this.props.syncMessage}
						replyFinished={this.replyFinished}
					/>
				</div>
			</div>
		);
	}
}

export default ChatContainer;