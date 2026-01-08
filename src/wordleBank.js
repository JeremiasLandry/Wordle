import {marvelCharactersList} from './marvelCharacters';
// A dictionary of 5-letter words for Wordle-like game
const dictionary = [
  'stark','steve','floki','abbie','abyss','angel','annie','alice','aaron',
  'babar','baloo','bambi','basil','beast','betty','biffo','bimbo','blade',
  'blaze','blink','bluey','bluto','bongo','bucky','bunny','bonzo','bosko',
  'butch','bruce','cammi','casey','cable','carol','clark','cyril','cosmo',
  'chloe','daisy','danny','dewey','dinah','dinna','diana','dopey','doris',
  'dumbo','druig','ellie','edgar','fring','flash','felix','frodo','fiona',
  'goofy','groot','happy','hanna','heman','homer','jerry','jesse','jimmy',
  'klara','korky','lewey','lewis','linus','louie','nygma','nacho','marge',
  'mario','maden','manny','magik','monte','mordo','miley','pablo','pedro',
  'peter','pluto','pumba','pongo','queen','reyna','reina','rosie','shera',
  'simba','shrek','snowy','snake','spike','susie','sully','tramp','trump',
  'timon','timmy','viper','velma','wanda','wendy','wilma','wimpy','witch',
  'white','woody','ziggy','zorro','logan','storm','rogue','gambi','venom',
  'thena','rhino','hades','heros','lance','vader','yoda','joker','spawn',
  'genie','stacy','pinky','brain','sandy','darla','nancy','susan','olive',
  'nemo','moana','elsa','anna','tiana','ariel','sonic','tails','knuck','zelda',
  'linky','kenny','erich','novaa','grimm','frost','blitz','flame','spark',
  'quake','ember','glint','crash','raven','shade','valor','lunar','novae',
  'alpha','bravo','candy','delta','eagle','fable','gamer','hatch','ivory',
  'joker','kappa','light','mirth','nymph','olive','prism','quill','racer',
  'silas','tiger','ultra','vigor','waltz','xenon','yokai','zorro','atlas',
  'bryce','cedar','derek','elroy','finns','giles','homer','irvin','jules',
  'kevin','louis','mason','nashs','oscar','piper','quinn','ryder','simon',
  'travis','ursus','vexor','wyatt','xyrus','yanni','zayla','abner','brynn',
  'clyde','daisy','evans','floyd','greta','harry','isley','jacob','karen',
  'linda','marco','nancy','ocean','paige','quinn','randy','sarah','thale',
  'urban','vance','willa','xenia','yates','zelda','adams','bella','carly',
  'dante','elena','fable','gordo','haley','igloo','jason','kylee','lance',
  'mango','natal','ozzie','penny','queen','riley','sonny','tessa','ulric',
  'vinny','wanda','xenon','yoshi','zayne','amber','bruno','clive','derek',
  'edgar','flint','grace','henry','india','jenny','karen','leona','miles',
  'noble','olsen','paula','quinn','roger','simon','tanya','ursel','vixen',
  'waldo','xenia','yolko','zappy','aegon','bryce','citra','daisy','elric',
  'floyd','gilda','harry','idris','janet','kings','lyric','mavis','nadir',
  'orion','peggy','quasi','rebel','sable','tyler','ulric','vigor','wyatt',
  'xylon','yanni','zorro','arwen','boris','clara','derek','elena','fiona',
  'gomez','helix','indra','jasper','kylee','lunar','marlo','nyssa','oscar',
  'piper','quinn','ruben','soren','tiger','ursus','vance','willa','xenos',
  'yoshi','zayne','atlas','blair','camer','dante','ellis','felix','gavin',
  'harlo','irisz','jaden','kiran','lewis','maeve','noxus','oliva','peter',
  'quill','raven','sylas','thoma','ulyss','vivar','waltz','xanad','yulie',
  'zayla','alric','brynn','clyde','daria','elvin','floyd','glenn','harry',
  'imran','jules','kayla','lucas','maria','nyssa','odell','paige','quinn',
  'ryker','sarah','talia','uriel','vigor','wesly','xenia','yanni','zarek',
  'azula','blaze','cyber','drake','ember','flame','glint','hydra','ionic',
  'jynxx','krypt','lumen','matrix','neon','omega','plasma','quark','radar',
  'saber','tazer','ultra','xenon','yokai','Zibai', 'Varka', 'Lauma','Nefer',
  'clank', 'alice', 'flins', 'dehya', 'diluc', 'ganyu', 'hutao', 'nilou',
  'yelan', 'razor', 'durin','thoma', 'venti', 'aeiou','abcde'
];

marvelCharactersList.forEach((e)=>{
    if (e.length === 5){
        dictionary.push(e)
    }
})

console.log(dictionary)

// --- Playable characters helper utilities ---
function cyrb53(str, seed = 0) {
  let h1 = 0xDEADBEEF ^ seed, h2 = 0x41C6CE57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function seededShuffle(array, seedStr) {
  const arr = array.slice();
  const seed = cyrb53(seedStr + '::seed');
  const rand = mulberry32(seed >>> 0);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Given an array of playable characters, deterministically pick the character
 * for a given date. It shuffles the list with a seed (baseStart) and then
 * picks the element at index (daysSinceStart % n). This ensures a pseudo-
 * random order without repeats until the list is exhausted.
 *
 * @param {Array} playableCharacters - array of objects {title, imageUrl, word}
 * @param {Date} date - Date to select for (uses local date portion)
 * @param {String} baseStart - seed string (e.g., '2026-01-01')
 */
function getCharacterForDate(playableCharacters, date = new Date(), baseStart = '2026-01-01') {
  if (!Array.isArray(playableCharacters) || playableCharacters.length === 0) return null;
  const start = new Date(baseStart + 'T00:00:00');
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.floor((localDate - start) / (1000 * 60 * 60 * 24));
  const n = playableCharacters.length;
  const shuffled = seededShuffle(playableCharacters, baseStart + '::order');
  const idx = ((days % n) + n) % n; // positive modulo
  return shuffled[idx];
}

export { getCharacterForDate, seededShuffle, cyrb53 };

export default dictionary