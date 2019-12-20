// require() and bind to a variable 
const http = require('http');
const fs = require('fs');



// returns an object that can speak http 
// const server = http.createServer((req, res) => {
const server = http.createServer((browserReq, serverResp) => {
    console.log('Oh wow, I got a request!')
    console.log(browserReq.url);
    console.log(browserReq.method);
    
    let url = browserReq.url;
    if (url === '/') {
        url = '/index.html';
    }

    //read the html file's contents so we can send it in the response 
    // arguments -> path, anonymous arrow function, 
    fs.readFile(`${__dirname}/public${url}`, (error, buf) => {
        if (error) {
            console.log(error);
            // couldnt read file 
            serverResp.writeHead(404, {
                'Content-Type': 'text.html'
            });
            serverResp.end(`<h1>File not found<h1>`);
        } else {
            //could read file and sending it back stamped 200
            serverResp.writeHead(200, {
                'Content-Type': 'text.html'
            })
            const contents = buf.toString(); 
            serverResp.end(contents);
        }
    });
    //fill server response with text, send back response, close connection, 
    // serverResponse.end(`<h1>OMG IT WORKS!!!!<h1>`);
});

// server needs to listen at a port 
server.listen(3000, () => {
    console.log('Server is listening!')
});

