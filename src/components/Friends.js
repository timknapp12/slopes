import React, { Component } from "react";
import axios from "axios";
import { getUserInfo, getAllFriends, createNewChat } from "./../ducks/reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mail from './../assets/mail2.png'
import skii from './../assets/Ski.png'

export class Friends extends Component {
  constructor() {
    super();

    this.state = {
      roomid: ""
    };
  }
  componentDidMount() {
    this.props.getAllFriends(this.props.user.user_id);
    const roomid = Math.floor(Math.random() * 2000);
    this.setState({
      roomid: `${roomid}${this.props.user.user_id}`
    });
  }

  handleClickCreateChat(first_name, user_id) {
    this.props.createNewChat({
      roomid: `${this.state.roomid}`
    });
    this.createChatRequest(first_name, user_id);
  }

  createChatRequest(first_name, user_id) {
    axios.post("/chat/request", {
      roomid: this.state.roomid,
      room_name: `${this.props.user.first_name} + ${first_name}`,
      request_type: "chat",
      request_to: user_id,
      request_from: this.props.user.user_id
    });
  }


  render() {
    if (this.props.allhomies.length > 0) {
      var currentMTNfriends = this.props.allhomies.map((e, i) => {
        if (e.current_mtn === this.props.user.current_mtn) {
          return (
            <div key={i} className="friendsAvatar buds">
                <div>
                <Link to={`/profile/${e.user_id}`} ><img alt='user' className='friendsPic' src={e.profile_picture} /></Link>
                </div>
                <div className="friendsName">
                  {e.first_name} {e.last_name}
                </div>
                <div>{e.current_mtn}</div>
                <div  className='friendmailer'>
                <Link to={`/chat/${this.state.roomid}`}>
                <img src={mail}
                  onClick={() =>
                    this.handleClickCreateChat(e.first_name, e.user_id)
                  }
                  className="friendMessagebtn"
                >
                </img>
              </Link>
                </div>
              </div>
          );
        }
      });
    }
    if (this.props.allhomies.length > 0) {
      var MTNfriends = this.props.allhomies.map((e, i) => {
        if (e.current_mtn && e.current_mtn !== this.props.user.current_mtn) {
          return (
            <div key={i} className="friendsAvatar skiin">
                <div>
                <Link to={`/profile/${e.user_id}`} ><img alt='user' className='friendsPic' src={e.profile_picture} /></Link>
                </div>
                <div className="friendsName">
                  {e.first_name} {e.last_name}
                </div>
                <div>{e.current_mtn}</div>
                <div  className='friendmailer'>
                <Link to={`/chat/${this.state.roomid}`}>
                <img src={mail}
                  onClick={() =>
                    this.handleClickCreateChat(e.first_name, e.user_id)
                  }
                  className="friendMessagebtn"
                >
                </img>
              </Link>
                </div>
              </div>
          );
        }
      });
    }
    if (this.props.allhomies.length > 0) {
      var lazyFriends = this.props.allhomies.map((e, i) => {
        if (!e.current_mtn) {
          return (
            
              <div className="friendsAvatar lazy" key={i}>
                <div>
                <Link to={`/profile/${e.user_id}`} ><img alt='user' className='friendsPic' src={e.profile_picture} /></Link>
                </div>
                <div className="friendsName">
                  {e.first_name} {e.last_name}
                </div>
                <div>{e.current_mtn}</div>
                <div className='friendmailer'>
                  <Link to={`/chat/${this.state.roomid}`}>
                    <img src={mail}
                      onClick={() =>
                        this.handleClickCreateChat(e.first_name, e.user_id)
                      }
                      className="friendMessagebtn"
                    >
                    </img>
                  </Link>
                </div>
              </div>
          );
        }
      });
    }
    return (
        
      <div className='friendscontainer'>
        <div>{currentMTNfriends}</div>
        <div>{MTNfriends}</div>
        <div>{lazyFriends}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  getUserInfo,
  getAllFriends,
  createNewChat
})(Friends);


