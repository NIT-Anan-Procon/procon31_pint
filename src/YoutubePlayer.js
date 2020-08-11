import React, {useRef, useEffect} from 'react';
import YouTube from 'react-youtube';

import Controller from "./Controller";
import PinController from "./PinController";

import './YoutubePlayer.css';

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoEl: null
    }
    this.controller = React.createRef();
  }

  render() {
    const opts = {
      height: '390',
      width: '640'
    };
 
    return (
      <div>
        <YouTube videoId={this.props.videoId} opts={opts} onReady={(event) => this._onReady(event)} />
        <Controller
          ref={this.controller}
          getVideo={() => this.state.videoEl}
        />
        
        <PinController
          onPress={this.controller.add}
          getVideoTime={ () => Math.round(this.state.videoEl.target.getCurrentTime()) }
        />
      </div>
    );
  }

  _onReady(event) {
    this.setState({videoEl: event});
    event.target.pauseVideo();
  }
}

export default YoutubePlayer;