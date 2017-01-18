const serve = require('koa-static');
const koa = require('koa');
//const co = require("bluebird").coroutine;
const co = require('co');
const mysql = require('koa-mysql');
const websockify = require('koa-websocket');
const route = require('koa-route');
const app = websockify(koa());
const config = require('./config');
const db = mysql.createPool({
    user: config.dpUser,
    password: config.dpPassword,
    database: config.dpDatabase,
    host: config.dpHost
});

app.ws.use(route.all('/', function* (next) {
    const methods = {
        getList: function* (ws, data) {
            try {
                const res = yield db.query("select * from department");
                ws.send(JSON.stringify({
                    api: data.api,
                    data: res,
                    err: null
                }));
            }
            catch (err) {
                ws.send(JSON.stringify({
                    api: data.api,
                    data: '500 error',
                    err: err
                }));
            }
        },
        get: function* (ws, data) {
            try {
                const res = yield db.query(`select * from department where id = ${data.id}`);
                ws.send(JSON.stringify({
                    api: data.api,
                    data: res,
                    err: null
                }));
            }
            catch (err) {
                ws.send(JSON.stringify({
                    api: data.api,
                    data: '500 error',
                    err: err
                }));
            }
        },
        // TODO create method api
        update: function* (ws, data) {
            try {
                const res = yield db.query(`select * from department where id = ${data.id}`);
                ws.send(JSON.stringify({
                    api: data.api,
                    data: res,
                    err: null
                }));
            }
            catch (err) {
                ws.send(JSON.stringify({
                    api: data.api,
                    data: '500 error',
                    err: err
                }));
            }
        },
        create: function* (ws, data) {
            try {
                const res = yield db.query(`insert into department (name, department_id) values("${data.name}", "${data.departmentId}")`);
                ws.send(JSON.stringify({
                    api: data.api,
                    data: res,
                    err: null
                }));
            }
            catch (err) {
                ws.send(JSON.stringify({
                    api: data.api,
                    data: 'error add',
                    err: err
                }));
            }
        }
    };
    const ws = this.websocket;
    this.websocket.on('message', function(message) {
        const data = JSON.parse(message);
        co(methods[JSON.parse(message).api](ws, data));
    });

    yield next;
}));

app.use(serve('src/client/'));

app.listen(3000);

console.log('listening on port 3000');