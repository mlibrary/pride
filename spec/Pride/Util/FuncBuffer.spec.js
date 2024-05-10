const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

function testFuncBufferMethods (name) {
  const anotherName = 'anotherBuffer';

  beforeEach(function () {
    this.buffer = new Pride.Util.FuncBuffer();
    this.number = 0;
    this.anotherNumber = 0;
    this.fromAnotherName = 0;

    this.exampleFunction = () => {
      this.number++;
    };

    this.buffer.add(this.exampleFunction, name)
      .add(() => {
        this.anotherNumber++;
      }, name)
      .add(() => {
        this.fromAnotherName++;
      }, anotherName);
  });

  describe('clear()', function () {
    beforeEach(function () {
      this.buffer.clear(name);
      this.buffer.call(name);
    });

    it('removes functions from the named buffer', function () {
      expect(this.number).to.equal(0);
      expect(this.anotherNumber).to.equal(0);
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.clear(name)).to.equal(this.buffer);
    });

    it("doesn't clear other buffers", function () {
      this.buffer.call(anotherName);
      expect(this.fromAnotherName).to.equal(1);
    });
  });

  describe('clearAll()', function () {
    beforeEach(function () {
      this.buffer.clearAll(name);
      this.buffer.call(name);
      this.buffer.call(anotherName);
    });

    it('removes functions from all buffers', function () {
      expect(this.number).to.equal(0);
      expect(this.anotherNumber).to.equal(0);
      expect(this.fromAnotherName).to.equal(0);
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.clear(name)).to.equal(this.buffer);
    });
  });

  describe('add()', function () {
    it('returns self', function () {
      const buffer = new Pride.Util.FuncBuffer();
      expect(buffer.add(function () { /** */ })).to.equal(buffer);
    });
  });

  describe('remove()', function () {
    beforeEach(function () {
      this.buffer.remove(this.exampleFunction, name);
      this.buffer.call(name);
    });

    it('only removes the given function', function () {
      expect(this.number).to.equal(0);
      expect(this.anotherNumber).to.equal(1);
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.remove(name)).to.equal(this.buffer);
    });
  });

  describe('apply()', function () {
    let [touched1, touched2] = Array(2).fill(false);

    beforeEach(function () {
      this.buffer.add(
        (x, y) => {
          if (x && y) {
            touched1 = !touched1;
            touched2 = !touched2;
          }
        },
        name
      );

      this.buffer.apply(name, ['arg1', 'arg2']);
    });

    it('lets you pass in an argument array', function () {
      expect(touched1).to.be.true;
      expect(touched2).to.be.true;
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.apply(name)).to.equal(this.buffer);
    });
  });

  describe('call()', function () {
    beforeEach(function () {
      this.buffer.call(name);
    });

    it('calls functions registered under the given name', function () {
      expect(this.number).to.equal(1);
      expect(this.anotherNumber).to.equal(1);
    });

    it("doesn't call functions registered under any other name", function () {
      expect(this.fromAnotherName).to.equal(0);
    });

    describe('after a second call()', function () {
      beforeEach(function () {
        this.buffer.call(name);
      });

      it('can be called multiple times', function () {
        expect(this.number).to.equal(2);
        expect(this.anotherNumber).to.equal(2);
      });

      it('returns the FuncBuffer', function () {
        expect(this.buffer.call(name)).to.equal(this.buffer);
      });

      it("with an undefined name doesn't explode", function () {
        expect(this.buffer.call('notADefinedName')).to.equal(this.buffer);
      });
    });
  });
}

describe('Pride.Util.FuncBuffer', function () {
  it('can be extended', function () {
    let thisValue = null;
    const example = new Pride.Util.FuncBuffer(function () {
      thisValue = this;
    });
    expect(example).to.equal(thisValue);
  });

  describe('without a name', function () {
    testFuncBufferMethods();
  });

  describe('with a name', function () {
    testFuncBufferMethods('thisIsAName');
  });
});
