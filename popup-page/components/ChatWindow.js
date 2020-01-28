import React, { Component } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget"; // https://github.com/Wolox/react-chat-widget
import AppBar from "./AppBar";
import firebaseService from "../../src/services/firebaseService";
import ChromeService from "../../src/services/chromeService";
import { extractHostname } from "../../src/services/urlService";
import "react-chat-widget/lib/styles.css";

const ChromeServiceObj = new ChromeService();

class App extends Component {
  state = {
    currentTabUrl: "",
    loading: true,
    error: "",
    basicInfo: {
      userId: "",
      displayName: "",
      email: "",
      profilePicUrl: ""
    }
  };
  constructor(props) {
    super(props);
    this.userId = "";
  }
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
    this.init();
  }
  init = async () => {
    try {
      const activeTab = await ChromeServiceObj.getActiveTab();
      const channel = extractHostname(activeTab.url);
      const userData = await firebaseService.getUser();
      this.userId = firebaseService.firebase.auth().currentUser.uid;
      const snapshot = await firebaseService.getLastNMessages(channel, 12);
      const dataStore = [];
      snapshot.forEach(doc => {
        dataStore.push(doc.data());
      });
      dataStore.reverse().map(data => {
        if (data.userId && data.userId != this.userId) {
          addResponseMessage(data.text);
        } else {
          addUserMessage(data.text);
        }
      });

      firebaseService.messageListener(channel, change => {
        console.log("new change", { change });
        const data = change.doc.data();
        if (data.userId && data.userId != this.userId) {
          addResponseMessage(data.text);
        }
      });
      this.setState({
        currentTabUrl: activeTab.url,
        loading: false,
        basicInfo: {
          userId: this.userId,
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
  saveMessageToCloud = async (channel, details) => {
    await firebaseService.saveMessageToFirestore(channel, details);
  };
  // exTaddUserMessage = async newMessage => {
  //   const userId = firebaseService.firebase.auth().currentUser.uid;
  //   try {
  //     const details = {
  //       url: this.state.currentTabUrl,
  //       email: this.state.basicInfo.email,
  //       userId: userId,
  //       userName: this.state.basicInfo.displayName,
  //       text: newMessage,
  //       profilePicUrl: this.state.basicInfo.profilePicUrl
  //     };
  //     await this.saveMessageToCloud(details);
  //   } catch (e) {}
  // };
  handleNewUserMessage = async newMessage => {
    try {
      const details = {
        userId: this.userId,
        url: this.state.currentTabUrl,
        email: this.state.basicInfo.email,
        userName: this.state.basicInfo.displayName,
        text: newMessage,
        profilePicUrl: this.state.basicInfo.profilePicUrl
      };
      await this.saveMessageToCloud(
        extractHostname(this.state.currentTabUrl),
        details
      );
    } catch (e) {
      console.log({ e });
    }
  };

  render() {
    return (
      <div>
        <AppBar />
        <h1>Hi you are logged In.</h1>
        <p>Now you can chat anywhere on Internet</p>
        {!this.state.loading ? (
          <Widget
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
