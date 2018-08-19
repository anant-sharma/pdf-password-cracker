/**
 * This module contains the common
 * utils used in the application
 */
const NUMBERS = '0123456789'.split('');
const LOWERCASE_ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASE_ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const VOCABULARY = [...LOWERCASE_ALPHABETS, ...UPPERCASE_ALPHABETS, ...NUMBERS];

/**
 * Function to generate all the possible passwords
 * @param mask is the masked input where ? denotes blank elements
 */
export const maskedDataSetGenerator = function(mask: string = '?') {
    const passwordSet: string[] = [];
    const maskLength: Number = mask.length;

    const getNextCharSet = (tString: string, index: number = 0) => {
        if (maskLength > tString.length) {
            const elem = mask[index];
            let vocab: string[] = [];

            switch(elem) {
                case '#': vocab = NUMBERS; break;
                case '@': vocab = LOWERCASE_ALPHABETS; break;
                case '$': vocab = UPPERCASE_ALPHABETS; break;
                case '?': vocab = VOCABULARY; break;
                default: vocab = [];
            }

            if (vocab.length) {
                vocab.forEach((e: string) => {
                    getNextCharSet(tString + e, index + 1)
                });
            } else {
                getNextCharSet(tString + elem, index + 1);
            }
        } else {
            passwordSet.push(tString);
        }
    };

    getNextCharSet('', 0);

    return passwordSet;
}
