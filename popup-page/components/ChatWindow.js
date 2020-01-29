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
        if (doc.type == "added") dataStore.push(doc.data());
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
    let html;
    const { loading, error, basicInfo } = this.state;
    if (loading) {
      html = (
        <div>
          <AppBar />
          <h1>Hi {basicInfo.displayName}.</h1>
          <h3>Loading chat system for you...</h3>
        </div>
      );
    } else if (!loading && error == "") {
      html = (
        <div>
          <AppBar />
          <h1>Hi {basicInfo.displayName}.</h1>
          <p>Now you can chat anywhere on Internet</p>
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            profileAvatar={this.state.basicInfo.profilePicUrl}
            title="Chat Everywhere"
            subtitle={this.state.currentTabUrl}
            profileAvatar={this.state.basicInfo.profilePicUrl}
          />
        </div>
      );
    } else {
      html = (
        <div>
          <AppBar />
          <h1>Hi {basicInfo.displayName}.</h1>
          <h3 style={{ color: "red" }}>Gotcha!!!</h3>
          <h3>Keep in mind that</h3>
          <ul>
            <li>This does not work on empty url tabs. eg. new tab</li>
            <li>Please check internet connectivity</li>
          </ul>
        </div>
      );
    }
    return html;
  }
}

export default App;
