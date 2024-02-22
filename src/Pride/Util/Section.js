class Section {
  constructor (start, end) {
    this.start = Math.max(Math.min(start, end), 0);
    this.end = Math.max(Math.max(start, end), 0);
  }

  inSection (index) {
    return index >= this.start && index <= this.end;
  }

  overlaps (section) {
    return this.inSection(section.start) || this.inSection(section.end);
  }

  calcLength () {
    return this.end - this.start + 1;
  }

  shifted (startAmount, endAmount = startAmount) {
    return new Section(this.start + startAmount, this.end + endAmount);
  }

  expanded (amount) {
    return this.shifted(-amount, amount);
  }
}

export default Section;
