const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Rentable NFT with:", deployer.address);

    const Item = await ethers.getContractFactory("RentableGameItem");
    const item = await Item.deploy();
    await item.waitForDeployment();
    const address = await item.getAddress();

    console.log(`Contract Deployed: ${address}`);

    // Save Config
    const config = { contract: address };
    fs.writeFileSync("rent_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
