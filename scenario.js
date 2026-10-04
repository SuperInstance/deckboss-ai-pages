window.SCENARIO = {
  prompt: 'Name the call you have to make…',
  decision: 'Should we haul the pots before the weather turns?',
  factors: [
    { label: 'Barometer', weight: 0.90, score: 0.7,  note: '29.8 and falling fast. It never lies.' },
    { label: 'Crew fatigue', weight: 0.75, score: -0.4, note: 'Four long days. The men are spent.' },
    { label: 'Pot value at risk', weight: 0.80, score: 0.6, note: 'Twelve grand of gear sitting on the line.' },
    { label: 'Fuel burn', weight: 0.45, score: -0.5, note: 'The round trip drinks diesel.' },
    { label: 'Forecast confidence', weight: 0.70, score: 0.3, note: 'Three models agree: gale by dawn.' }
  ],
  seedLog: [
    { kind: 'note', text: '0600: Glass dropping, sky green in the east. Deck called to log.' },
    { kind: 'note', text: '0615: Crew fed, coffee hot. Waiting on the decision.' }
  ]
};

window.SKIN_CONFIG = {
  domain: 'deckboss.ai',
  tagline: 'Run the deck.',
  forSaleUrl: '#',
  scenario: window.SCENARIO,
  renderExtra: function (root, api) {
    root.innerHTML =
      '<div class="sk-read">' +
        '<div class="le-label">The deck&rsquo;s read <span class="le-hint">heaviest pull in the field</span></div>' +
        '<p class="sk-read-line" data-testid="deck-read-line"></p>' +
      '</div>';

    var line = root.querySelector('[data-testid="deck-read-line"]');

    function renderRead() {
      if (!api.factors.length) {
        line.textContent = '— awaiting decomposition —';
        return;
      }
      var top = null, topPull = -1;
      api.factors.forEach(function (f) {
        var pull = Math.abs(f.weight * f.score);
        if (pull > topPull) { topPull = pull; top = f; }
      });
      if (!top) { line.textContent = '—'; return; }
      var dir = top.score >= 0 ? 'haul' : 'hold';
      line.innerHTML = 'Right now the weather says it loudest: <b>' +
        top.label.toLowerCase() + '</b> pulls toward <b>' + dir + '</b>.';
    }

    renderRead();
    api.el.addEventListener('input', renderRead);
    var rows = api.el.querySelector('[data-testid="factor-rows"]');
    if (rows) new MutationObserver(renderRead).observe(rows, { childList: true });
  }
};
