#!/usr/bin/env node

// 1: Preview port 7000
// 2: In Chrome DevTools console execute:
//  2.1 fetch('/', {headers: {'Authorization': '123.234.345'}}).then(res => res.text()).then(data => console.log(data))
//      gives 200
//  2.2 fetch('/', {headers: {'Authorization': 'Bearer 123.234.345'}}).then(res => res.text()).then(data => console.log(data))
//      gives 401

const http = require('http');
http.createServer((req, res) => {
    res.end('Authorization: ' + req.headers['authorization']);
}).listen(7000)
