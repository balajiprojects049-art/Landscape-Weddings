import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';
const MAX_WIDTH = 2560;
const QUALITY = 85;

async function optimizeImages() {
    console.log('🚀 Starting deep image optimization...');

    const files = fs.readdirSync(PUBLIC_DIR);
    const imageFiles = files.filter(file =>
        /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('.min.')
    );

    console.log(`📸 Found ${imageFiles.length} images to process.`);

    for (const file of imageFiles) {
        const filePath = path.join(PUBLIC_DIR, file);
        const stats = fs.statSync(filePath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        if (stats.size < 500 * 1024) {
            console.log(`⏩ Skipping ${file} (Already small: ${sizeMB}MB)`);
            continue;
        }

        console.log(`⚙️ Optimizing ${file} (${sizeMB}MB)...`);

        try {
            const buffer = fs.readFileSync(filePath);
            const image = sharp(buffer);
            const metadata = await image.metadata();

            let pipeline = image;

            // Resize if too wide
            if (metadata.width > MAX_WIDTH) {
                pipeline = pipeline.resize(MAX_WIDTH);
            }

            // Keep original format but compress
            if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
                pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
            } else if (metadata.format === 'png') {
                pipeline = pipeline.png({ quality: QUALITY, palette: true });
            }

            const outputBuffer = await pipeline.toBuffer();

            // Overwrite original
            fs.writeFileSync(filePath, outputBuffer);

            const newStats = fs.statSync(filePath);
            const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
            const saving = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

            console.log(`✅ ${file}: ${sizeMB}MB -> ${newSizeMB}MB (Saved ${saving}%)`);
        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err.message);
        }
    }

    console.log('✨ All images optimized for high-quality web delivery!');
}

optimizeImages();
