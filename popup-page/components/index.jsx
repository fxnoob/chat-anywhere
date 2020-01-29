import React from "react";
import SignIn from "./Signin";
import ChatWindow from "./ChatWindow";
import Db from "../../src/services/dbService";

const db = new Db();

export default class Index extends React.Component {
  state = {
    laoding: true,
    authenticated: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.init().catch(e => {
      console.log({ e });
    });
  }
  init = async () => {
    const { authenticated } = await db.get("authenticated");
    let isAuthenticated = false;
    if (authenticated) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    this.setState({ authenticated: isAuthenticated, loading: false });
  };
  render() {
    const { loading, authenticated } = this.state;
    if (loading) {
      return "Initialising...";
    }
    if (authenticated) {
      return <ChatWindow />;
    } else {
      return <SignIn />;
    }
  }
}
