// Fills {{DEVELOPER_NAME}}, {{CONTACT_EMAIL}}, {{EFFECTIVE_DATE}} into the legal pages.
// Runs in CI before every build and can also be run locally: node scripts/apply-config.js
const fs = require('fs');
const path = require('path');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'app.config.json'), 'utf8'));
const map = {
  '{{DEVELOPER_NAME}}': cfg.developerName,
  '{{CONTACT_EMAIL}}': cfg.contactEmail,
  '{{EFFECTIVE_DATE}}': cfg.effectiveDate
};

const placeholder = /YOUR_EMAIL|YOUR NAME/i.test(cfg.contactEmail + cfg.developerName);
if (placeholder) {
  const msg = 'app.config.json still has placeholder name/email. Edit it BEFORE publishing to Google Play (policy pages need a real contact).';
  console.log('::warning title=Edit app.config.json::' + msg);
  console.warn('WARNING: ' + msg);
}

for (const dir of ['www', 'docs']) {
  const full = path.join(__dirname, '..', dir);
  if (!fs.existsSync(full)) continue;
  for (const f of fs.readdirSync(full)) {
    if (!f.endsWith('.html')) continue;
    const fp = path.join(full, f);
    let t = fs.readFileSync(fp, 'utf8');
    for (const [k, v] of Object.entries(map)) t = t.split(k).join(v);
    fs.writeFileSync(fp, t);
  }
}
console.log('Config applied.');
