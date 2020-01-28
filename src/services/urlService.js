const psl = require("psl");
const urlWithoutQueryParameters = urlString => {
  let u = new URL(urlString);
  return u.origin + u.pathname;
};
const extractHostname = url => {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
};

export { urlWithoutQueryParameters, extractHostname };
