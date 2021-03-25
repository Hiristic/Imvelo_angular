import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Chem from '../models/chem';

chai.use(chaiHttp).should();

describe('Chems', () => {

  beforeEach(done => {
    Chem.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for chems', () => {

    it('should get all the chems', done => {
      chai.request(app)
        .get('/api/chems')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get chems count', done => {
      chai.request(app)
        .get('/api/chems/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new chem', done => {
      const chem = new Chem({ name: 'Fluffy', weight: 4, type: 'Dangerous' });
      chai.request(app)
        .post('/api/chem')
        .send(chem)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('type');
          done();
        });
    });

    it('should get a chem by its id', done => {
      const chem = new Chem({ name: 'Chem', weight: 2, type: 'Danger' });
      chem.save((error, newChem) => {
        chai.request(app)
          .get(`/api/chem/${newChem.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('type');
            res.body.should.have.property('_id').eql(newChem.id);
            done();
          });
      });
    });

    it('should update a chem by its id', done => {
      const chem = new Chem({ name: 'Chem', weight: 2, type: 'Danger' });
      chem.save((error, newChem) => {
        chai.request(app)
          .put(`/api/chem/${newChem.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a chem by its id', done => {
      const chem = new Chem({ name: 'Chem', weight: 2, type: 'Danger' });
      chem.save((error, newChem) => {
        chai.request(app)
          .del(`/api/chem/${newChem.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


