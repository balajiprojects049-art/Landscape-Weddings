import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, '..', 'public', 'Founder.jpeg');
const outputPath = path.resolve(__dirname, '..', 'public', 'Founder_compressed.jpeg');

sharp(inputPath)
    .resize(2000)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outputPath)
    .then(data => {
        console.log('Compression complete:', data);
    })
    .catch(err => {
        console.error('Compression failed:', err);
    });
