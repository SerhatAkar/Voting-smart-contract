const ethers = require('ethers');

async function parseBytes(args) {
    const bytes = args[0];
    const name = ethers.utils.parseBytes32String(bytes);
   return name;
}

parseBytes(process.argv.slice(2));
module.exports = {parseBytes}