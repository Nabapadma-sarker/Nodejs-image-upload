const fs = require("fs");
const express = require('express');
const app = express();
var multiparty = require('multiparty');

app.get('/',(req, res)=>{
    res.sendFile( __dirname + "/src/" + "index.html" );    
});
app.post('/upload', function (req, res) {
    var form = new multiparty.Form(); 
    form.parse(req, function(err, fields, files) {
      fs.rename(files.file[0].path, __dirname + "/src/images/" + files.file[0].originalFilename,function (err) {
        if( err ){
                console.error( err );
                response = {
                    message: 'Sorry, file couldn\'t be uploaded.',
                    fields: fields
                };
        }else{
                response = {
                    message: 'File uploaded successfully',
                    files: files
                };
            }
            res.end( JSON.stringify( response ) );
        }); 
    });
 })

app.listen(3000,()=>console.log("server running"));