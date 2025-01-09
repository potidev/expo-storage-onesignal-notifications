const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');
const { Paths } = require('@expo/config-plugins/build/android');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const fsPromises = fs.promises;

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

const files = [
  "isrg_root_x1.pem",
  "isrg_root_x2.pem",
  "one_signal.pem",
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const withTrustLocalCerts = config => {
  return withAndroidManifest(config, async config => {
    config.modResults = await setCustomConfigAsync(config, config.modResults);
    return config;
  });
};


const copyFileToRaw = async (fileName, config) => {
  // Define paths for the file.pem file
  const srcPemPath = path.join(__dirname, fileName);
  const resPemPath = path.join(
    await Paths.getResourceFolderAsync(config.modRequest.projectRoot),
    "raw",
    fileName
  );

  const resRawDir = path.resolve(resPemPath, "..");

  // Ensure the raw directory exists
  if (!fs.existsSync(resRawDir)) {
    await fsPromises.mkdir(resRawDir, { recursive: true });
  }

  // Copy the file.pem file
  try {
    await fsPromises.copyFile(srcPemPath, resPemPath);
    console.log(`${chalk.green('✔')} network_security_config (Android): ${fileName} copy.`)
  } catch (e) {
    throw new Error(`network_security_config (Android): Failed to copy ${fileName}: ${e.message}`);
  }
}

async function setCustomConfigAsync(config, androidManifest) {
  files.forEach(async (file) => {
    await copyFileToRaw(file, config);
  });

  // Define paths for the network_security_config.xml file
  const srcNetworkConfigPath = path.join(__dirname, "network_security_config.xml");
  const resNetworkConfigPath = path.join(
    await Paths.getResourceFolderAsync(config.modRequest.projectRoot),
    "xml",
    "network_security_config.xml"
  );

  const resXmlDir = path.resolve(resNetworkConfigPath, "..");

  // Ensure the XML directory exists
  if (!fs.existsSync(resXmlDir)) {
    await fsPromises.mkdir(resXmlDir, { recursive: true });
  }

  // Copy the network_security_config.xml file
  try {
    await fsPromises.copyFile(srcNetworkConfigPath, resNetworkConfigPath);
    console.log(`${chalk.green('✔')} network_security_config (Android): network_security_config.xml copy.`)
  } catch (e) {
    throw new Error(`network_security_config (Android): Failed to copy network_security_config.xml: ${e.message}`);
  }

  // Update the AndroidManifest.xml to include the network security config
  const mainApplication = getMainApplicationOrThrow(androidManifest);
  mainApplication.$["android:networkSecurityConfig"] = "@xml/network_security_config";

  await delay(5000);

  return androidManifest;
}

module.exports = withTrustLocalCerts;
