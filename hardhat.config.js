require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat:{
      chainId: 1337
    },
    testnet: {
  
      url: "https://matic-mumbai.chainstacklabs.com", // ploygon testnet RPC url
      chainId: 80001, // network chain id
      gasPrice: 20000000000,
      accounts: [`0x${"588d9c207ae3f33d5a71dd1b251ebce7a1e8fe960ac8094d00fcfdd5a4ce8363"}`], // metamask test account3 private key
    },
    mainnet: {
      url: "https://rpc-mainnet.maticvigil.com/", // ploygon mainnet RPC url
      chainId: 137, // main network chain id
      gasPrice: 20000000000,
      accounts: [`0x${"75cb13f0dd9df19d8ee4ee1524d694ef248a0699269ad1d114412e2f473c6369"}`]  // metamask main account private key
    }
  },
  solidity: "0.8.4",
};


// dklfvads,vndkvdn: 0xf01054587aDaE552682195d3A449588D95a09c27