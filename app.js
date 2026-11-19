/* Один выразительный момент: карточка агента заполняется, потом ставится печать.
   Без скрипта и при «уменьшить анимацию» всё видно сразу. */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var form = document.querySelector("[data-form]");
  var seal = document.querySelector(".seal");
  if (form && seal && !reduce) {
    document.documentElement.classList.add("js");
    var vals = Array.prototype.slice.call(form.querySelectorAll("dd[data-text]"));
    vals.forEach(function (el) { el.textContent = ""; });
    var row = 0;
    function typeRow() {
      if (row >= vals.length) { seal.classList.add("on"); return; }
      var el = vals[row], text = el.getAttribute("data-text"), i = 0;
      (function tick() {
        el.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(tick, 28);
        else { row++; setTimeout(typeRow, 160); }
      })();
    }
    setTimeout(typeRow, 450);
  }

  /* нижняя кнопка на телефоне: появляется, когда первая кнопка ушла за экран */
  var dock = document.querySelector(".dock");
  var first = document.querySelector("[data-cta-first]");
  if (dock && first && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { dock.classList.toggle("show", !e[0].isIntersecting); }, { threshold: 0 }).observe(first);
  }
})();
