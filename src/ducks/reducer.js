import axios from "axios";

const initialState = {
  user: {},
  profile: {},
  userLogged: false,
  allhomies: {},
  position: {},
  messageData: [],
  currentChat: [],
  resort: ''
};

const GET_USER_INFO = "GET_USER_INFO";
const GET_PROFILE = "GET_PROFILE";
const CHECK_USER = "CHECK_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const GET_USER_LOCATION = "GET_USER_LOCATION";
const CHECK_RESORT = "CHECK_RESORT"
const GET_ROOM_MESSAGES = 'GET_ROOM_MESSAGES'
const FIND_USERS = "FIND_USERS"
const GET_ALL_FRIENDS = "GET_ALL_FRIENDS";

export function getUserInfo() {
  return {
    type: GET_USER_INFO,
    payload: axios.get("/auth/me")
  };
}

export function getUserLocation(position) {

  return {
    type: GET_USER_LOCATION,
    payload: axios.put(`/user/location`, {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  };
}

export function checkResort(position) {
  return {
    type: CHECK_RESORT,
    payload: axios.put('/get/user/location', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }
}

export function getProfile(id) {
  console.log(id);

  const profile = axios.get(`/user/${id}`).then(res => {
    return res.data;
  });

  return {
    type: GET_PROFILE,
    payload: profile
  };
}

export function findUsers() {

}

export function checkUser() {
  const checked = axios.get("/checkuser").then(res => {
    return res.data;
  });

  return {
    type: CHECK_USER,
    payload: checked
  };
}

export function updateProfile(id, user) {
  const update = axios.put(`/users/${id}`, user).then(res => res.data[0]);
  return {
    type: UPDATE_PROFILE,
    payload: update
  };
}

export function getAllFriends(id) {
  console.log("id:", id);
  const allhomies = axios.get(`/friends/all/${id}`).then(response => {
    return response.data;
    console.log("promiseresponse:", response.data);
  });
  return {
    type: GET_ALL_FRIENDS,
    payload: allhomies
  };
}


//------------------------- Socket io -------------------------------//

export function createNewChat(chatData) {
  return {
    type: 'server/ new chat',
    payload: chatData
  }
}

export function joinChat(roomid) {
  return {
    type: 'server/ join chat',
    payload: roomid
  }
}


export function sendChatMessage(chatData) {
  return {
    type: 'server/ chat send message',
    payload: chatData
  }
}



export default (state = initialState, action) => {
  console.log('reducer actions: ', action.type);
  switch (action.type) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload.data });

    case GET_PROFILE + "_FULFILLED":
      return Object.assign({}, state, { profile: action.payload[0] });

    case CHECK_USER + "_FULLFILLED":
      return Object.assign({}, state, { userLogged: action.payload });

    case UPDATE_PROFILE + "_FULFILLED":
      return Object.assign({}, state, { profile: action.payload });

    case GET_ALL_FRIENDS + "_FULFILLED":
      return Object.assign({}, state, { allhomies: action.payload });

    case GET_USER_LOCATION + "_FULFILLED":
      return Object.assign({}, state, { position: action.payload });
      
    case CHECK_RESORT + "_FULFILLED":
    console.log('checkresort', action.payload);
    return Object.assign({}, state, {resort: action.payload})  

    case 'SEND_CHAT_MESSAGE':
      return Object.assign({}, state, { currentChat: [...state.currentChat, action.payload]})

    case GET_ROOM_MESSAGES:
      return Object.assign({}, state, {currentChat: [...state.currentChat, ...action.payload]})

    default:
      return state;
  }
};
