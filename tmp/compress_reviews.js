import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const reviewsDir = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public/Reviews';
const tempDir = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public/Reviews_Temp';

async function compressImages() {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    const files = fs.readdirSync(reviewsDir);

    for (const file of files) {
        const inputPath = path.join(reviewsDir, file);
        const outputPath = path.join(tempDir, file);

        if (fs.lstatSync(inputPath).isDirectory()) continue;

        console.log(`Compressing: ${file}...`);

        try {
            await sharp(inputPath)
                .resize({ width: 1200, withoutEnlargement: true })
                .jpeg({ quality: 75, progressive: true })
                .toFile(outputPath);

            console.log(`Finished: ${file}`);
        } catch (err) {
            console.error(`Error compressing ${file}:`, err);
        }
    }

    console.log('Compression complete in Temp folder.');
}

compressImages();
