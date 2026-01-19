// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC4907.sol";

contract RentableGameItem is ERC4907 {
    uint256 public tokenCount;

    constructor() ERC4907("Magic Sword", "SWORD") {}

    function mint(address to) public {
        tokenCount++;
        _mint(to, tokenCount);
    }
}
