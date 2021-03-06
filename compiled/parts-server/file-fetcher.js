/// <reference path="../typings/references.ts" />
var fs = require('fs');
var files = {}, encoding = 'utf-8', rootDirectory = __dirname + '/../../LDraw/', partsDirectory = rootDirectory + 'parts/', pDirectory = rootDirectory + 'p/', unofficialPartsDirectory = rootDirectory + 'Unofficial/parts/', unofficialPDirectory = rootDirectory + 'Unofficial/p/';
var getSubfiles = function (rootFile, completedCallback) {
    // the file split into individual lines; 
    var lines = rootFile.split(/\r?\n/g);
    // keeps track of how many subfiles we've successfully fetched.
    // when completedCount === the number of subfile references, we're done with this file
    var completedCount = 0;
    // break this file down into lines, filter out any non-subfile reference lines, 
    // and map it to an array of just filenames 
    var filenames = lines.filter(function (l) {
        // only return subfile reference lines (lines that begin will line code 1)
        if (!/$\s*^/.test(l)) {
            var splitLine = l.trim().split(/\s+/g);
            if (splitLine[0] === '1') {
                return true;
            }
        }
        return false;
    }).map(function (m) {
        // return the filename
        return m.trim().split(/\s+/g)[14];
    });
    filenames.forEach(function (filename, i, arr) {
        filename = filename.toLowerCase().replace(/\\/g, '/');
        if (!(filename in files)) {
            // if we haven't already fetched this file (or at least started the fetching process)
            // create a placeholder for this file so we won't try and fetch it again
            files[filename] = null;
            // find the file
            fs.stat(partsDirectory + filename, function (err, stat) {
                if (err === null) {
                    // we found the file in the parts directory 
                    fs.readFile(partsDirectory + filename, encoding, function (err, data) {
                        files[filename] = data;
                        // fetch this file's subfiles
                        getSubfiles(data, function () {
                            completedCount++;
                            if (completedCount === arr.length) {
                                completedCallback(files);
                            }
                        });
                    });
                }
                else {
                    // we didn't find the file in the parts directory, look in the p directory
                    fs.stat(pDirectory + filename, function (err, stat) {
                        if (err === null) {
                            fs.readFile(pDirectory + filename, encoding, function (err, data) {
                                files[filename] = data;
                                // fetch this file's subfiles
                                getSubfiles(data, function () {
                                    completedCount++;
                                    if (completedCount === arr.length) {
                                        completedCallback(files);
                                    }
                                });
                            });
                        }
                        else {
                            // still no luck, let's check the unofficial parts directory
                            fs.stat(unofficialPartsDirectory + filename, function (err, stat) {
                                if (err === null) {
                                    // we found the file in the parts directory 
                                    fs.readFile(unofficialPartsDirectory + filename, encoding, function (err, data) {
                                        files[filename] = data;
                                        // fetch this file's subfiles
                                        getSubfiles(data, function () {
                                            completedCount++;
                                            if (completedCount === arr.length) {
                                                completedCallback(files);
                                            }
                                        });
                                    });
                                }
                                else {
                                    // last chance, let's check the unofficial p directory
                                    fs.stat(unofficialPDirectory + filename, function (err, stat) {
                                        if (err === null) {
                                            // we found the file in the parts directory 
                                            fs.readFile(unofficialPDirectory + filename, encoding, function (err, data) {
                                                files[filename] = data;
                                                // fetch this file's subfiles
                                                getSubfiles(data, function () {
                                                    completedCount++;
                                                    if (completedCount === arr.length) {
                                                        completedCallback(files);
                                                    }
                                                });
                                            });
                                        }
                                        else {
                                            // we didn't find the part, let's ignore it,
                                            // it might be part of a .mpd
                                            files[filename] = '';
                                            completedCount++;
                                            if (completedCount === arr.length) {
                                                completedCallback(files);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            // we've previously fetched this file (or are already in the process of fetching it).
            // don't try and fetch it again.
            completedCount++;
            if (completedCount === arr.length) {
                completedCallback(files);
            }
        }
    });
    if (filenames.length === 0) {
        // this file didn't have any further subfile references, so just call the callback immediately
        completedCallback(files);
    }
};
module.exports = {
    fetchFiles: function (rootFile, completedCallback) {
        // store the provided file in the "files" object
        files['$rootfile$'] = rootFile;
        // begin the recursive subfile-fetching process
        getSubfiles(rootFile, function (allFiles) {
            // also get LDConfig.ldr
            var ldConfigFilename = 'LDConfig.ldr';
            fs.readFile(rootDirectory + ldConfigFilename, encoding, function (err, data) {
                if (err === null) {
                    allFiles[ldConfigFilename] = data;
                    completedCallback(allFiles);
                }
                else {
                    throw 'LDConfig.ldr not found';
                }
            });
        });
    }
};
//# sourceMappingURL=file-fetcher.js.map