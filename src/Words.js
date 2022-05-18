import wordBank from './wordle-bank.txt'
import wordleBank from './wordleBank';

const dictionary = [
    'nashe',
    'messi',
    'cough'
]


export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];



export const generateWordSet = () => {
    let wordSet = new Set(dictionary)
  
    return { wordSet } 
}

// \r\n