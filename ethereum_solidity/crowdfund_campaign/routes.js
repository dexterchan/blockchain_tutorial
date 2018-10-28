const routes = require('next-routes')();
//require("next-routes") returns function object!!!

routes
    .add("/campaigns/new","/campaigns/new")
    .add("/campaigns/:address","/campaigns/show")
    .add("/campaigns/:address/requests","/campaigns/requests/index")
    .add("/campaigns/:address/requests/new","/campaigns/requests/new");


module.exports=routes;

//exports helper for navigating our app