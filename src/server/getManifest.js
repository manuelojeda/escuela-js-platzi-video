import fs from 'fs';

const getManifest = () => {
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8'));
  } catch (error) {
    console.log(error);
  }
  return manifest;
};

export default getManifest;
