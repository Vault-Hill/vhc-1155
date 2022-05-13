// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155, Ownable  {

    
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

}