var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

var Storage = require('./storage');

chai.use(chaiAsPromised);

describe('Storage', function() {
  beforeEach(function() {
    this.storage = new Storage();
    return this.storage.setup();
  });
 
  afterEach(function() {
    this.storage.disconnect();
  });

  it('should populate storage without an error', function() {
    return expect(this.storage.populate(1234)).to.be.fulfilled;
  });

  it('should retrieve correct value after being populated', function() {
    var promise = this.storage.populate(1234).then(this.storage.score.bind(this.storage));
    return expect(promise).to.become(1234);
  });
});
