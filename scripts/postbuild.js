const fs = require('fs');
const path = require('path');

const root = process.cwd();
const srcDir = path.join(root, '.next', 'server', 'chunks');
const destDir = path.join(root, '.next', 'server');

function copyChunks() {
  if (!fs.existsSync(srcDir)) {
    console.log('postbuild: no server chunks directory found:', srcDir);
    return;
  }
  try {
    const files = fs.readdirSync(srcDir);
    files.forEach((file) => {
      const src = path.join(srcDir, file);
      const dest = path.join(destDir, file);
      try {
        fs.copyFileSync(src, dest);
      } catch (err) {
        console.error('postbuild: failed to copy', src, '->', dest, err.message);
      }
    });
    console.log('postbuild: copied', fs.readdirSync(srcDir).length, 'server chunk files to', destDir);
  } catch (err) {
    console.error('postbuild: error reading chunks directory', err.message);
  }
}

copyChunks();
