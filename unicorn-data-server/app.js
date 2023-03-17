const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Intializes the data for the different unicorns
let unicornData = [
  { name: "daisy", location: "barn", color: "yellow" },
  { name: "rose", location: "barn", color: "red" },
  { name: "lily", location: "barn", color: "blue" },
  { name: "petunia", location: "barn", color: "green" },
  { name: "zinnia", location: "barn", color: "black" },
  { name: "pansy", location: "barn", color: "orange" },
  { name: "azalea", location: "barn", color: "purple" },
  { name: "jasmine", location: "barn", color: "pink" },
  { name: "cassia", location: "barn", color: "brown" },
  { name: "erica", location: "barn", color: "silver" },
  { name: "violet", location: "barn", color: "gold" },
  { name: "iris", location: "barn", color: "white" },
];

//Creates POST api for changing unicorn location
app.post("/unicorn-post", (req, res) => {
  const postData = req.body;
  const selectedUnicorn = postData.unicorn;
  const unicornLocation = postData.location;

  unicornData = unicornData.map((unicorn) => {
    if (unicorn.name == selectedUnicorn) {
      return {
        name: unicorn.name,
        color: unicorn.color,
        location: unicornLocation,
      };
    } else {
      return unicorn;
    }
  });
  res.send(`"New Data: ${JSON.stringify(unicornData)}`);
});

//Creates GET api for receiving unicorn data
app.get("/unicorn-get", (req, res) => {
  res.json(unicornData);
});

app.listen(port, () => console.log(`Yay for Unicorns`));
