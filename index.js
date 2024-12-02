const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

function getUserIpAddr(req) {
  return req.ip;
}

async function checkUserLocation(ip) {
  const token = '170384039d3ec0';
  const url = `https://ipinfo.io/${ip}/json?token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  fs.writeFileSync('log.json', JSON.stringify(data, null, 2));
  const countryCode = data.country || null;
  return (countryCode === 'US' || countryCode === 'GB');
}

function checkFacebookReferrer(req) {
  return req.query.fbclid !== undefined;
}

function hasIpClicked(ip) {
  const logFile = path.join(__dirname, 'ip_log.txt');
  if (fs.existsSync(logFile)) {
    const ipLogs = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean);
    return ipLogs.includes(ip);
  }
  return false;
}

function logIpAddress(ip) {
  const logFile = path.join(__dirname, 'ip_log.txt');
  fs.appendFileSync(logFile, `${ip}\n`);
}

app.get('/', async (req, res) => {
  const ipAddress = getUserIpAddr(req);

  if (!await checkUserLocation(ipAddress)) {
    return res.status(403).send('Access forbidden: Only users from USA and UK are allowed.');
  }

  if (!checkFacebookReferrer(req)) {
    return res.status(403).send('Access forbidden: Only traffic from Facebook is allowed.');
  }

  if (hasIpClicked(ipAddress)) {
    return res.status(403).send('Access forbidden: Only one click per IP is allowed.');
  }

  logIpAddress(ipAddress);

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
