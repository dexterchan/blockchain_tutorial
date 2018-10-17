
const next = require('next');
const port = 3000;
const app = next({
    dev: process.env.NODE_ENV !== 'production'
    //ask our app to look for global env variable "NODE_ENV"
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);


// Without express
const {createServer}=require("http");
app.prepare().then(() => {
  createServer(handler).listen(port,
  (err)=>{
      if (err) throw err;
      console.log("Ready on localhost port:"+port);
  });
})