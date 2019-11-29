const mongoose = require("mongoose");

let User = mongoose.model("users", {
  name: {
    type: String
  }
  
});

module.exports = { User };
