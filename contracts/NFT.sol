// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155, Ownable  {

    mapping(address => mapping(uint256 =>Listing)) public listings;
    mapping(address => uint256) public balances;

    struct Listing{
        uint price;
        address seller;
    }

    // Base URI
    string private baseURI;
    string public name;
    string public dataURl ;

    constructor (
     string memory url
        ) 
        ERC1155(url){
            setName('vaultHill');
            dataURl = url;
        }
    
    function  setName(string memory _name) public onlyOwner{
        name =_name;
    }

    function mint(uint256 id, uint256 amount, string memory _newuri) public {
         require(id != 0 , "Token does not exist !");
          _setURI(_newuri);
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts) public {
      
        _mintBatch(msg.sender, ids, amounts, "");
    }

    function addListing(uint256 price, address contractAddr, uint tokenId) public {

        ERC1155 token = ERC1155(contractAddr);
        require(token.balanceOf(msg.sender, tokenId)>0 , "Caller must own the given token !");
      
        require(token.isApprovedForAll(msg.sender, address(this)), "Contract must approved");
        listings[contractAddr][tokenId] = Listing(price, msg.sender);

    }

    function purchase(address contractAddr, uint256 tokenId, uint256 amount) public payable {

        Listing memory item = listings[contractAddr][tokenId];
        require(msg.value >= item.price * amount, "Insufficient fund sent");
        balances[item.seller] += msg.value;
        ERC1155 token = ERC1155(contractAddr); 
        token.safeTransferFrom(item.seller, msg.sender, tokenId, amount, "");
        
    }

}