const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prove 1</title><head>');
    res.write('<body>');
    res.write('<h1>Welcome To My First Assignment!</h1>');
    res.write('<p>Please enter your username below:</p>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add Username</button></form>');
    res.write('</body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prove 1 Users</title><head>');
    res.write('<body>');
    res.write('<h1>List of Users</h1>');
    res.write('<ul>');
    res.write('<li>Jennifer</li>');
    res.write('<li>Nate</li>');
    res.write('<li>Jefferson</li>');
    res.write('<li>Jackson</li>');
    res.write('<li>Mason</li>');
    res.write('<li>Jenson</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
});

server.listen(3000);