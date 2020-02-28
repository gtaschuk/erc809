const fs = require("fs");

const path = require("path");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const ganacheMnemonic =
  "album wire record stuff abandon mesh museum piece bean allow refuse below"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*" // Any network (default: none)
    },
    //dockerGanache: {
      //provider: new HDWalletProvider(
        //ganacheMnemonic,
        //"http://ganache:8545",
        //0,
        //3
      //),
      //network_id: "*" // Any network (default: none)
    //}
  }
};
