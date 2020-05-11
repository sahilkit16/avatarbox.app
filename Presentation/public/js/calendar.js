window.addEventListener('load', function () {
  class Slides {
    constructor(){
      this.slides = document.querySelector('.slides');
      this.length = document.querySelector('.slides').children.length;
      this.index = 0;
      this.prev = this.prev.bind(this);
      this.next = this.next.bind(this);
    }
    _slide(index){
      const current = document.getElementById(`avatar-${index}`);
      this.slides.scrollLeft = current.offsetLeft;
    }
    prev(){
      if(this.index == 0) return;
        this._slide(this.index -= 1);
    }
    next(){
      if(this.index == (this.length - 1)) return;
        this._slide(this.index += 1);
    }
  }
  const slides = new Slides();
  document.querySelector('.slide-btn.prev').addEventListener('click', slides.prev);
  document.querySelector('.slide-btn.next').addEventListener('click', slides.next);
})