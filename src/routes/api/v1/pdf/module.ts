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

        return new Promise(async (resolve, reject) => {
            for (const password of passwordSet) {
                try {
                    const response = await this.decryptExec(password, filepath);
                    resolve(response);
                } catch (e) {}
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

