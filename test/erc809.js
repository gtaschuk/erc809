const ERC809 = artifacts.require("ERC809");

contract("ERC809", accounts => {
  let token;
  before(async function() {
    token = await ERC809.deployed();
  })

  it("should allow you to create a property", async () => {
    let newProperty = await token.createProperty()

    assert.equal(newProperty.logs[0].args.to, accounts[0], "The user should have minted their own token");
  });

  describe('when a property exists', () => {
    let propertyId
    beforeEach(async () => {
      let newProperty = await token.createProperty()
      propertyId = newProperty.logs[0].args.tokenId
    })

    it("should allow you to make a reservation", async () => {
      await token.reserve(propertyId, 1, 5)
      // TODO this should work when contained
      let renter = await token.renterOf(propertyId, 1)
      assert.equal(renter, accounts[0], "The property should be rented at time 3")
    });

    describe('when a reservation exists', () => {
      beforeEach(async () => {
        await token.reserve(propertyId, 10, 15)
      })

      it('should allow you to make a non-overlapping reservation', async () => {
        await token.reserve(propertyId, 20, 25)
      })

      it('should not allow you to make an overlapping reservation ending during', async () => {
        try {
          await token.reserve(propertyId, 7, 12)
        } catch (error) {
          return
        }
        assert(false)
      })

      it('should not allow you to make an overlapping reservation beginning during', async () => {
        try {
          await token.reserve(propertyId, 13, 18)
        } catch (error) {
          return
        }
        assert(false)
      })
    })
  })
});
