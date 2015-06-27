/// <reference path="../typings/references.ts" />
var fs = require('fs');

var files: { [filename: string]: string } = {},
	partsDirectory = '../../LDraw/parts/',
	pDirectory = '../../LDraw/p/';

var getSubfiles = (rootFile: string, completedCallback: (allFiles: { [filename: string]: string }) => void) => {
	
	// the file split into individual lines; 
	var lines = rootFile.split(/\r?\n/g);
	
	// keeps track of how many subfiles we've successfully fetched.
	// when completedCount === the number of subfile references, we're done with this file
	var completedCount = 0;

	// break this file down into lines, filter out any non-subfile reference lines, 
	// and map it to an array of just filenames 
	var filenames = lines.filter(l => {
		
		// only return subfile reference lines (lines that begin will line code 1)
		if (!/$\s*^/.test(l)) {
			var splitLine = l.trim().split(/\s+/g)
			if (splitLine[0] === '1') {
				return true;
			}
		}
		return false;
	}).map(m => {
		
		// return the filename
		return m.trim().split(/\s+/g)[14];
	});

	filenames.forEach((filename, i, arr) => {
		if (!(filename in files)) {
			// if we haven't already fetched this file (or at least started the fetching process)
			
			// create a placeholder for this file so we won't try and fetch it again
			files[filename] = null;
			
			// find the file
			fs.stat(partsDirectory + filename, (err, stat) => {
				if (err === null) {
					// we found the file in the parts directory 
					
					fs.readFile(partsDirectory + filename, 'utf-8', (err, data) => {
						files[filename] = data;
						
						// fetch this file's subfiles
						getSubfiles(data, () => {
							completedCount++;
							if (completedCount === arr.length) {
								completedCallback(files);
							}
						});
					});
				} else {
					// we didn't find the file in the parts directory, look in the p directory
					
					fs.stat(pDirectory + filename, (err, stat) => {
						if (err === null) {
							fs.readFile(pDirectory + filename, 'utf-8', (err, data) => {
								files[filename] = data;
								
								// fetch this file's subfiles
								getSubfiles(data, () => {
									completedCount++;
									if (completedCount === arr.length) {
										completedCallback(files);
									}
								});
							});
						} else {
							throw { isPartNotFoundError: true, message: 'Part not found: ' + filename };
						}
					});
				}
			});
		} else {
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
}

module.exports = {
	fetchFiles: (rootFile: string, completedCallback: (allFiles: { [filename: string]: string }) => void) => {
		
		// store the provided file in the "files" object
		files['$rootfile$'] = rootFile;
		
		// begin the recursive subfile-fetching process
		getSubfiles(rootFile, completedCallback);
	}
}