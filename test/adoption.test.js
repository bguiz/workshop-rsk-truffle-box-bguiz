const Adoption = artifacts.require('Adoption');

const assert = require('assert');

const BN = web3.utils.BN;

contract('Adoption', (accounts) => {
  it('user can adopt pet', async () => {
    const inst = await Adoption.deployed();

    const adopterAccount = accounts[5];
    const expectedPetId = new BN(8);
    const adoptTxInfo = await inst.adopt(
      expectedPetId,
      {
        from: adopterAccount,
      },
    );

    assert.equal(
      adoptTxInfo.receipt.status,
      true,
      'adoption transaction failed',
    );
  });

  it('remembers adopter account', async () => {
    inst = await Adoption.deployed();

    const adopterAccount = accounts[5];
    const expectedPetId = new BN(8);
    const returnedAccount = await inst.adopters(
      expectedPetId,
    );

    assert.equal(
      returnedAccount,
      adopterAccount,
      'returned adopter account mismatch',
    );
  });
});
