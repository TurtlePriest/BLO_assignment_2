const Bank = artifacts.require("./Bank.sol");


contract("Bank test", function(accounts) {
    const lukas = accounts[0];
    const mads = accounts[1];


    it("Can add new accounts and check their balance", async () => {
        const bank = await Bank.deployed();

        await bank.addAccount({from: lukas});
        const lukasBalance = await bank.getBalance({from: lukas});
        assert.equal(lukasBalance, 0, "Initial balance is incorrect")

        await bank.addAccount({from: mads});
        const madsBalance = await bank.getBalance({from: mads});
        assert.equal(madsBalance, 0, "Initial balance is incorrect")

    });

    it("Can successfully deposit", async () => {
        const bank = await Bank.deployed();

        const initialBalance = 0;
        const lukasAmount = 5;
        const madsAmount = 3;
        
        await bank.deposit({from: lukas, value: lukasAmount});
        const lukasBalance = await bank.getBalance({from: lukas});
        assert.equal(lukasBalance, initialBalance + lukasAmount, "Amount is incorrect")

        await bank.deposit({from: mads, value: madsAmount});
        const madsBalance = await bank.getBalance({from: mads});
        assert.equal(madsBalance, initialBalance + madsAmount, "Amount is incorrect")

        const totalBalance = await bank.getTotalBalance();
        assert.equal(totalBalance, initialBalance + parseInt(lukasBalance) + parseInt(madsBalance), "The total balance does not add up")

    });

    it("Can successfully withdraw", async () => {
        const bank = await Bank.deployed();
        
        const lukasAmount = 5;
        const withdraw = 4;
        initialBalance = await bank.getTotalBalance();

        await bank.withdraw(withdraw, {from: lukas});
        const lukasBalance = await bank.getBalance({from: lukas});
        assert.equal(lukasBalance, lukasAmount - withdraw, "Withdraw amount is incorrect");

    });

});