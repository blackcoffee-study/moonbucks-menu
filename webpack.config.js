const path = require("path");
module.exports={
  mode:'development',
    entry:{
      main:"./src/js/index.js"
    },
    output:{
      filename:'[name].js',
    path: path.resolve("./dist"),
    }
}