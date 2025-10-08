import {marvelCharactersList} from './marvelCharacters';

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
  'ryker','sarah','talia','uriel','vigor','wesly','xenia','yanni','zarek'
];

marvelCharactersList.forEach((e)=>{
    if (e.length === 5){
        dictionary.push(e)
    }
})

console.log(dictionary)

export default dictionary