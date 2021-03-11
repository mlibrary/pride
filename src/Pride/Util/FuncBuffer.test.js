import { expect } from 'chai';
import FuncBuffer from './FuncBuffer';

function testFuncBufferMethods(name) {
  describe('add()', function() {
    it('returns self', function() {
      const buffer = new FuncBuffer();
      expect(buffer.add(() => {})).to.equal(buffer);
    });
  });

  beforeEach(function() {
    this.buffer = new FuncBuffer();
    this.number = 0;
    this.another_number = 0;
    this.example_function = () => this.number++;
    this.name = name;
    this.another_name = 'another_buffer';
    this.from_another_name = 0;

    this.buffer.add(this.example_function, name)
      .add(() => this.another_number++, name)
      .add(() => this.from_another_name++, this.another_name);
  });

  describe('call()', function() {
    beforeEach(function() {
      this.buffer.call(this.name);
    });

    it('calls functions registered under the given name', function() {
      expect(this.number).to.equal(1);
      expect(this.another_number).to.equal(1);
    });

    it("doesn't call functions registered under any other name", function() {
      expect(this.from_another_name).to.equal(0);
    });

    describe('after a second call()', function() {
      beforeEach(function() {
        this.buffer.call(this.name);
      });

      it('can be called multiple times', function() {
        expect(this.number).to.equal(2);
        expect(this.another_number).to.equal(2);
      });

      it('returns the FuncBuffer', function() {
        expect(this.buffer.call(this.name)).to.equal(this.buffer);
      });

      it("with an undefined name doesn't explode", function() {
        expect(this.buffer.call('not_a_defined_name')).to.equal(this.buffer);
      });
    });
  });

  describe('apply()', function() {
    beforeEach(function() {
      this.touched_1 = this.touched_2 = false;

      this.buffer.add(
        (x, y) => {
          if (x && y) this.touched_1 = this.touched_2 = true;
        },
        this.name
      );

      this.buffer.apply(name, [true, true]);
    });

    it('lets you pass in an argument array', function() {
      expect(this.touched_1).to.be.true;
      expect(this.touched_2).to.be.true;
    });

    it('returns the FuncBuffer', function() {
      expect(this.buffer.apply(name)).to.equal(this.buffer);
    });
  });

  describe('clear()', function() {
    beforeEach(function() {
      this.buffer.clear(this.name);
      this.buffer.call(this.name);
    });

    it('removes functions from the named buffer', function() {
      expect(this.number).to.equal(0);
      expect(this.another_number).to.equal(0);
    });

    describe('on other buffers', function() {
      beforeEach(function() {
        this.buffer.call(this.another_name);
      });

      it("doesn't clear other buffers", function() {
        expect(this.from_another_name).to.equal(1);
      });
    });

    it('returns the FuncBuffer', function() {
      expect(this.buffer.clear(this.name)).to.equal(this.buffer);
    });
  });

  describe('clearAll()', function() {
    beforeEach(function() {
      this.buffer.clearAll(this.name);
      this.buffer.call(this.name);
      this.buffer.call(this.another_name);
    });

    it('removes functions from all buffers', function() {
      expect(this.number).to.equal(0);
      expect(this.another_number).to.equal(0);
      expect(this.from_another_name).to.equal(0);
    });

    it('returns the FuncBuffer', function() {
      expect(this.buffer.clear(this.name)).to.equal(this.buffer);
    });
  });

  describe('remove()', function() {
    beforeEach(function() {
      this.buffer.remove(this.example_function, this.name);
      this.buffer.call(this.name);
    });

    it('only removes the given function', function() {
      expect(this.number).to.equal(0);
      expect(this.another_number).to.equal(1);
    });

    it('returns the FuncBuffer', function() {
      expect(this.buffer.remove(this.name)).to.equal(this.buffer);
    });
  });
}

describe('FuncBuffer', function() {
  it('can be extended', function() {
    let thisValue = null;
    const example = new FuncBuffer(function() {
      thisValue = this;
    });

    expect(example).to.equal(thisValue);
  });

  describe('without a name', function() {
    testFuncBufferMethods();
  });

  describe('with a name', function() {
    testFuncBufferMethods('this_is_a_name');
  });
});
