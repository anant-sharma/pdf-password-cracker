/**
 * This file contains the functional code
 * pertaining to clock class
 */

/**
 * Module Dependencies
 */
import { exec } from 'child_process';
import { maskedDataSetGenerator } from '../../../../common/utils';

export class Pdf {
    public decrypt(data: any) {

        const {
            filepath,
            mask
        } = data;

        const passwordSet = maskedDataSetGenerator(mask);

        console.info(`[**] Trying ${passwordSet.length} possibilities to decrypt ${filepath}`);

        return new Promise(async (resolve, reject) => {
            let response: any = null;
            for (const password of passwordSet) {
                try {
                    response = await this.decryptExec(password, filepath);
                    resolve(response);
                    break;
                } catch (e) {}
            }
            if (response) {
                console.info(`[**] ${filepath} decrypted successfully`);
                console.info(`[**] ${JSON.stringify(response)}`);
            } else {
                console.info(`[**] Unable to decrypt ${filepath}`);
            }
        });
    }

    private decryptExec(password: string, filepath: string) {
        return new Promise((resolve, reject) => {
            exec(`qpdf --decrypt --password=${password} ${filepath} /tmp/out.pdf`, (error, stdout, stderr) => {
                if (error) {
                  reject(error);
                  return;
                }
                resolve({stdout, stderr, password});
            });
        })
    }
}

