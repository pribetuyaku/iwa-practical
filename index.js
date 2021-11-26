const  express = require('express'), //Allows to respond to http requests, defining routing and rendes the requied content
       fs = require ('fs'), //working with the file system (read and write)
       http = require('http'), //http server
       path = require('path'), // utility that allows us to work with directory
       xml2js = require('xml2js'),//xml -> json conveter
       xmlParse = require('xslt-processor').xmlParse, //parsing xml
       xsltProcess = require('xslt-processor').xsltProcess; //processing xslt

const   router = express(),
        server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views'))); //serving static content from views folder

router.get('/', function(req,res){
     res.writeHead(200,{'Content-Type' : 'text/html'})
     let xml = fs.readFileSync('PaddysCafe.xml','utf-8'),
        xsl = fs.readFileSync('PaddysCafe.xsl', 'utf-8');

    console.log(xml);
    console.log(xsl);

    let doc = xmlParse(xml),
        stylesheet = xmlParse(xsl);

    let result = xsltProcess(doc,stylesheet);

    console.log(result);

    res.end(result.toString());
});

server.listen(process.env.PORT  || 3000, process.env.IP  || "0.0.0.0", function(){
    const adddr = server.address();
    console.log('Server listening at', adddr.address + ':' + adddr.port)
});

