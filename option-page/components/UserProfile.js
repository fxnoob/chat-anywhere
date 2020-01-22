import React from "react";
import "./UserProfile.css";

var user = {
  basicInfo: {
    displayName: "Jane Doe",
    email: "Los Angeles, CA",
    photoURL: "http://lorempixel.com/500/500/people"
  }
};

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
        </div>
        <div className="bottom">
          <h4>Biography</h4>
          <p>
            Chat on any website with other users.
          </p>
        </div>
      </div>
    );
  }
}

export default (props) => {
  return (
    <div id="user-profile">
      <MainPanel info={props.info} />
    </div>
  );
}
