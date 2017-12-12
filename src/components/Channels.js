import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleChannelsNav } from "./../ducks/reducer";
import logo2 from './../assets/logo2.png';
import axios from "axios";
import { Link } from 'react-router-dom';




class Channels extends Component {
    constructor() {
        super();

    }



  componentDidMount() {
      this.getAllChannels(this.props.user.first_name)
  }

  getAllChannels(firstName) {
    axios.get(`/channels/${firstName}`).then((res) =>  this.setState({channels: res.data}))
  }

  render() {
      console.log(this.props)

      const allChannels = this.props.channels.map((e,i)=>{
        return (
        <Link key={i} to={`/chat/${e.join_room_id}`}>
            <button onClick={()=> this.props.toggleChannelsNav(this.props.chatNavOpen)} key={i}>{e.room_name} </button>
        </Link>
    )
      })
    return (
        <div className='chatNav' style={ this.props.chatNavOpen ? { width: '0px', border: 'none'} : {width : '70%'}}>
            {allChannels}
        </div>
      
    )
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {toggleChannelsNav})(Channels);
