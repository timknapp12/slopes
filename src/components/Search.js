import React, { Component } from "react";
import searchIcon from "./../assets/searchicon2.png";
import {
  findUsers,
  getUserInfo,
  getAllFriends,
  getRequest
} from "./../ducks/reducer";
import axios from "axios";
import { connect } from "react-redux";
import timer from "./../assets/78834-200.png";
import { Link } from "react-router-dom";
import checkmark from './../assets/checkmark2.png'

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  findUsers() {
    axios
      .get(
        `/find/users/${this.props.user.user_id}?search=${
          this.refs.search.value
        }`
      )
      .then(res => {
        this.setState({
          users: res.data
        });
      });
  }

  friendRequest(id) {
    axios
      .post(`/send/friend/request/${this.props.user.user_id}/${id}`)
      .then(alert("Request Sent"));
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.props.getRequest(this.props.user.user_id);
      this.props.getAllFriends(this.props.user.user_id);
      this.findUsers();
    }
  }
  
  mapLists() {
    var homies = [];
    var pendingFriendReqs = [];
    if (this.props.allhomies) {
      var homies = [];
      for (let i = 0; i < this.props.allhomies.length; i++) {
        homies.push(this.props.allhomies[i].friend_id);
      }
      if (this.props.requests) {
        for (var i = 0; i < this.props.requests.length; i++) {
          if (
            this.props.requests[i].request_type === "friend_request" &&
            this.props.requests[i].request_from !== this.props.user.user_id
          ) {
            pendingFriendReqs.push(this.props.requests[i].request_from);
          } else if(this.props.requests[i].request_type === "friend_request" &&
          this.props.requests[i].request_to != this.props.user.user_id) {
            pendingFriendReqs.push(this.props.requests[i].request_to);
          }
        }
      }
    }
    return {
      homies: homies,
      pendingFriendReqs: pendingFriendReqs
    }
  }
  render() {
    const friendRef = this.mapLists();
    var mapUsers = this.state.users.map((e, i) => {
      return (
        <div key={e.user_id} className="usersList">
          <div>
          <Link to={`/profile/${e.user_id}`} ><img alt='user' className="searchIMG" src={e.profile_picture} /></Link>
          </div>
          <div className='small_text'> {e.first_name}</div>
          {!friendRef.pendingFriendReqs.includes(e.user_id) ? !friendRef.homies.includes(e.user_id) ? 
            <div>
              <button  className='usersBtn' onClick={() => this.friendRequest(e.user_id)}
              > + </button>
            </div>
          : <div><img className="checkmark" src = {checkmark} alt="Already Friends"/></div> : ''}
          {}
          {friendRef.pendingFriendReqs.includes(e.user_id) ?
         <div className="timerDiv"> <img alt="pending-request" src={timer} className="searchBTN"/></div>
         : null }

   </div>
      );
    });
    return (
      <div className="searchContainer">
      <div>
      <div>
          <input ref="search" type="text" onKeyDown={this.keyPress} />

          <img 
          onClick={() => {this.props.getRequest(this.props.user.user_id)
          this.props.getAllFriends(this.props.user.user_id)
          this.findUsers()}}
          className="searchIcon" 
          alt="" 
          src={searchIcon} />
 
          </div>
          </div>
        {mapUsers}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  findUsers,
  getUserInfo,
  getAllFriends,
  getRequest
})(Search);
