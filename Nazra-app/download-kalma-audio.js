import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// For longer kalmas, use just the first sentence/key phrase that fits Google TTS limit (~200 chars)
const kalmas = [
  { name: 'kalma4', text: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ' },
  { name: 'kalma5', text: 'أَسْتَغْفِرُ اللّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمَدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً وَأَتُوبُ إِلَيْهِ' },
  { name: 'kalma6', text: 'اَللّٰهُمَّ إِنِّي أُعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ تُبْتُ عَنْهُ' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'audio/mpeg, audio/*, */*',
        'Referer': 'https://translate.google.com/'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(() => {
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          download(res.headers.location, dest).then(resolve).catch(reject);
        });
        return;
      }
      if (res.statusCode !== 200) {
        file.close(() => { if (fs.existsSync(dest)) fs.unlinkSync(dest); });
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(dest).size;
          resolve(size);
        });
      });
    });
    req.on('error', (err) => {
      file.close(() => { if (fs.existsSync(dest)) fs.unlinkSync(dest); });
      reject(err);
    });
  });
}

async function run() {
  for (const k of kalmas) {
    const encoded = encodeURIComponent(k.text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=ar&client=tw-ob`;
    const dest = path.join(outputDir, k.name + '.mp3');
    try {
      const size = await download(url, dest);
      console.log(`OK ${k.name}.mp3 (${size} bytes)`);
    } catch (e) {
      console.log(`FAIL ${k.name}: ${e.message}`);
    }
  }
  console.log('Done!');
}

run();
