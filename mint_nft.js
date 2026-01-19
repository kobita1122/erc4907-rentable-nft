const { ethers } = require("hardhat");
const config = require("./rent_config.json");

async function main() {
    const [owner] = await ethers.getSigners();
    const nft = await ethers.getContractAt("RentableGameItem", config.contract, owner);

    console.log("Minting Token ID 1...");
    
    const tx = await nft.mint(owner.address);
    await tx.wait();

    console.log("Minted! Owner is:", owner.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
