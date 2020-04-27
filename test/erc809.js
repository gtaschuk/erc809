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

      it('should allow you to make a non-overlapping reservation before', async () => {
        let start = 1, end = 5
        let available = await token.checkAvailable(propertyId, start, end)

        assert(available, "property should be available")
        await token.reserve(propertyId, 1, 5)
      })

      it('should allow you to make a non-overlapping reservation after', async () => {
        let start = 20, end = 25
        let available = await token.checkAvailable(propertyId, start, end)

        assert(available, "property should be available")
        await token.reserve(propertyId, start, end)
      })

      it('should not allow you to make an overlapping reservation ending during', async () => {
        let start = 7, end = 12
        let available = await token.checkAvailable(propertyId, start, end)

        assert(!available, "property should not be available")
        try {
          await token.reserve(propertyId, start, end)
        } catch (error) {
          return
        }
        assert(false)
      })

      it('should not allow you to make an overlapping reservation beginning during', async () => {
        let start = 13, end = 18
        let available = await token.checkAvailable(propertyId, start, end)

        assert(!available, "property should not be available")
        try {
          await token.reserve(propertyId, start, end)
        } catch (error) {
          return
        }
        assert(false)
      })

      it('should allow you to delete a reservation', async () => {
        await token.cancelReservation(propertyId, 10)

        let start = 9, end = 18
        let available = await token.checkAvailable(propertyId, start, end)

        assert(available, "property should be available once reservation is cancelled")
      })
    })
  })
});
