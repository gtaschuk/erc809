import React from "react";
import { newContextComponents} from "@drizzle/react-components"

const {
  AccountData,
  ContractData,
  ContractForm,
} = newContextComponents;


export default ({ drizzle, drizzleState }) => { // destructure drizzle and drizzleState from props
  return (
    <div className="App">
    <div>
      <h1>ERC 809</h1>
      <p>Create Properties and manage reservations</p>
    </div>

    <div className="section">
      <h2>Your Account</h2>
      <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3} />
    </div>

    <div className="section">
      <h2>ERC 809</h2>
      <p>
        This shows a simple ERC809 and a form to interact 
      </p>

      <h3>Number of properties I own: </h3>
      <ContractData
        drizzle={drizzle} 
        drizzleState={drizzleState}
        contract="ERC809"
        method="balanceOf"
        methodArgs={[drizzleState.accounts[0]]}
        />

      <h3>Renter at t = 10: </h3>
      <ContractData
        drizzle={drizzle} 
        drizzleState={drizzleState}
        contract="ERC809"
        method="renterOf"
        methodArgs={[1, 10]}
        />


      <h3>Create Property</h3>
      <ContractForm
        drizzle={drizzle}
        contract="ERC809"
        method="createProperty"
        />

      <h3>Reserve</h3>
      <ContractForm
        drizzle={drizzle}
        contract="ERC809"
        method="reserve"
        labels={["Property ID", "Start Time", "End Time"]}
        />
    </div>
  </div>
  )
};
