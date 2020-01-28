import React from "react";
import firebaseService from "../../src/services/firebaseService";
import Db from "../../src/services/dbService";
import UserProfile from "./UserProfile";
import "./UserProfile.css";

const db = new Db();

export default class Index extends React.Component {
  state = {
    loading: true,
    error: '',
    authenticated: false,
    basicInfo: {
      userId: '',
      displayName: "Jane Doe",
      email: "Los Angeles, CA",
      photoURL: "http://lorempixel.com/500/500/people"
    }
  };
  constructor(props) {
    super(props);
    this.init();
  }
  onLogout = () => {
    this.setState({authenticated: false});
  }
  init = async () => {
    try {
      const userData = await firebaseService.getUser();
      const userId = firebaseService.firebase.auth().currentUser.uid;
      this.setState({
        authenticated: true,
        loading: false,
        basicInfo: {
          userId: userId,
          displayName: userData.additionalUserInfo.profile.name,
          email: userData.additionalUserInfo.profile.email
        },
      });
      await db.set({authenticated: true, userId});
    } catch (e) {
      this.setState({authenticated: false, error: e, loading: false});
      await db.set({authenticated: true, userId: ''});
    }
  };
  render() {
    if (this.state.loading) {
      return "loading...";
    }
    if (!this.state.loading && this.state.error !== '') {
      return "Error...";
    }
    return <UserProfile info={this.state.basicInfo} onLogout={this.onLogout}/>;
  }
}
