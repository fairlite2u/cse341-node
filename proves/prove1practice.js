const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Prove 1</title><head>');
      res.write('<body>');
      res.write('<h1>Welcome to Prove 1!</h1>');    
      res.write('<p>Please enter your username below to add it to the database</p>');    
      res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit"> Add Username</button></form>');
      res.write('</body>');
      res.write('</html>');
      return res.end(); 
  }
  if (url === '/users') {
    fs.readFile('./usernames.txt', 'utf8', (err, data) => {
      if (err) console.log(err);
      const usernames = data.split('\n');
      let userList = "";
      usernames.forEach(user => {
        userList += ('<li>' + user + '</li>');
        return userList;
      });
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Prove 1 Users</title><head>');
      res.write('<body><h1>List of Users</h1><ul>');
      res.write(`${userList}`);
      res.write('</ul></body>');
      res.write('</html>');
      return res.end();
    });
  }
  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);

      const addUsername = parsedBody.split('=')[1];
      fs.appendFile('usernames.txt', addUsername + '\n', err => {
        if (err) console.log(err);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
});

server.listen(3000);