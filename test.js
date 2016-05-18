var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();


//异步 （阻塞）
/*
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log('end')*/

//同步  （非阻塞）
/*fs.readFile('1.txt',function(err,data){
  if (err) {
    return console.log(err);
  };
  console.log(data.toString())
})
console.log('end2')*/

//事件
/*

//
var connectHandler = function connected(){
  console.log('链接成功');

  eventEmitter.emit('data_received');
}
//绑定connection 事件处理程序
eventEmitter.on('connection',connectHandler);

eventEmitter.on('data_received',function(){
  console.log('数据接收成功');
})

eventEmitter.emit('connection');

console.log('end3');*/

/*eventEmitter.on('some_Event',function(){
  console.log('some_Event事件触发');
})
setTimeout(function(){
  eventEmitter.emit('some_Event');
},1000)
*/

/*eventEmitter.on('someEvent',function(a1,a2){
  console.log('someEvent事件触发1',a1,a2);
})
eventEmitter.on('someEvent',function(a1,a2){
  console.log('someEvent事件触发2',a1,a2);
})
console.log(eventEmitter.listeners('someEvent'))
eventEmitter.emit('someEvent','111',222);*/

/*var list1 = function list1(){
  console.log('监听1')
}
var list2 = function list2(){
  console.log('监听2')
}

eventEmitter.addListener('com',list1);
eventEmitter.on('com',list2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'com');
console.log(eventListeners+' 个监听器监听连接事件。');

eventEmitter.emit('com');

//移除 list1
eventEmitter.removeListener('com',list1);
console.log('list1不再被监听');
eventEmitter.emit('com');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'com');
console.log(eventListeners+' 个监听器监听连接事件。');

console.log('end4')
*/

//eventEmitter.emit('error')


/*fs.open('input.txt','r+',function(err,fd){
  if (err) {
    return console.error(err)
  };
  console.log('搞定啦')
})
*/
/*console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");
   
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
*/


var express = require('express');
var app = express();

var bodyParser = require('body-parser');
/*var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp'}).array('image'));



app.get('a.html',function(req,res){
  res.sendFile(__dirname + '/'+ 'a.html')
})


app.post('/file_upload',function(req,res){
  console.log(req.files[0]);
  var des_file = __dirname+'/'+req.files[0].originalname;
  fs.readFile(req.files[0].path,function(err,data){
    fs.writeFile(des_file,data,function(err){
      if (err) {
        console.log(err)
        console.error(err)
      } else {
        response = {
          message:'File Upload successfully',
          filename:req.files[0].originalname
        }
      };
      console.log(response);
      res.end(JSON.stringify(response))


    })
  })


})*/


var server = app.listen(8081,function(){
  var host = server.address().address
  var port = server.address.port
  console.log('访问地址:http://%s:%s',host,port)
})







app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  var a = 1
  next(a);
});

app.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  console.log(a)
  res.end();
});















