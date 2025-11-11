const fs = require('fs');
const path = require('path');
const shots = ['shot-360x740.png','shot-419x858.png','shot-420x934.png'];
const dir = path.join(__dirname,'..','screenshots');
for(const s of shots){
  const p = path.join(dir,s);
  if(!fs.existsSync(p)){
    console.error('Missing',p);
    continue;
  }
  const buf = fs.readFileSync(p);
  const b64 = buf.toString('base64');
  fs.writeFileSync(path.join(dir,s + '.b64.txt'), b64);
  console.log('Wrote', s+'.b64.txt');
}
