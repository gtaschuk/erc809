//import Web3 from "web3";
import ERC809 from "./contracts/ERC809.json";


//const customProvider = new Web3.providers.WebsocketProvider("ws://localhost:8545")
const web3 = {
  fallback: {
    type: "ws",
    url: "ws://127.0.0.1:8545",
  }
}


  //const web3 = {
  //////block: false,
  //customProvider,
  //}

const options = {
  web3,
  contracts: [ERC809],
  events: {
    ERC809: ["Reserve", "CancelReservation", "Transfer"],
  },
};

export default options;
