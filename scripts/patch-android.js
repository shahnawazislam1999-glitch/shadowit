// Patches the freshly generated android/ project so it is Google Play ready.
// Runs in CI right after `npx cap add android`.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const androidDir = path.join(root, 'android');
const appDir = path.join(androidDir, 'app');

function read(f) { return fs.readFileSync(f, 'utf8'); }
function write(f, t) { fs.writeFileSync(f, t); }
function must(text, pattern, replacement, label) {
  if (!pattern.test(text)) throw new Error('patch-android: could not find ' + label);
  return text.replace(pattern, replacement);
}
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

// 1) Launcher icons + splash screens + icon background colour
copyDir(path.join(root, 'android-overrides', 'res'), path.join(appDir, 'src', 'main', 'res'));
console.log('- icons & splash copied');

// 2) AndroidManifest: no backups of private data, no cleartext traffic
const manifestPath = path.join(appDir, 'src', 'main', 'AndroidManifest.xml');
let manifest = read(manifestPath);
manifest = must(manifest, /android:allowBackup="true"/, 'android:allowBackup="false"\n        android:usesCleartextTraffic="false"', 'allowBackup');
write(manifestPath, manifest);
console.log('- manifest hardened (allowBackup=false, cleartext off)');

// 3) app/build.gradle: version from CI, release signing, lint won't block the build
const gradlePath = path.join(appDir, 'build.gradle');
let g = read(gradlePath);
g = must(g, /versionCode 1/, 'versionCode ciVersionCode', 'versionCode');
g = must(g, /versionName "1\.0"/, 'versionName ciVersionName', 'versionName');
g = must(g, /\nandroid \{/, `
def ciVersionCode = Integer.parseInt(System.getenv('VERSION_CODE') ?: '1')
def ciVersionName = System.getenv('VERSION_NAME') ?: '1.0'

android {`, 'android block');
g = must(g, /\n    buildTypes \{/, `
    signingConfigs {
        release {
            def ksPath = System.getenv('KEYSTORE_PATH')
            if (ksPath) {
                storeFile file(ksPath)
                storePassword System.getenv('KEYSTORE_PASSWORD')
                keyAlias System.getenv('KEY_ALIAS')
                keyPassword System.getenv('KEY_PASSWORD')
            }
        }
    }
    lint {
        abortOnError = false
        checkReleaseBuilds = false
    }
    buildTypes {`, 'buildTypes');
g = must(g, /(release \{\n)(\s+minifyEnabled false)/, `$1            if (System.getenv('KEYSTORE_PATH')) {
                signingConfig signingConfigs.release
            }
$2`, 'release block');
write(gradlePath, g);
console.log('- build.gradle patched (version, signing, lint)');

// 4) gradle.properties: more memory for the CI build
const propsPath = path.join(androidDir, 'gradle.properties');
let props = read(propsPath);
props = props.replace(/org\.gradle\.jvmargs=.*/, 'org.gradle.jvmargs=-Xmx3072m -Dfile.encoding=UTF-8');
write(propsPath, props);
console.log('- gradle.properties patched');
console.log('Android project ready.');
