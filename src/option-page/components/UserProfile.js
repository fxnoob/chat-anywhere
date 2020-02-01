import React from "react";
import constants from "../../../constants";

class Avatar extends React.Component {
  render() {
    var image = this.props.image,
      style = {
        width: this.props.width || 50,
        height: this.props.height || 50
      };

    if (!image) return null;

    return (
      <div className="avatar" style={style}>
        <img src={this.props.image} />
      </div>
    );
  }
}

class MainPanel extends React.Component {
  render() {
    const info = this.props.info;
    if (info.loading) {
      return "loading...";
    }
    return (
      <div>
        <div className="top">
          <Avatar image={info.photoURL} width={100} height={100} />
          <h2>{info.displayName}</h2>
          <h3>{info.email}</h3>
          <hr />
          <p style={{ fontSize: "x-large", fontWeight: "500", color: "black" }}>
            Close this tab. Chat on any website with other users.
          </p>
        </div>
        <div className="bottom">
          Creator@<a href="https://github.com/fxnoob">Hitesh Saini</a>
          <br />
          <a href={constants.legal.contact_form_link} target="_blank">
            Support
          </a>
          <a
            style={{ marginLeft: "4px" }}
            href={constants.legal.privacy_policy_link}
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    );
  }
}

export default props => {
  return (
    <div id="user-profile">
      <MainPanel info={props.info} />
    </div>
  );
};
