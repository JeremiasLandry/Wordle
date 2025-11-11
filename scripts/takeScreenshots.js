const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  // Test a range of narrow viewports (400 and below) plus a couple common sizes
  const viewports = [
    { w: 400, h: 800, name: 'shot-400x800.png' },
    { w: 390, h: 844, name: 'shot-390x844.png' },
    { w: 375, h: 812, name: 'shot-375x812.png' },
    { w: 360, h: 740, name: 'shot-360x740.png' },
    { w: 320, h: 568, name: 'shot-320x568.png' },
  ];

  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  // Launch with common flags to avoid spawn/permission issues on some
  // Windows environments (no-sandbox and disabling shared memory usage).
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
  } catch (err) {
    console.warn('Default playwright launch failed, will try system Chrome/Edge fallback methods:', err.message);
    // First, try launching by channel name (e.g. 'chrome' or 'msedge')
    try {
      console.log('Attempting to launch using channel: chrome');
      browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] });
      console.log('Launched via channel: chrome');
    } catch (channelErr) {
      console.warn('Launch via channel chrome failed:', channelErr.message);
      try {
        console.log('Attempting to launch using channel: msedge');
        browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] });
        console.log('Launched via channel: msedge');
      } catch (channelErr2) {
        console.warn('Launch via channel msedge failed:', channelErr2.message);
        // Try common Chrome/Edge install locations on Windows as a fallback
        const possible = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    ];
    const fs = require('fs');
    let found = null;
    for (const p of possible) {
      if (fs.existsSync(p)) { found = p; break; }
    }
    if (found) {
      console.log('Found system browser at', found, '- launching with executablePath');
      browser = await chromium.launch({
        headless: true,
        executablePath: found,
        args: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      });
    } else {
      throw err; // rethrow original error if no fallback found
    }
      }
    }
  }
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 20000 });
      // Give React a bit to paint
      await page.waitForTimeout(500);
      const path = `screenshots/${vp.name}`;
      await page.screenshot({ path, fullPage: true });
      console.log('Saved', path);
    } catch (err) {
      console.error('Failed for', vp, err.message);
    }
  }

  await browser.close();
})();
