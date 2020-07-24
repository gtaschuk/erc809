import React, { Fragment } from "react";
import { newContextComponents} from "@drizzle/react-components"

const {
  AccountData,
  ContractData,
  ContractForm,
} = newContextComponents;


export default class MyComponent extends React.Component {
  state = {
    hasPropertyDataKey: false
  }

  async componentDidMount() {

    let { drizzle, drizzleState } = this.props
    const account = drizzleState.accounts[0]
    const contract = drizzle.contracts.ERC809
    const contractState = drizzleState.contracts.ERC809

    let hasProperty
    if (contractState.initialized) {
      const hasPropertyDataKey = await contract.methods.balanceOf.cacheCall(account)

      this.setState({hasPropertyDataKey})
    }
  }

  render () {
    let { drizzle, drizzleState } = this.props
    let {hasPropertyDataKey} = this.state
    const account = drizzleState.accounts[0]

    const contractState = drizzleState.contracts.ERC809
    const methodCache = contractState.balanceOf

    const hasProperty = methodCache[hasPropertyDataKey] && methodCache[hasPropertyDataKey].value
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
            methodArgs={[account]}
          />

            <h3>Create Property</h3>
            <ContractForm
              drizzle={drizzle}
              contract="ERC809"
              method="createProperty"
            />

              { hasProperty &&
              <Fragment>
                <h3>Owner: </h3>
                <ContractData
                  drizzle={drizzle} 
                  drizzleState={drizzleState}
                  contract="ERC809"
                  method="ownerOf"
                  methodArgs={[1]}
                />

                  <Fragment>
                    <h3>Renter at t = 10: </h3>
                    <ContractData
                      drizzle={drizzle} 
                      drizzleState={drizzleState}
                      contract="ERC809"
                      method="renterOf"
                      methodArgs={[1, 10]}
                    />
                      </Fragment>


                      <h3>Reserve</h3>
                      <ContractForm
                        drizzle={drizzle}
                        contract="ERC809"
                        method="reserve"
                        labels={["Property ID", "Start Time", "End Time"]}
                      />
                        </Fragment>
                        }
                      </div>
                    </div>
                    )
}
};
