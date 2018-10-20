const routes = require('next-routes')();
//require("next-routes") returns function object!!!

routes.add("campaigns/:address","campaigns/show");


module.exports=routes;

//exports helper for navigating our app