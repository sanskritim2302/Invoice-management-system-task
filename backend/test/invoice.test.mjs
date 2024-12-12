import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Invoice API', () => {
  it('should return a welcome message on GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome to the Invoice Management API!');
        done();
      });
  });

  it('should fetch a list of invoices on GET /api/invoices', (done) => {
    chai.request(app)
      .get('/api/invoices')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('client');
        expect(res.body[0]).to.have.property('amount');
        expect(res.body[0]).to.have.property('status');
        done();
      });
  });
});
