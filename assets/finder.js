(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('#cards .card'));
  var q = document.getElementById('q');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var clear = document.getElementById('clear');
  var tagRow = document.getElementById('tag-filter');
  var tagPanel = document.getElementById('tag-panel');
  var tagCount = document.getElementById('tag-count');

  var state = { q: '', meal: '', group: '', tags: [] };

  // Build tag chips from the recipes, most used first
  var freq = {};
  cards.forEach(function (c) {
    c._tags = c.dataset.tags ? c.dataset.tags.split('|') : [];
    c._text = c.dataset.search;
    c._tags.forEach(function (t) { freq[t] = (freq[t] || 0) + 1; });
  });
  Object.keys(freq)
    .sort(function (a, b) { return freq[b] - freq[a] || a.localeCompare(b); })
    .forEach(function (t) {
      var b = document.createElement('button');
      b.className = 'chip';
      b.dataset.tag = t;
      b.setAttribute('aria-pressed', 'false');
      b.textContent = t;
      tagRow.appendChild(b);
    });

  function readUrl() {
    var p = new URLSearchParams(location.search);
    state.q = p.get('q') || '';
    state.meal = p.get('meal') || '';
    state.group = p.get('set') || '';
    state.tags = p.getAll('tag');
  }

  function writeUrl() {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.meal) p.set('meal', state.meal);
    if (state.group) p.set('set', state.group);
    state.tags.forEach(function (t) { p.append('tag', t); });
    var s = p.toString();
    history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
  }

  function press(row, attr, value) {
    row.querySelectorAll('.chip').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset[attr] === value));
    });
  }

  function render() {
    var terms = state.q.toLowerCase().split(/[\s,]+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c) {
      var ok =
        (!state.meal || c.dataset.meal === state.meal) &&
        (!state.group || c.dataset.group === state.group) &&
        state.tags.every(function (t) { return c._tags.indexOf(t) !== -1; }) &&
        terms.every(function (t) { return c._text.indexOf(t) !== -1; });
      c.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown + (shown === 1 ? ' recipe' : ' recipes');
    empty.hidden = shown !== 0;
    press(document.getElementById('meal-filter'), 'meal', state.meal);
    press(document.getElementById('group-filter'), 'group', state.group);
    tagRow.querySelectorAll('.chip').forEach(function (b) {
      b.setAttribute('aria-pressed', String(state.tags.indexOf(b.dataset.tag) !== -1));
    });
    tagCount.textContent = state.tags.length ? '(' + state.tags.length + ')' : '';
    clear.hidden = !(state.q || state.meal || state.group || state.tags.length);
    if (q.value !== state.q) q.value = state.q;
  }

  q.addEventListener('input', function () { state.q = q.value.trim(); writeUrl(); render(); });

  document.getElementById('meal-filter').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    state.meal = b.dataset.meal; writeUrl(); render();
  });
  document.getElementById('group-filter').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    state.group = b.dataset.group; writeUrl(); render();
  });
  tagRow.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    var t = b.dataset.tag, i = state.tags.indexOf(t);
    if (i === -1) state.tags.push(t); else state.tags.splice(i, 1);
    writeUrl(); render();
  });
  clear.addEventListener('click', function () {
    state = { q: '', meal: '', group: '', tags: [] };
    writeUrl(); render();
  });

  readUrl();
  if (state.tags.length) tagPanel.open = true;
  render();
  // Restore filters when coming back from a recipe page
  window.addEventListener('pageshow', function () { readUrl(); render(); });
})();
