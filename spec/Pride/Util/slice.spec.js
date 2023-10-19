describe('Pride.Util.slice()', function () {
  describe('slicing arrays', function () {
    it('slices from start', function () {
      expect(Pride.Util.slice([1, 2, 3], 1)).to.deep.equal([2, 3])
    })

    it('slices to end', function () {
      expect(Pride.Util.slice([1, 2, 3, 4], 1, 3)).to.deep.equal([2, 3])
    })
  })

  describe('slicing arring array like objects', function () {
    beforeEach(function () {
      this.array_like = (function () { return arguments }(1, 2, 3, 4))
    })

    it('slices from start', function () {
      expect(Pride.Util.slice(this.array_like, 1)).to.deep.equal([2, 3, 4])
    })

    it('slices to end', function () {
      expect(Pride.Util.slice(this.array_like, 1, 3)).to.deep.equal([2, 3])
    })
  })
})
