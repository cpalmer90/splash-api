const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(cors());
const PORT = process.env.PORT || 8090;

app.get("/", (request, response) => {
  response.status(200).json("yo,yo,yo give me your head gold");
});

app.get("/photos", async (request, response) => {
  const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=goat`;
  const res = await axios.get(API);
  //   console.log(res.data.results[0]);

  //   response.status(200).json("Hello");
  const photos = res.data.results.map((photo) => {
    return {
      id: photo.id,
      img_url: photo.urls.regular,
      original_image: photo.links.self,
      photographer: photo.user.name,
    };
  });
  response.status(200).json(photos);
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
