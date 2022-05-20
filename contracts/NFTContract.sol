// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface IERC2981Royalties {
    
    function royaltyInfo(uint256 _tokenId, uint256 _value)
        external
        view
        returns (address _receiver, uint256 _royaltyAmount);
}

abstract contract ERC2981Base is ERC165, IERC2981Royalties {
    struct RoyaltyInfo {
        address recipient;
        uint24 amount;
    }

   
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC2981Royalties).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}

contract NFTContract is ERC1155, ERC2981Base {
    
    RoyaltyInfo private _royalties;
    string public dataURl;
    address _sender = msg.sender;
  
     constructor (
     string memory url, uint256 _royaltyFees
        ) 
        ERC1155(url){
            dataURl = url;
            _setRoyalties(_sender , _royaltyFees);
        }
    
    // This metadata is about the contract and not the individual NFTs
    function contractURI() public view returns (string memory) {
        return dataURl;
    }
    
    // method use to mint the NFT
    function mint(uint256 id, uint256 amount, string memory _newuri) public {
        _setURI(_newuri);
        _mint(msg.sender, id, amount, "");
    }

    // 10000 = 100% , 100 = 1% etc
    function _setRoyalties(address recipient, uint256 value) internal {
        require(value <= 10000, 'ERC2981Royalties: Too high');
        _royalties = RoyaltyInfo(recipient, uint24(value));
    }

    // set royalty information recipient address and value
    function royaltyInfo(uint256, uint256 value)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalties = _royalties;
        receiver = royalties.recipient;
        royaltyAmount = (value * royalties.amount) / 10000;
    }

     function burn( address from, uint256 id, uint256 amount) public {
        require(msg.sender == from);
        _burn(from, id, amount);
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC2981Base) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
}
