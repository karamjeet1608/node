//1. create http server
//2. send an html page in the response
//3. route the request
//4. redirect the request
//5. parse the data using stream and buffer
//6. write the data on the file

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    const url = req.url;
    const method = req.method;
    if (url === '/details'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>To use this utility click on the below link</h1></body>');
        res.write('<body><h1><a href="//localhost:3045/utility">Click here to use utility</a></h1></body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/utility'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><h1>Enter the Message!!!!!</h1><head>');
        res.write('<body><form action ="/complete" method = "POST"><input type="text" name = "message"><button type = "submit">Send</button></form></body>');
        res.write('<body><form action=');
        res.write('</html>');
        return res.end();
    }
    if (url === '/complete' && method === 'POST')
{
    const body = [];
    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('Utility.txt', message);
    });
    res.statusCode =302;
    res.setHeader('Location','/');
    return res.end();
}
if (url === '/complete')
{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><h1>submission successful!!!!!!!!!!!!!!!!</h1><head>');
    res.write('</html>');
    return res.end();
}
res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<body><h1>Welcome to utility</h1></body>')
res.write('<body><h2>this utility writes the entered text on the text file and saves that on the local machine</h2></body>')
res.write('<body><h3><a href="//localhost:3045/details">Click here to see utility details</a></h3></body>')
res.write('</html>');
res.end();
});
server.listen(3045);