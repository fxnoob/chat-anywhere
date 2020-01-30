import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ChromeServiceClass from "../../services/chromeService";

const chromeService = new ChromeServiceClass();

export default function SplitButton() {
  const anchorRef = React.useRef(null);
  const handleClick = () => {
    chromeService.openHelpPage();
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <h1>Chat Everywhere! </h1>
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
        <p style={{ fontSize: "medium" }}>
          Now, you don't need to manage the multiple accounts on social media to
          chat about websites.{" "}
        </p>
        <p style={{ fontSize: "medium" }}>
          Here we are introducing <b>Chat Everywhere</b>, a chat platform
          specifically designed for URLS, which we visit everyday!
        </p>
      </Grid>
    </Grid>
  );
}
