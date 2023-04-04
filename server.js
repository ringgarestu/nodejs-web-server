const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS')


    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            // bila client menggunakan GET
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah hompage',
            }))
        } else {
            // bila client tidak menggunakan GET
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }))
        }
    } else if (url === '/about') {
        //todo3
        if (method === 'GET') {
            // respons bila client menggunakan GET
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Halo! Halaman ini adalah halaman about',
            }))
        } else if (method === 'POST') {
            // respon bila clien menggunakan POST
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: ` Halo ${name}! ini adalah halaman about`,
                }))
            });
        } else {
            // respon bila client tidak menggunakan GET atau POST
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method} request`,
            }))
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }))
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