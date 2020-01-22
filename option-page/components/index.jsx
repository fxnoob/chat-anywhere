import React from "react";
import firebaseService from "../../src/services/firebaseService";
import UserProfile from "./UserProfile";

export default class Index extends React.Component {
  state = {
    basicInfo: {
      loading: true,
      displayName: "Jane Doe",
      email: "Los Angeles, CA",
      photoURL: "http://lorempixel.com/500/500/people"
    }
  };
  constructor(props) {
    super(props);
    this.init();
  }
  init = async () => {
    try {
      const userData = await firebaseService.getUser();
      console.log({
        displayName: userData.additionalUserInfo.profile.name,
        email: userData.additionalUserInfo.profile.email,
        photoURL: userData.additionalUserInfo.profile.picture
      });
      this.setState({
        basicInfo: {
          displayName: userData.additionalUserInfo.profile.name,
          email: userData.additionalUserInfo.profile.email,
          loading: false,
        },
      });
    } catch (e) {
      alert("error");
      console.log({ e });
    }
  };
  render() {
    return <UserProfile info={this.state.basicInfo} />;
  }
}
