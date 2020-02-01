import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ChromeServiceClass from "../../services/chromeService";
import constants from "../../../constants";

const chromeService = new ChromeServiceClass();

export default function SplitButton() {
  const anchorRef = React.useRef(null);
  const handleClick = () => {
    chromeService.openHelpPage();
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <h1>{constants.appConfig.appName} </h1>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button style={{ background: "#35cce6" }} onClick={handleClick}>
            Sign In
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={10}>
        <ul style={{ background: "aliceblue" }}>
          <li> find deals on Amazon and Ebay</li>
          <li> get live help on Stack Overflow</li>
          <li> chat with visitors to their own sites</li>
          <li> watch and chat about shows together on Netflix</li>
          <li> solicit career advice on LinkedIn</li>
          <li> chat with other developers on localhost</li>
          <li> instantly connect in online classrooms</li>
          <li>
            {" "}
            chat about their favorite football team on nfl.com or goal.com;
          </li>
        </ul>
        <p style={{ fontSize: "medium" }}>
          Chat about every topic imaginable on over 189 million websites.
        </p>
      </Grid>
      <Grid item xs={10}>
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
      </Grid>
    </Grid>
  );
}
