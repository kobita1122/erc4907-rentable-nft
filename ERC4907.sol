// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Minimal Interface for ERC-4907
interface IERC4907 {
    event UpdateUser(uint256 indexed tokenId, address indexed user, uint64 expires);
    function setUser(uint256 tokenId, address user, uint64 expires) external;
    function userOf(uint256 tokenId) external view returns (address);
    function userExpires(uint256 tokenId) external view returns (uint256);
}

contract ERC4907 is ERC721, IERC4907 {
    struct UserInfo {
        address user;   // address of user role
        uint64 expires; // unix timestamp, user expires
    }

    mapping(uint256 => UserInfo) internal _users;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    /// @notice set the user and expires of an NFT
    /// @dev The zero address indicates there is no user
    function setUser(uint256 tokenId, address user, uint64 expires) public virtual override {
        // Only owner or approved operator can set user
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        
        UserInfo storage info = _users[tokenId];
        info.user = user;
        info.expires = expires;
        
        emit UpdateUser(tokenId, user, expires);
    }

    /// @notice Get the user address of an NFT
    /// @dev The zero address indicates that there is no user or the user is expired
    function userOf(uint256 tokenId) public view virtual override returns (address) {
        if (uint256(_users[tokenId].expires) >= block.timestamp) {
            return _users[tokenId].user;
        } else {
            return address(0);
        }
    }

    /// @notice Get the user expires of an NFT
    function userExpires(uint256 tokenId) public view virtual override returns (uint256) {
        return _users[tokenId].expires;
    }
}
