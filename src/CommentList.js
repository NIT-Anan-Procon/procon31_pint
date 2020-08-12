import React from 'react';

import CommentContainer from './CommentContainer';
import InputContainer from './InputContainer';

class CommentList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:""
    };
    this.SetMessage=this.SetMessage.bind(this);
  }

  SetMessage(text){
    this.setState({message:text})
  }

  render(){
    return (
      <>
        <CommentContainer comment={this.state.message} />
        <InputContainer onChange={
          (text)=>{
            this.SetMessage(text);
            console.log(this.state.message);
          }}/>
      </>
    );
  }
}
export default CommentList;