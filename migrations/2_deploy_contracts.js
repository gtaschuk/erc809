const RivalIntervalTreeLibrary = artifacts.require("RivalIntervalTreeLibrary");
const ERC809 = artifacts.require("ERC809");

module.exports = function(deployer) {
  deployer.deploy(RivalIntervalTreeLibrary);
  deployer.link(RivalIntervalTreeLibrary, ERC809);
  deployer.deploy(ERC809);
};
