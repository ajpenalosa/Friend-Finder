// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// ================================================================================

app.use('/assets', express.static('app/public/assets'));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
