import { expect } from 'chai';
import FuncBuffer from './FuncBuffer';

/*
 * function testFuncBufferMethods(name) {
 *   describe('add()', function() {
 *     it('returns self', function() {
 *       const buffer = new FuncBuffer();
 *       expect(buffer.add(function() {})).toBe(buffer);
 *     });
 *   });
 */

/*
 *   beforeEach(function() {
 *     const self = this;
 *     this.name = name;
 *     this.another_name = 'another_buffer';
 *     this.buffer = new FuncBuffer();
 *     this.number = 0;
 *     this.another_number = 0;
 *     this.from_another_name = 0;
 */

/*
 *     this.example_function = function() {
 *       self.number++;
 *     };
 */

/*
 *     this.buffer.add(this.example_function, name)
 *       .add(function() {
 *         self.another_number++;
 *       }, name)
 *       .add(function() {
 *         self.from_another_name++;
 *       }, this.another_name);
 *   });
 */

/*
 *   describe('call()', function() {
 *     beforeEach(function() {
 *       this.buffer.call(this.name);
 *     });
 */

/*
 *     it('calls functions registered under the given name', function() {
 *       expect(this.number).toEqual(1);
 *       expect(this.another_number).toEqual(1);
 *     });
 */

/*
 *     it("doesn't call functions registered under any other name", function() {
 *       expect(this.from_another_name).toEqual(0);
 *     });
 */

/*
 *     describe('after a second call()', function() {
 *       beforeEach(function() {
 *         this.buffer.call(this.name);
 *       });
 */

/*
 *       it('can be called multiple times', function() {
 *         expect(this.number).toEqual(2);
 *         expect(this.another_number).toEqual(2);
 *       });
 */

/*
 *       it('returns the FuncBuffer', function() {
 *         expect(this.buffer.call(this.name)).toBe(this.buffer);
 *       });
 */

/*
 *       it("with an undefined name doesn't explode", function() {
 *         expect(this.buffer.call('not_a_defined_name')).toBe(this.buffer);
 *       });
 *     });
 *   });
 */

/*
 *   describe('apply()', function() {
 *     beforeEach(function() {
 *       const self = this;
 *       this.touched_1 = false;
 *       this.touched_2 = false;
 */

/*
 *       this.buffer.add(
 *         function(x, y) {
 *           if (x && y) self.touched_1 = true;
 *         },
 *         this.name
 *       );
 */

/*
 *       this.buffer.add(
 *         function(x, y) {
 *           if (x && y) self.touched_2 = true;
 *         },
 *         this.name
 *       );
 */

/*
 *       this.buffer.apply(name, [true, true]);
 *     });
 */

/*
 *     it('lets you pass in an argument array', function() {
 *       expect(this.touched_1).toBe(true);
 *       expect(this.touched_2).toBe(true);
 *     });
 */

/*
 *     it('returns the FuncBuffer', function() {
 *       expect(this.buffer.apply(name)).toBe(this.buffer);
 *     });
 *   });
 */

/*
 *   describe('clear()', function() {
 *     beforeEach(function() {
 *       this.buffer.clear(this.name);
 *       this.buffer.call(this.name);
 *     });
 */

/*
 *     it('removes functions from the named buffer', function() {
 *       expect(this.number).toEqual(0);
 *       expect(this.another_number).toEqual(0);
 *     });
 */

/*
 *     describe('on other buffers', function() {
 *       beforeEach(function() {
 *         this.buffer.call(this.another_name);
 *       });
 */

/*
 *       it("doesn't clear other buffers", function() {
 *         expect(this.from_another_name).toEqual(1);
 *       });
 *     });
 */

/*
 *     it('returns the FuncBuffer', function() {
 *       expect(this.buffer.clear(this.name)).toEqual(this.buffer);
 *     });
 *   });
 */

/*
 *   describe('clearAll()', function() {
 *     beforeEach(function() {
 *       this.buffer.clearAll(this.name);
 *       this.buffer.call(this.name);
 *       this.buffer.call(this.another_name);
 *     });
 */

/*
 *     it('removes functions from all buffers', function() {
 *       expect(this.number).toEqual(0);
 *       expect(this.another_number).toEqual(0);
 *       expect(this.from_another_name).toEqual(0);
 *     });
 */

/*
 *     it('returns the FuncBuffer', function() {
 *       expect(this.buffer.clear(this.name)).toBe(this.buffer);
 *     });
 *   });
 */

/*
 *   describe('remove()', function() {
 *     beforeEach(function() {
 *       this.buffer.remove(this.example_function, this.name);
 *       this.buffer.call(this.name);
 *     });
 */

/*
 *     it('only removes the given function', function() {
 *       expect(this.number).toEqual(0);
 *       expect(this.another_number).toEqual(1);
 *     });
 */

/*
 *     it('returns the FuncBuffer', function() {
 *       expect(this.buffer.remove(this.name)).toBe(this.buffer);
 *     });
 *   });
 * }
 */

describe.only('FuncBuffer', function() {
  it('does a thing', () => {
    console.log(FuncBuffer);
    expect(FuncBuffer).to.not.be.null;
  });
  /*
   * it('can be extended', function() {
   *   let thisValue = null;
   *   const example = new FuncBuffer(function() {
   *     thisValue = this;
   *   });
   */

  /*
   *   expect(example).toEqual(thisValue);
   * });
   */

  /*
   * describe('without a name', function() {
   *   testFuncBufferMethods();
   * });
   */

  /*
   * describe('with a name', function() {
   *   testFuncBufferMethods('this_is_a_name');
   * });
   */
});