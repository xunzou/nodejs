var fs = require('fs');  
var path = require('path');  
var multer  = require('multer')


var readStream = fs.createReadStream('./1.mp4')
var writeStream = fs.createWriteStream('./2.mp4')

readStream.on('data',function (chunk) {
	if (writeStream.write(chunk) === false) {
		console.log('still cached')
		readStream.pause()
	};
	//writeStream.write(chunk)
})

readStream.on('end',function(){
	writeStream.end()
})

writeStream.on('drain',function(){
	console.log('data drains')
	readStream.resume()
})



