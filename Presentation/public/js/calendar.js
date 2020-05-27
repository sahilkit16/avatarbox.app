window.addEventListener("load", function () {
  class Slides {
    constructor() {
      this.slides = document.querySelector(".slides");
      this.length = document.querySelector(".slides").children.length;
      this.prev = this.prev.bind(this);
      this.next = this.next.bind(this);
      this.onScroll = this.onScroll.bind(this);
      document
        .querySelector(".slides")
        .addEventListener("scroll", this.onScroll);
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
      document
        .querySelector(".slide-btn.prev")
        .addEventListener("click", this.prev);
      document
        .querySelector(".slide-btn.next")
        .addEventListener("click", this.next);
      this.jump(0);
    }
  }
  new Slides().load();
  function toggleCalendar(e) {
    e.target.className += " is-loading";
    fetch("/calendar/submit", {
      method: "POST",
      headers: {
        accept: 'application/json'
      }
    }).then(async res => {
      if(res.ok){
        const calendar = res.json();
        return calendar;
      } else {
        throw new Error(res.textStatus);
      }
    })
    // TODO: update UI (calendar images + button states)
    .then(console.log);
  }
  document.getElementById("enable").setAttribute("type", "button");
  document.getElementById("disable").setAttribute("type", "button");
  document.getElementById("enable").addEventListener("click", toggleCalendar);
  document.getElementById("disable").addEventListener("click", toggleCalendar);
  window.notyf = new Notyf();
});
