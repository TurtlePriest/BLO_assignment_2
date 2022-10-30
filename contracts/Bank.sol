pragma solidity ^0.5.0;

contract Bank {
    mapping(address => uint)public balances;

    function addAccount() public payable returns(string memory) {
        balances[msg.sender] = msg.value;
        return "Account created";
    }

    function deposit()public payable{
        balances[msg.sender] += msg.value;
    }
    function withdraw(uint amount)public {
        if (amount <= balances[msg.sender]){
            balances[msg.sender]-= amount;
        }
    }
    function getBalance()public view returns (uint){
        return balances[msg.sender];
    }

    function getTotalBalance() public view returns (uint){
        return address(this).balance;
    }
}