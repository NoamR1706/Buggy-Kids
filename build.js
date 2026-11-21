// Runs on Netlify at every deploy. Reads content/activities.json (edited from /admin)
// and writes the extra activities into index.html between the ACT-* markers.
// No dependencies. Safe to run many times.
const fs = require('fs');

const esc = (v) => String(v == null ? '' : v)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let data = { items: [] };
try { data = JSON.parse(fs.readFileSync('content/activities.json', 'utf8')); }
catch (e) { console.warn('activities.json missing or invalid - no extra activities added'); }
const items = (data.items || []).filter((it) => it && it.title);

const tabs = [];
const rows = [];
items.forEach((it, i) => {
  const id = 'c' + (i + 1);
  const wa = 'https://wa.me/972533885833?text=' +
    encodeURIComponent('שלום, אשמח לשמוע על ' + it.title);
  tabs.push(
    `<button type="button" role="tab" aria-selected="false" id="tb-${id}" aria-controls="tp-${id}" tabindex="-1"><b>${esc(it.title)}</b></button>`);

  const img = it.image
    ? `<div class="ph" data-r><img src="${esc(String(it.image).replace(/^\//, ''))}" loading="lazy" decoding="async" width="800" height="600" alt="${esc(it.title)}"></div>`
    : '';
  const fine = it.age ? `<p class="fine">מתאים לגילאי <bdi dir="ltr">${esc(it.age)}</bdi>.</p>` : '';
  const price = (it.price !== undefined && it.price !== null && String(it.price) !== '')
    ? `<span class="price"><bdi dir="ltr">${esc(it.price)} <span class="sh">₪</span></bdi>${it.price_note ? ' ' + esc(it.price_note) : ''}</span>`
    : '';
  const paras = String(it.text || '').split(/\n+/).filter(Boolean)
    .map((t) => `<p>${esc(t)}</p>`).join('\n        ');
  rows.push(`    <div class="row${i % 2 === 0 ? '' : ' flip'}" role="tabpanel" id="tp-${id}" aria-labelledby="tb-${id}">
      ${img}
      <div class="tx" data-r style="--d:70ms">
        <h3>${esc(it.title)}</h3>
        ${paras}
        ${fine}
        <div class="foot-row">${price}<a class="more" href="${wa}" target="_blank" rel="noopener">שאלו אותנו</a></div>
      </div>
    </div>`);
});

let html = fs.readFileSync('index.html', 'utf8');
const swap = (name, body) => {
  const re = new RegExp(`(<!--${name}-->)[\\s\\S]*?(<!--/${name}-->)`);
  if (!re.test(html)) throw new Error('marker missing: ' + name);
  html = html.replace(re, (_, a, b) => `${a}\n${body}\n    ${b}`);
};
swap('ACT-TABS', tabs.join('\n    '));
swap('ACT-ROWS', rows.join('\n'));
fs.writeFileSync('index.html', html);
console.log('extra activities written:', items.length);
