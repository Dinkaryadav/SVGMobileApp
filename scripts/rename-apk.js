import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist"); // EAS stores artifacts here
const outputDir = path.join(projectRoot, "output");

// Ensure output folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const appName = "SVGMobileApp";
const version = "v1.0.0"; // Optional: read dynamically if needed
const date = new Date().toISOString().split("T")[0];

try {
  // Find APK file in dist/
  const files = fs.readdirSync(distDir).filter((f) => f.endsWith(".apk"));

  if (files.length === 0) {
    console.log("❌ No APK file found in dist/.");
    process.exit(1);
  }

  const apkName = files[0];
  const newFileName = `${appName}_${version}_${date}.apk`;

  fs.renameSync(path.join(distDir, apkName), path.join(outputDir, newFileName));

  console.log(`✅ Renamed ${apkName} → ${newFileName}`);
} catch (err) {
  console.error("⚠️ Error renaming APK:", err);
  process.exit(1);
}
