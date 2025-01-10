const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');

// Caminhos dos arquivos
const readmePath = path.resolve(__dirname, '../README.md');
const packageJsonPath = path.resolve(__dirname, '../package.json');

// Lê a versão atual do package.json
function getCurrentVersion() {
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.version;
  } catch (error) {
    console.error(chalk.red('❌  Error reading package.json:', error.message));
    process.exit(1);
  }
}

// Atualiza a versão no README.md
function updateReadmeVersion(version) {
  try {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const updatedContent = readmeContent.replace(
      /\[!\[\]\(https:\/\/img\.shields\.io\/badge\/Beta-([\d.]+)-purple\)\]\(https:\/\/www\.npmjs\.com\/package\/@potidev\/expo-storage-onesignal-notifications\)/,
      `[![](https://img.shields.io/badge/Beta-${version}-purple)](https://www.npmjs.com/package/@potidev/expo-storage-onesignal-notifications)`
    );

    fs.writeFileSync(readmePath, updatedContent, 'utf8');
    console.log(chalk.greenBright(`✅  README.md updated to version ${chalk.bold(version)}!`));
  } catch (error) {
    console.error(chalk.red('❌  Error updating README.md:', error.message));
    process.exit(1);
  }
}

// Atualiza a versão no package.json
function updatePackageJsonVersion(version) {
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    packageJson.version = version;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(chalk.greenBright(`✅  package.json updated to version ${chalk.bold(version)}!`));
  } catch (error) {
    console.error(chalk.red('❌  Error updating package.json:', error.message));
    process.exit(1);
  }
}

// Pergunta ao usuário pela nova versão
function askForVersion() {
  const currentVersion = getCurrentVersion();
  console.log(chalk.yellow('⚙️  Welcome to the version updater!'));
  rl.question(
    chalk.cyan(`🚀 Current version is ${chalk.bold(currentVersion)}. Enter the new version: `),
    (version) => {
      if (!/^\d+\.\d+\.\d+$/.test(version)) {
        console.log(chalk.red('❌  Invalid version format. Use the format x.x.x.'));
        rl.close();
        return;
      }

      updateReadmeVersion(version);
      updatePackageJsonVersion(version);

      console.log(chalk.blue('📘 Check README.md and package.json to confirm the changes.'));
      rl.close();
    }
  );
}

// Cria interface para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Inicia o processo
askForVersion();