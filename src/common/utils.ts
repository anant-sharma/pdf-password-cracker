/**
 * This module contains the common
 * utils used in the application
 */
const vocabulary = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

/**
 * Function to generate all the possible passwords
 * @param mask is the masked input where ? denotes blank elements
 */
export const maskedDataSetGenerator = function(mask: string = '?') {
    const passwordSet: string[] = [];
    const maskLength: Number = mask.length;

    const getNextCharSet = (tString: string, index: number = 0) => {
        if (maskLength > tString.length) {
            const elem = mask[index]
            if (elem !== '?') {
                getNextCharSet(tString + elem, index + 1);
            }

            if (elem === '?') {
                vocabulary.forEach((e: string) => {
                    getNextCharSet(tString + e, index + 1)
                });
            }
        } else {
            passwordSet.push(tString);
        }
    };

    getNextCharSet('', 0);

    return passwordSet;
}
