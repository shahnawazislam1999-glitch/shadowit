# SHADOWit – HTML → Android (APK + Play Store AAB)

Your `index.html` app wrapped with **Capacitor 8**. Everything (HTML, fonts, legal pages) is bundled inside the app, so it works offline.

> **Why Capacitor 8 and not 6?** Since **31 Aug 2026** Google Play only accepts new apps/updates that target **Android 16 (API 36)**. Capacitor 6 targets API 34, so Play would reject it. Capacitor 8 targets API 36 out of the box.

## 1. Before you push (2 minutes)

1. Open **`app.config.json`** and put your real name + email. They are inserted into the Privacy Policy / Terms (Play requires a real contact).
2. *(Optional)* Change the package name in `capacitor.config.json` → `appId` (default `com.shadowit.englishpractice`). **It can never be changed after you publish.**
3. Make the GitHub repo **Private** (recommended, see "Signing" below).

## 2. Push and build

Push all files to GitHub (the `.github` folder must be included). Open the **Actions** tab. Two workflows start automatically:

| Workflow | Output (Artifacts, bottom of the run page) | Use |
|---|---|---|
| **Build Debug APK** | `shadowit-debug-apk` → `app-debug.apk` | Install on your phone to test |
| **Build Play Store AAB** | `shadowit-release-aab` → `app-release.aab` | **Upload this to Google Play** |

Run them again any time with *Actions → pick workflow → Run workflow*.

## 3. Signing (important, one-time)

Play needs a signed AAB, and every future update must use the **same upload key**.

1. First run with no secrets: the workflow creates a new key. In a **private** repo it saves it as artifact **`KEEP-PRIVATE-upload-keystore`** (file `SECRETS-README.txt` inside).
2. Open that file and create the 4 repo secrets it lists: *Settings → Secrets and variables → Actions → New repository secret*: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.
3. Upload the AAB from **that same run** (or re-run the workflow after adding the secrets). From now on every build uses your saved key.
4. Keep a backup of the keystore somewhere safe. In Play Console, choose **Play App Signing** (default) – then a lost upload key can be reset by Google.

Public repo? The key is *not* saved as a downloadable file (anyone could download it). Make the repo private and re-run.

## 4. Public Privacy Policy URL (Play requires one)

Play Console needs a web link, not just an in-app page.

1. GitHub repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Actions → "Publish Privacy Policy page" → Run workflow**.
3. Your URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/privacy-policy.html` → paste it in Play Console (App content → Privacy policy).

The same policy and terms are also inside the app (**ℹ️ About** button).

## 5. Replace your app later

Replace `www/index.html` (keep `www/fonts`, `www/privacy-policy.html`, `www/terms.html`), push, download the new AAB. Version code goes up automatically with every run.

If your new HTML adds a microphone / camera / location feature, update the Privacy Policy **and** the Play Data Safety form first.

## What was changed in your HTML for Play compliance

- Removed Google Fonts request → fonts are now bundled locally (offline, no IP leak).
- Removed PWA install button, service-worker and `manifest.json` references (not needed in a real app).
- Removed dead "download project ZIP" code.
- Removed the fake `example.com` Donate/About links (placeholder links get apps rejected). **About** now opens the in-app Privacy Policy + Terms.
- ChatGPT / WhatsApp share buttons: removed the `intent://` hacks, now plain https links (work in WebView).
- Added Android back-button handling (closes pop-ups first, "press back again to exit").
- App: no ads, no analytics, no accounts, no extra permissions (only INTERNET). Backups and cleartext traffic disabled, WebView debugging off.

See **`PLAY_STORE_GUIDE.md`** for the Play Console answers (Data safety, content rating, listing text).
