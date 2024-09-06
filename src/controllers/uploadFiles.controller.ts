import formidable from 'formidable';
import { IncomingMessage,ServerResponse } from 'http';
import path from 'path';


export const uploadFilesToDb = async( req: IncomingMessage,res:ServerResponse) =>{
   const form = formidable({
    uploadDir:path.join(__dirname,'../uploads'),
    keepExtensions: true,                     
    maxFileSize: 200 * 1024 * 1024,             
    multiples: true 
   })
   form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error parsing the form'+err }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      message: 'File(s) uploaded successfully',
      files: files
    }));
  });
}