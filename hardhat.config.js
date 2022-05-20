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
      accounts: [`0x${"6fed9b64d6cb8eebbafcfa2a4883ec87368cfc8226dbbbe7314c5b8801528bf5"}`], // metamask test account3 private key
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