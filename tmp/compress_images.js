import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PC_DIR = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public/PC';
const MOBILE_DIR = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public/Mobile';
const PUBLIC_DIR = 'c:/Users/hp/OneDrive/Desktop/staffarc/LandScape Weddings/public';

async function compressImagesInDir(dirPath, recursive = false) {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const images = files.filter(f => f.isFile() && (f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg')));

    console.log(`Found ${images.length} images in ${path.basename(dirPath)} to compress...`);

    for (const imgFile of images) {
        const img = imgFile.name;
        const inputPath = path.join(dirPath, img);
        const outputPath = path.join(dirPath, `comp_${img}`);

        console.log(`Compressing ${img}...`);

        try {
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
        } catch (err) {
            console.error(`Failed to compress ${img}:`, err.message);
        }
    }
}

async function run() {
    await compressImagesInDir(PC_DIR);
    await compressImagesInDir(MOBILE_DIR);
    await compressImagesInDir(PUBLIC_DIR);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
