import React, { Component } from "react";
import { Widget, addResponseMessage } from "react-chat-widget"; // https://github.com/Wolox/react-chat-widget
import AppBar from "./AppBar";
import firebaseService from "../../src/services/firebaseService";
import ChromeService from "../../src/services/chromeService";

import "react-chat-widget/lib/styles.css";

const ChromeServiceObj = new ChromeService();

class App extends Component {
  state = {
    currentTabUrl: "",
    loading: true,
    error: "",
    basicInfo: {
      displayName: "",
      email: "",
      profilePicUrl: ""
    }
  };
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
    this.init();
  }
  init = async () => {
    try {
      const activeTab = await ChromeServiceObj.getActiveTab();
      const userData = await firebaseService.getUser();
      await firebaseService.getMessages(change => {
        console.log({ type: change.type });
        const data = change.doc.data();
        addResponseMessage(data.text);
      });
      this.setState({
        currentTabUrl: activeTab.url,
        loading: false,
        basicInfo: {
          displayName: userData.additionalUserInfo.profile.name,
          email: userData.additionalUserInfo.profile.email,
          profilePicUrl: userData.additionalUserInfo.profile.picture
        }
      });
    } catch (e) {
      console.log({ e });
      this.setState({ error: e, loading: false });
    }
  };
  saveMessageToCloud = async details => {
    await firebaseService.saveMessageToFirestore(details);
  };
  addUserMessage = async newMessage => {
    try {
      const details = {
        url: this.state.currentTabUrl,
        email: this.state.basicInfo.email,
        userName: this.state.basicInfo.displayName,
        text: newMessage,
        profilePicUrl: this.state.basicInfo.profilePicUrl
      };
      await this.saveMessageToCloud(details);
    } catch (e) {}
  };
  handleNewUserMessage = async newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API
    try {
      const details = {
        url: this.state.currentTabUrl,
        email: this.state.basicInfo.email,
        userName: this.state.basicInfo.displayName,
        text: newMessage,
        profilePicUrl: this.state.basicInfo.profilePicUrl
      };
      await this.saveMessageToCloud(details);
    } catch (e) {}
  };

  render() {
    return (
      <div>
        <AppBar />
        <h1>Hi you are logged In.</h1>
        <p>Now you can chat anywhere on Internet</p>
        {!this.state.loading ? (
          <Widget
            addUserMessage={this.addUserMessage}
            handleNewUserMessage={this.handleNewUserMessage}
            profileAvatar={this.state.basicInfo.profilePicUrl}
            title="Chat Everywhere"
            subtitle={this.state.currentTabUrl}
            profileAvatar={this.state.basicInfo.profilePicUrl}
          />
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;
