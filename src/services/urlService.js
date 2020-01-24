const urlWithoutQueryParameters = urlString => {
  let u = new URL(urlString);
  return u.origin + u.pathname;
};

export default {
  urlWithoutQueryParameters
};
