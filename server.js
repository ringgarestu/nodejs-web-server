const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            // bila client menggunakan GET
            response.end(`<h1>Ini adalah hompage`);
        } else {
            // bila client tidak menggunakan GET
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`)
        }
    } else if (url === '/about') {
        //todo3
        if (method === 'GET') {
            // respons bila client menggunakan GET
            response.end('<h1> Halo! Halaman ini adalah halaman about</h1>')
        } else if (method === 'POST') {
            // respon bila clien menggunakan POST
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1> Halo ${name}! ini adalah halaman about</h1>`);
            });
        } else {
            // respon bila client tidak menggunakan GET atau POST
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`)
        }
    } else {
        response.end(`<h1>Halaman tidak ditemukan!</h1>`)
    }


    // BODY REQUEST
    if (method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }

    if (method === 'POST') {
        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(`<h1>Hai, ${name}!</h1>`);
        });
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});