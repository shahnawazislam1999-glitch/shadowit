# Google Play Console – copy/paste guide

## Store listing
- **App name:** SHADOWit
- **Short description (80 chars):** Shadowing and sentence practice with your own videos. Works offline.
- **Full description:**
  SHADOWit helps you practise spoken English by shadowing: listen to a sentence, repeat it, and repeat again.
  Load your own video and subtitle (.srt) files, loop sentence by sentence, hear sentences read aloud with word highlighting, keep notes, star favourite sentences and organise everything in folders.
  • Sentence-by-sentence repeat and loop
  • Subtitle sync for your own videos
  • Text-to-speech with word highlighting
  • Folders, notes, favourites and history
  • Light and dark themes
  • Works offline – your files stay on your device
  • No ads, no account, no tracking
  The app contains no videos or books. You add your own files.
- **Category:** Education. **Tags:** Language learning.
- **Icon:** `store-assets/icon-512.png`  **Feature graphic:** `store-assets/feature-graphic-1024x500.png`
- **Screenshots:** you must add at least 2 phone screenshots (take them from the debug APK).
- **Contact email:** same as in `app.config.json`. **Privacy policy URL:** see README step 4.

## App content declarations
- **Ads:** No, the app contains no ads.
- **App access:** All functionality available without login.
- **Target audience:** 13+ (or 18+). Do **not** select "under 13" – that triggers the Families policy.
- **Content rating questionnaire:** Category "Reference / Education". Answer **No** to violence, sexual content, drugs, gambling, user-to-user communication. The app shows only content the user loads; say user-provided content is not shared with others.
- **News app / Health / Financial / Government:** No.
- **Permissions declarations:** none needed. The app only declares INTERNET. No camera, mic, location, contacts, SMS or all-files access.

## Data safety form
- **Does your app collect or share any of the required user data types?**
  The developer collects nothing. The one thing that leaves the device is a sentence the user chooses to translate (sent to Google Translate). If unsure, declare it – over-disclosing is safer:
  - Data type: *App activity → Other user-generated content*, Collected: Yes (optional, only when user taps Translate), Shared: No (service-provider processing), Purpose: App functionality. 
  - Is data encrypted in transit? **Yes** (https). 
  - Can users request deletion? Not applicable – no data is stored by the developer; all data is on-device.
- Everything else: not collected.
- Data stored only on device (notes, settings, video) is **not** "collected" under Google's definition.

## Things Play reviewers check (already handled)
- Privacy policy inside the app and on a public URL ✔
- No misleading/placeholder links ✔
- No ads / no analytics SDKs ✔
- Target API 36 ✔ (Capacitor 8)
- 64-bit support ✔ (no native libs)
- Signed AAB with Play App Signing ✔

## Your responsibilities (can't be automated)
- **Copyright:** the app must not ship or promote pirated media. Your store text should say users add their *own* files (already in the description above). Don't use screenshots that show copyrighted movies/shows – use your own recordings or a public-domain / self-made video.
- **Translation endpoint:** the app calls the *unofficial* free Google Translate web endpoint (`translate.googleapis.com … client=gtx`). It works today but Google may block it and it is not an official API. For long-term stability switch to the official Cloud Translation API or another provider.
- **WhatsApp contact button** (Settings) uses your personal number from the original HTML. Remove or change it if you don't want it public.
- **New personal developer accounts** may be required to run a closed test with a minimum number of testers for 14 days before production access. Check the current rule in Play Console → Dashboard.
- Developer verification / identity checks apply to new developer accounts – finish them in Play Console.
