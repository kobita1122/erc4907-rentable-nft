const { ethers } = require("hardhat");
const config = require("./rent_config.json");

async function main() {
    const [owner, renter] = await ethers.getSigners();
    const nft = await ethers.getContractAt("RentableGameItem", config.contract, owner);

    // Current time
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const now = block.timestamp;

    // Rent for 3600 seconds (1 hour)
    const expires = now + 3600;

    console.log(`Renting Token 1 to ${renter.address} until ${new Date(expires * 1000).toLocaleString()}...`);

    const tx = await nft.setUser(1, renter.address, expires);
    await tx.wait();

    console.log("Rental Active!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
