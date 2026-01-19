const { ethers } = require("hardhat");
const config = require("./rent_config.json");

async function main() {
    const nft = await ethers.getContractAt("RentableGameItem", config.contract);

    const tokenId = 1;
    const user = await nft.userOf(tokenId);
    const owner = await nft.ownerOf(tokenId);

    console.log(`--- Token ${tokenId} Status ---`);
    console.log(`Owner: ${owner}`);
    
    if (user === ethers.ZeroAddress) {
        console.log("Current User: None (Rental Expired or Not Set)");
    } else {
        console.log(`Current User: ${user}`);
        const expiry = await nft.userExpires(tokenId);
        console.log(`Expires At: ${new Date(Number(expiry) * 1000).toLocaleString()}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
