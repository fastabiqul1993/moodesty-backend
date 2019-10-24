const request = require("request");
const querystring = require("querystring");
const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:5000/callback";

module.exports = {
  login: (req, res) => {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.SPOTIFY_CLIENT,
          scope: "user-read-private user-read-email",
          redirect_uri
        })
    );
  },
  callback: (req, res) => {
    let code = req.query.code || null;
    let authOption = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.SPOTIFY_CLIENT + ":" + process.env.SPOTIFY_SECRET
          ).toString("base64")
      },
      json: true
    };

    request.post(authOption, (error, response, body) => {
      let access_token = body.access_token;
      let uri = process.env.FRONTED_URI || "http://localhost:3000/home";
      res.redirect(uri + "?access_token=" + access_token);
    });
  }
};
