import React from "react";
import firebaseService from "../../services/firebaseService";
import Db from "../../services/dbService";
import "./index.css";
import UserProfile from "./UserProfile";

const db = new Db();

export default class Index extends React.Component {
  state = {
    loading: true,
    error: "",
    authenticated: false,
    basicInfo: {
      userId: "",
      displayName: "",
      email: "",
      photoURL: ""
    }
  };
  constructor(props) {
    super(props);
    this.init();
  }
  onLogout = () => {
    this.setState({ authenticated: false });
  };
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
        }
      });
      await db.set({ authenticated: true, userId });
    } catch (e) {
      this.setState({ authenticated: false, error: e, loading: false });
      await db.set({ authenticated: true, userId: "" });
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <div id="main-content">
          <h1>Loading...</h1>
        </div>
      );
    }
    if (!this.state.loading && this.state.error !== "") {
      return (
        <div id="main-content">
          <h1>Error!</h1>
        </div>
      );
    }
    return <UserProfile info={this.state.basicInfo} onLogout={this.onLogout} />;
  }
}
