import React from "react";
import SignIn from "./Signin";
import ChatWindow from "./ChatWindow";
import Db from "../../services/dbService";
import constants from "../../../constants";
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
      return (
        <React.Fragment>
          <ChatWindow />
          <hr />
          <ul>
            <li>
              <a href={constants.legal.contact_form_link} target="_blank">
                Help
              </a>
            </li>
            <li>
              <a href={constants.legal.contact_form_link} target="_blank">
                Contact
              </a>
            </li>
            <li>
              <a
                href={constants.legal.terms_and_condition_link}
                target="_blank"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </React.Fragment>
      );
    } else {
      return <SignIn />;
    }
  }
}
