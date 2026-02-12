const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outputDir = path.join("public", "images", "clean");

const jobs = [
  {
    input: path.join("public", "images", "raw", "raw-lambo-garage.jpeg"),
    output: path.join(outputDir, "recent-lambo.jpeg"),
    ratio: [16, 9],
    adjust: "car"
  },
  {
    input: path.join("public", "images", "raw", "raw-porsche-macan-driveway.jpeg"),
    output: path.join(outputDir, "recent-porsche.jpeg"),
    ratio: [16, 9],
    adjust: "car"
  },
  {
    input: path.join("public", "images", "raw", "raw-range-rover-driveway.jpeg"),
    output: path.join(outputDir, "recent-range-rover.jpeg"),
    ratio: [16, 9],
    adjust: "car"
  },
  {
    input: path.join("public", "images", "raw", "raw-alfa-romeo-tint-garage.jpeg"),
    output: path.join(outputDir, "recent-alfa-tint.jpeg"),
    ratio: [16, 9],
    adjust: "car"
  },
  {
    input: path.join("public", "images", "raw", "raw-tesla-driveway.jpeg"),
    output: path.join(outputDir, "recent-tesla.jpeg"),
    ratio: [16, 9],
    adjust: "car"
  },
  {
    input: path.join("public", "images", "raw", "raw-steam-seat.jpeg"),
    output: path.join(outputDir, "recent-steam-seat.jpeg"),
    ratio: [4, 3],
    adjust: "interior"
  },
  {
    input: path.join("public", "images", "raw", "raw-lexus-red-interior.jpeg"),
    output: path.join(outputDir, "recent-lexus-interior.jpeg"),
    ratio: [4, 3],
    adjust: "interior"
  }
];

function ensureInputs() {
  const missing = jobs.map((job) => job.input).filter((p) => !fs.existsSync(p));
  if (missing.length) {
    missing.forEach((p) => console.error(`Missing required file: ${p}`));
    process.exit(1);
  }
}

function centerCropToRatio(width, height, ratioW, ratioH) {
  const target = ratioW / ratioH;
  const imageRatio = width / height;
  if (imageRatio > target) {
    const cropWidth = Math.round(height * target);
    return {
      left: Math.max(0, Math.round((width - cropWidth) / 2)),
      top: 0,
      width: cropWidth,
      height
    };
  }
  const cropHeight = Math.round(width / target);
  return {
    left: 0,
    top: Math.max(0, Math.round((height - cropHeight) / 2)),
    width,
    height: cropHeight
  };
}

function clampExtract(crop, width, height) {
  const maxWidth = Math.max(1, width);
  const maxHeight = Math.max(1, height);
  const w = Math.max(1, Math.min(crop.width, maxWidth));
  const h = Math.max(1, Math.min(crop.height, maxHeight));
  const l = Math.max(0, Math.min(crop.left, maxWidth - w));
  const t = Math.max(0, Math.min(crop.top, maxHeight - h));
  return { left: l, top: t, width: w, height: h };
}

async function processImage({ input, output, ratio, adjust }) {
  const [ratioW, ratioH] = ratio;
  const image = sharp(input);
  const meta = await image.metadata();

  if (!meta.width || !meta.height) {
    throw new Error(`Could not read dimensions for ${input}`);
  }

  // Remove Instagram chrome from top and bottom, keep center content.
  const trimPreset = adjust === "interior" ? { top: 0.12, bottom: 0.1 } : { top: 0.19, bottom: 0.17 };
  const topTrim = Math.round(meta.height * trimPreset.top);
  const bottomTrim = Math.round(meta.height * trimPreset.bottom);
  const contentHeight = Math.max(1, meta.height - topTrim - bottomTrim);

  const croppedContent = image.extract({
    left: 0,
    top: topTrim,
    width: meta.width,
    height: contentHeight
  });

  const contentBuffer = await croppedContent.toBuffer();
  const contentMeta = await sharp(contentBuffer).metadata();
  const crop = clampExtract(
    centerCropToRatio(contentMeta.width, contentMeta.height, ratioW, ratioH),
    contentMeta.width,
    contentMeta.height
  );

  let pipeline = sharp(contentBuffer)
    .extract(crop)
    .resize(ratioW === 16 ? 1600 : 1200, ratioW === 16 ? 900 : 900, { fit: "cover", position: "centre" })
    .linear(1.06, -4);

  if (adjust === "interior") pipeline = pipeline.sharpen(0.9, 1, 1.4);

  await pipeline.jpeg({ quality: 85, mozjpeg: true, progressive: true }).toFile(output);
}

async function main() {
  ensureInputs();
  fs.mkdirSync(outputDir, { recursive: true });

  for (const job of jobs) {
    await processImage(job);
    console.log(`Wrote: ${job.output}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
