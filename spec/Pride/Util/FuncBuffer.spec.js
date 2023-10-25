function testFuncBufferMethods (name) {
  describe('add()', function () {
    it('returns self', function () {
      const buffer = new Pride.Util.FuncBuffer();
      expect(buffer.add(function () { /** */ })).to.equal(buffer);
    });
  });

  beforeEach(function () {
    const self = this;
    this.name = name;
    this.anotherName = 'anotherBuffer';
    this.buffer = new Pride.Util.FuncBuffer();
    this.number = 0;
    this.anotherNumber = 0;
    this.fromAnotherName = 0;

    this.exampleFunction = function () {
      self.number++;
    };

    this.buffer.add(this.exampleFunction, name)
      .add(function () {
        self.anotherNumber++;
      }, name)
      .add(function () {
        self.fromAnotherName++;
      }, this.anotherName);
  });

  describe('call()', function () {
    beforeEach(function () {
      this.buffer.call(this.name);
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
        this.buffer.call(this.name);
      });

      it('can be called multiple times', function () {
        expect(this.number).to.equal(2);
        expect(this.anotherNumber).to.equal(2);
      });

      it('returns the FuncBuffer', function () {
        expect(this.buffer.call(this.name)).to.equal(this.buffer);
      });

      it("with an undefined name doesn't explode", function () {
        expect(this.buffer.call('notADefinedName')).to.equal(this.buffer);
      });
    });
  });

  describe('apply()', function () {
    beforeEach(function () {
      const self = this;
      this.touched1 = false;
      this.touched2 = false;

      this.buffer.add(
        function (x, y) {
          if (x && y) self.touched1 = true;
        },
        this.name
      );

      this.buffer.add(
        function (x, y) {
          if (x && y) self.touched2 = true;
        },
        this.name
      );

      this.buffer.apply(name, [true, true]);
    });

    it('lets you pass in an argument array', function () {
      expect(this.touched1).to.be.true;
      expect(this.touched2).to.be.true;
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.apply(name)).to.equal(this.buffer);
    });
  });

  describe('clear()', function () {
    beforeEach(function () {
      this.buffer.clear(this.name);
      this.buffer.call(this.name);
    });

    it('removes functions from the named buffer', function () {
      expect(this.number).to.equal(0);
      expect(this.anotherNumber).to.equal(0);
    });

    describe('on other buffers', function () {
      beforeEach(function () {
        this.buffer.call(this.anotherName);
      });

      it("doesn't clear other buffers", function () {
        expect(this.fromAnotherName).to.equal(1);
      });
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.clear(this.name)).to.equal(this.buffer);
    });
  });

  describe('clearAll()', function () {
    beforeEach(function () {
      this.buffer.clearAll(this.name);
      this.buffer.call(this.name);
      this.buffer.call(this.anotherName);
    });

    it('removes functions from all buffers', function () {
      expect(this.number).to.equal(0);
      expect(this.anotherNumber).to.equal(0);
      expect(this.fromAnotherName).to.equal(0);
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.clear(this.name)).to.equal(this.buffer);
    });
  });

  describe('remove()', function () {
    beforeEach(function () {
      this.buffer.remove(this.exampleFunction, this.name);
      this.buffer.call(this.name);
    });

    it('only removes the given function', function () {
      expect(this.number).to.equal(0);
      expect(this.anotherNumber).to.equal(1);
    });

    it('returns the FuncBuffer', function () {
      expect(this.buffer.remove(this.name)).to.equal(this.buffer);
    });
  });
}

const { expect } = require('chai');
const Pride = require('../../../pride').Pride;

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
