var http=require('http');
var fs=require('fs');
http.createServer(function(request,response){
   fs.readFile("./mapper/getMap.html",function(error,data){
       if(error){
           response.writeHead(404,{"Content-type":"text/plain"});
           response.end("Sorry the page was not found");
       }else{
           response.writeHead(202,{"Content-type":"text/html"});
           response.end(data);

       }
   });
}).listen(8080);