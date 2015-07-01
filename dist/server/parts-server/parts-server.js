/// <reference path="../typings/references.ts" />
/// <reference path="./file-fetcher.ts" />
// to set up node and apache to run on the same server: http://stackoverflow.com/a/18604082/1063392
var express = require('express');
var bodyParser = require('body-parser');
var fileFetcher = require('./file-fetcher');
var domain = require('domain');
var app = express();
app.use(bodyParser.urlencoded({ extended: false, limit: 1048576 }));
app.post('/', function (req, res) {
    var d = domain.create();
    var responseHasBeenSent = false;
    d.on('error', function (er) {
        if (!responseHasBeenSent) {
            responseHasBeenSent = true;
            if (er.isPartNotFoundError) {
                console.log(er.message);
                res.status(500).send({ type: 'partNotFound', data: er.message });
            }
            else {
                console.log(er);
                res.status(500).send({ type: 'unknown', data: er });
            }
        }
    });
    d.run(function () {
        fileFetcher.fetchFiles(req.body.file, function (allFiles) {
            res.status(200).send(allFiles);
        });
    });
});
var server = app.listen(17352);
//# sourceMappingURL=parts-server.js.map