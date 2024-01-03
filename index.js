const express = require('express'), app =  express();
app
    .use("/", express.static(__dirname + '/public', {maxAge: "3d"}));

app.listen(8000, () => {
    console.log(`listening on port 8000`)
});
