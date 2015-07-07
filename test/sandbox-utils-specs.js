// transpile:mocha

import { withSandbox, withMocks, verify } from '..';
import chai from 'chai';
import 'mochawait';

chai.should();
const expect = chai.expect;

let funcs = {
  abc: () => { return 'abc'; }
};

describe('sandbox-utils', () => {
  describe('withSandbox', withSandbox({mocks: {funcs}}, (S) => {
    it('should create a sandbox and mocks', () => {
      expect(S.sandbox).to.exist;
      expect(S.mocks.funcs).to.exist;
      funcs.abc().should.equal('abc');
      S.mocks.funcs.expects('abc').once().returns('efg');
      funcs.abc().should.equal('efg');
      S.sandbox.verify();
    });

    it('should be back to normal', () => {
      funcs.abc().should.equal('abc');
    });

    it('S.verify', () => {
      expect(S.sandbox).to.exist;
      expect(S.mocks.funcs).to.exist;
      S.mocks.funcs.expects('abc').once().returns('efg');
      funcs.abc().should.equal('efg');
      S.verify();
    });

    it('verify', () => {
      expect(S.sandbox).to.exist;
      expect(S.mocks.funcs).to.exist;
      S.mocks.funcs.expects('abc').once().returns('efg');
      funcs.abc().should.equal('efg');
      verify(S);
    });


  }));

  describe('withMocks', withMocks({funcs}, (mocks, S) => {
    it('should create sandox and mocks', () => {
      expect(mocks).to.exist;
      expect(S).to.exist;
      funcs.abc().should.equal('abc');
      mocks.funcs.expects('abc').once().returns('efg');
      funcs.abc().should.equal('efg');
      S.sandbox.verify();
    });
    it('verify', () => {
      expect(S.sandbox).to.exist;
      expect(S.mocks.funcs).to.exist;
      funcs.abc().should.equal('abc');
      mocks.funcs.expects('abc').once().returns('efg');
      funcs.abc().should.equal('efg');
      verify(mocks);
    });
  }));
});
