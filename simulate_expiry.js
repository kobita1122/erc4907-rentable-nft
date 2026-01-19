const { ethers } = require("hardhat");
const config = require("./rent_config.json");

async function main() {
    // This script only works on local Hardhat Network
    console.log("Fast forwarding time by 2 hours...");

    await ethers.provider.send("evm_increaseTime", [7200]);
    await ethers.provider.send("evm_mine");

    const nft = await ethers.getContractAt("RentableGameItem", config.contract);
    
    // Check user again
    const user = await nft.userOf(1);
    
    if (user === ethers.ZeroAddress) {
        console.log("SUCCESS: User address is automatically Zero (Expired).");
    } else {
        console.log("FAIL: User still exists.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
