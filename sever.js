const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Archivo no encontrado');
      return;
    }
    
    // Determinar tipo de contenido
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'application/javascript';
    if (ext === '.json') contentType = 'application/json';
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') contentType = 'image/png';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));
