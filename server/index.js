import express from "express";
import FormData from "form-data";
import bodyParser from "body-parser";
import fetch from "node-fetch";



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", '2ebc93aaff109e035068');
  data.append("client_secret", 'e1b823912a3f86d71ece9aff6750bc7fd1c11974');
  data.append("code", code);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      return res.status(200).json(access_token)
    }).catch((error) => {
        return res.status(400).json(error);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));