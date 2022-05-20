import {marvelCharactersList} from './marvelCharacters';

const dictionary = [
    'stark',
    'steve',
    'floki',
    'abbie',
    'abyss',
    'angel',
    'annie',
    'alice',
    'aaron',
    'babar',
    'baloo',
    'bambi',
    'basil',
    'beast',
    'betty',
    'biffo',
    'bimbo',
    'blade',
    'blaze',
    'blink',
    'bluey',
    'bluto',
    'bongo',
    'bucky',
    'bonzo',
    'bosko',
    'butch',
    'bruce',
    'cammi',
    'casey',
    'cable',
    'carol',
    'clark',
    'cyril',
    'cosmo',
    'chloe',
    'daisy',
    'danny',
    'dewey',
    'dinah',
    'dinna',
    'dopey',
    'dumbo',
    'druig',
    'ellie',
    'edgar',
    'felix',
    'frodo',
    'goofy',
    'happy',
    'heman',
    'homer',
    'jerry',
    'jesse',
    'jimmy',
    'klara', 
    'korky',
    'lewey',
    'lewis',
    'linus',
    'louie',
    'marge',
    'mario',
    'maden',
    'magik',
    'monte',
    'mordo',
    'pablo',
    'pedro',
    'peter',
    'pluto',
    'pongo',
    'queen',
    'reyna',
    'reina',
    'shera',
    'shrek',
    'snowy',
    'spike',
    'susie',
    'tramp',
    'viper',
    'wanda',
    'wendy',
    'wilma',
    'wimpy',
    'witch',
    'woody',
    'ziggy',
    'zorro'

]

marvelCharactersList.forEach((e)=>{
    if (e.length === 5){
        dictionary.push(e)
    }
})

console.log(dictionary)

export default dictionary