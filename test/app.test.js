const knex = require('../db/knex');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const fixtures = require('./fixtures');
const {
  set
} = require('../app');


describe('CRUD Users', () => {
  before((done) => {
    // run mirgration
    knex.migrate.latest().then(() => {
      //run seeds
      return knex.seed.run();
    }).then(() => done());
  });

  it('List all records ', function (done) {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('array')
        done();
      }).catch(done);
  });

  it('Show a record by id ', function (done) {
    request(app)
      .get('/api/v1/users/1ac7c5c5-26df-4e33-b562-0193707e39da')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object')
        expect(response.body).to.deep.equal(fixtures.users[0]);
        done();
      }).catch(done);
  });

  it('Creates a record', function (done) {
    request(app)
      .post('/api/v1/users')
      .send(fixtures.user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a('object');
        fixtures.user.id = res.body.id;
        expect(res.body).to.deep.equal(fixtures.user);
        done();
      }).catch(error => {
        console.log(error);
      });
  });

  it('Updates a record', function (done) {
    fixtures.user.password = "PASSWORD123!";
    request(app)
      .put(`/api/v1/users/0ab38abe-12d0-406c-b884-51d1f4955b23`)
      .send(fixtures.user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.user);
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  it('Deletes a record', function (done) {
    fixtures.user.password = "PASSWORD123!";
    request(app)
      .delete(`/api/v1/users/0ab38abe-12d0-406c-b884-51d1f4955b23`)
      .send(fixtures.user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });
});