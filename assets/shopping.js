(function () {
  var KEY = 'shopping-ticks';
  var items = document.querySelectorAll('.shopping li');
  var ticked = {};
  try { ticked = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(ticked)); } catch (e) {}
  }

  items.forEach(function (li) {
    // Key on the week heading too, so the same item in Week 1 and Week 2 ticks separately.
    var section = '';
    for (var el = li.closest('ul'); el; el = el.previousElementSibling) {
      if (el.tagName === 'H2') { section = el.textContent.trim(); break; }
    }
    var key = section + '|' + li.textContent.trim();
    li.setAttribute('role', 'checkbox');
    li.tabIndex = 0;
    function show() {
      li.classList.toggle('done', !!ticked[key]);
      li.setAttribute('aria-checked', String(!!ticked[key]));
    }
    function toggle() {
      if (ticked[key]) delete ticked[key]; else ticked[key] = true;
      save(); show();
    }
    li.addEventListener('click', toggle);
    li.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
    show();
  });

  var reset = document.getElementById('reset-ticks');
  if (reset) reset.addEventListener('click', function () {
    ticked = {}; save();
    items.forEach(function (li) { li.classList.remove('done'); li.setAttribute('aria-checked', 'false'); });
  });
})();
