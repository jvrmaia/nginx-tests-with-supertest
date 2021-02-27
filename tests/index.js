'use strict';

const request = require('supertest');
const assert = require('assert');

const GATEWAY_HOST = process.env.GATEWAY_HOST || 'http://localhost:8080'
let runner = request(GATEWAY_HOST);


describe('Gateway tests', () => {

    it('Root path must return HTTP/200', (done) => {
        runner
            .get('/')
            .expect(200)
            .end(done);
    });

    it('Non existis path must return HTTP/404', (done) => {
        runner
            .get('/404')
            .expect(404)
            .end(done);
    });

    describe('Headers configurations', (done) => {

        it('Server must be NGINX', (done) => {
            runner
                .get('/')
                .expect((res) => {
                    assert.equal(res.header.server, 'nginx/1.17.9');
                })
                .end(done);
        });

        it('Content-Type must be HTML', (done) => {
            runner
                .get('/')
                .expect((res) => {
                    assert.equal(res.header['content-type'], 'text/html');
                })
                .end(done);
        });

        it('Connection must be closed', (done) => {
            runner
                .get('/')
                .expect((res) => {
                    assert.equal(res.header.connection, 'close');
                })
                .end(done);
        });

        it('Content encoding must be gzip', (done) => {
            runner
                .get('/')
                .expect((res) => {
                    assert.equal(res.header['content-encoding'], 'gzip');
                })
                .end(done);
        });

    });

    describe('Application path', (done) => {
        
        it('/echo must return to application', (done) => {
            runner
                .get('/echo')
                .expect((res) => {
                    assert.equal(res.text, 'hello world\n');
                })
                .end(done);
        });
        
    })

});
