const ethers = require('ethers');
 async function createBytes(args) {
    const name = args[0];
    const bytes = ethers.utils.formatBytes32String(name);
    return bytes;
}

module.exports = { createBytes }
// createBytes(process.argv.slice(2));