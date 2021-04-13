export class SlideShowVM {
  constructor() {
    this.slides = null;
    this.length = null;
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  onScroll() {
    this.index = Number((this.slides.scrollLeft / 350).toFixed(0));
  }
  jump(index) {
    const id = `avatar-${index}`;
    const current = document.getElementById(id);
    this.slides.scrollLeft = current.offsetLeft - 200;
    this.index = index;
  }
  prev() {
    if (this.index == 0) return;
    const slideNumber = (this.index -= 1);
    this.jump(slideNumber);
  }
  next() {
    if (this.index == this.length - 1) return;
    const slideNumber = (this.index += 1);
    this.jump(slideNumber);
  }
  load() {
    this.slides = document.querySelector(".slides");
    this.length = document.querySelector(".slides").children.length;
    document.querySelector(".slides").addEventListener("scroll", this.onScroll);
    document
      .querySelector(".slide-btn.prev")
      .addEventListener("click", this.prev);
    document
      .querySelector(".slide-btn.next")
      .addEventListener("click", this.next);
    this.jump(0);
  }
  reload() {
    this.slides = null;
    this.length = null;
    this.load();
  }
}
