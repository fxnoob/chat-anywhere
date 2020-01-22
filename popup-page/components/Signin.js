import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from '@material-ui/core/Paper';
import ChromeServiceClass from '../../src/services/chromeService';

const chromeService = new ChromeServiceClass();

export default function SplitButton() {
  const anchorRef = React.useRef(null);
  const handleClick = () => {
    chromeService.openHelpPage();
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Paper>
          <h2>Chat on Every Website.</h2>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={handleClick}>Sign In</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
