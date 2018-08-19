/**
 * Import Dependencies
 */
import * as express from 'express';
import { Pdf } from './module';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.post('/decrypt', async (req: express.Request, res: express.Response) => {
    /**
     * Extract Body
     */
    const {
        file,
        mask
    } = req.body

    /**
     * Create PDF
     */
    const pdf = new Pdf();

    /**
     * Decrypt
     */
    try {
        const decrypted = await pdf.decrypt({
            filepath: file,
            mask
        });
        res.status(200).json({
            decrypted,
        });
    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});

/**
 * Export Module
 */
export default router;
