import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo, getRequest, initialResort } from "../ducks/reducer";
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Search from "./Search";
import Friends from "./Friends";
import Notifications from "./Notifications";
import Channels from "./Channels"
import io from "socket.io-client";
import turf from "turf";
import Modal from './Modal';
import ski from './../assets/Ski.png'
import axios from 'axios';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      friendsToggle: false,
      searchToggle: false,
      notificationsToggle: false,
      mapToggle: false,
      num: 0
    };
    this.friendsToggle = this.friendsToggle.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo();
    this.props.initialResort();
    axios.get('/get/notification/length').then(
      response =>{
        this.setState({
          num:response.data.lengths
        })
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  friendsToggle() {
    this.setState({
      searchToggle: !this.state.searchToggle,
      notificationsToggle: !this.state.notificationsToggle,
      mapToggle: !this.state.mapToggle
    });
    // this.socket.id = this.props.user.user_id
    // console.log(this.socket)
  }
  searchToggle() {
    this.setState({
      friendsToggle: !this.state.friendsToggle,
      notificationsToggle: !this.state.notificationsToggle,
      mapToggle: !this.state.mapToggle
    });
  }
  notificationsToggle() {
    this.setState({
      friendsToggle: !this.state.friendsToggle,
      searchToggle: !this.state.searchToggle,
      mapToggle: !this.state.mapToggle
    });
    this.props.getRequest(this.props.user.user_id)
    axios.get('/get/notification/length').then(
      response =>{
        console.log('aghjsdjgashda', response.data.lengths)
        this.setState({
          num: response.data.lengths
        })
      }
    )
  }

  homeToggle() {
      this.setState({
          friendsToggle: false,
          searchToggle: false,
          notificationsToggle: false,
          mapToggle: false
      })
  }

  mapToggle() {
    this.setState({
      friendsToggle: !this.state.friendsToggle,
      notificationsToggle: !this.state.notificationsToggle,
      searchToggle: !this.state.mapToggle
    });
  }

  render() {
    let count = 0;
    var notification_count = this.props.requests.map( e => {
      count++
    })
    console.log(count)
    console.log(this.props.resort)
      console.log(this.props.openModal);
    return (
      <div className='home'>
        <Header />
        <div>
          <div className="home_profile_container">
            <img
              className="home_profile_image"
              src={this.props.user.profile_picture}
            />
            <div className="home_profile_name">
              {this.props.user.nickname}
            </div>
            {this.props.resort ? <img className='ski-icon' src={ski} /> : null }
            <div className="home_profile_mountain">
               <p>{this.props.resort}</p>
              
            </div>
            <Link to={`/profile/${this.props.user.user_id}`}>
              <button type="" className="see_profile_button">
                PROFILE
              </button>
            </Link>
          </div>
          <div className="homecontainer">

              <button
                className="homecontainerButton"
                style={this.state.friendsToggle ? { display: "none" } : 
                this.state.searchToggle && this.state.notificationsToggle && this.state.mapToggle ? 
                {marginBottom: '3px'} : null}
                onClick={() => {
                  this.friendsToggle();
                }}
              >
                {" "}
                FRIENDS{" "}
              </button>

              <button
                className="homecontainerButton"
                style={this.state.searchToggle ? { display: "none" } : this.state.friendsToggle && this.state.notificationsToggle && this.state.mapToggle ? {marginBottom: '3px'} : null}
                onClick={() => {
                  this.searchToggle();
                }}
              >
                {" "}
                SEARCH{" "}
              </button>

  
              <button
                className="homecontainerButton"
                style={
                  this.state.notificationsToggle ? 
                  { display: "none" } : 
                  this.state.friendsToggle && this.state.searchToggle && this.state.mapToggle ? 
                  
                  {marginBottom: '3px'} : null
                }
                // style={this.state.friendsToggle && this.state.searchToggle ? {marginBottom: '3px'} : null}
                
                onClick={() => {
                  this.notificationsToggle();
                }}
              >NOTIFICATIONS <span className={this.state.num > 0 ? 'home-notification-alert' : 'profile_disabled' } >{this.state.num}</span>
              </button>
              
              <div style={this.props.mapCenter.data ? {display:'inline'}: {display:'none'}} >
              <Link className='homebtnlink' to='/map'>    
              <button
              className="homecontainerButton"
              style={this.state.mapToggle ? { display: "none" } : this.state.friendsToggle && this.state.searchToggle ? {marginBottom: '3px'} : null}
                onClick={()=> {this.mapToggle();}}>
                MAP
              </button>
              </Link>
              </div>
              
              <button
              className={this.props.mapCenter.data ? 'profile_disabled' : 'homecontainerButton'}
              style={this.state.mapToggle ? { display: "none" } : this.state.friendsToggle && this.state.searchToggle ? {marginBottom: '3px'} : null}
                >
               <i className="fas fa-spinner spinning"></i> MAP
              </button>
              
    
            {this.state.searchToggle && this.state.notificationsToggle ? 
            
              <Friends socket={this.socket} id={this.props.user.user_id} /> : null}
            {this.state.notificationsToggle && this.state.friendsToggle ? 
              <Search /> : null}
            {this.state.friendsToggle && this.state.searchToggle ? 
              <Notifications /> : null}
          </div>
              <Channels />
        </div>
        <Modal/>
        <Nav toggle={()=>this.homeToggle()}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    requests: state.requests,
    openModal: state.openModal,
    resort: state.resort,
    mapCenter: state.mapCenter
  };
}

export default connect(mapStateToProps, { getUserInfo, getRequest, initialResort })(Home);
