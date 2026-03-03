import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PC_DIR = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public/PC';
const MOBILE_DIR = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public/Mobile';

async function compressImagesInDir(dirPath) {
    const files = await fs.readdir(dirPath);
    const images = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));

    console.log(`Found ${images.length} images in ${path.basename(dirPath)} to compress...`);

    for (const img of images) {
        const inputPath = path.join(dirPath, img);
        const outputPath = path.join(dirPath, `comp_${img}`);

        console.log(`Compressing ${img}...`);

        // Read the image into a buffer to avoid locking the file
        const buffer = await fs.readFile(inputPath);

        await sharp(buffer)
            .jpeg({ quality: 75, progressive: true, mozjpeg: true })
            .toFile(outputPath);

        // Swap files
        await fs.unlink(inputPath);
        await fs.rename(outputPath, inputPath);

        const stats = await fs.stat(inputPath);
        console.log(`${img} compressed to ${Math.round(stats.size / 1024)} KB`);
    }
}

async function run() {
    await compressImagesInDir(PC_DIR);
    await compressImagesInDir(MOBILE_DIR);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
