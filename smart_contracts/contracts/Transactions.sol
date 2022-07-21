//SPDX-License-Identifier: UNLICENSED

pragma solidity^0.8.0; 

contract Transactions {
    // contract serves purpose of obj in OOPS

    uint256 transactionCount;
    //value of our transactions

    event Transfer( 
                    address from,
                    address receiver,
                    string message,
                    uint256 timestamp,
                    string keyword,
                    uint amount

                    
                    );
                    //function, call later when needed

                    struct TransferStruct {

                        //similar to object, just specify properties
                        // and what type properties are going to be

                        address sender;
                        address receiver;
                        uint amount;
                        string message;
                        uint256 timestamp;
                        string keyword;
                    }

                    //define array to store all transactions

                    TransferStruct[] transactions;
                    // transaction is variable containing array of object



                    //creating different functions

                    //functions 1
                    function addToBlockchain( 
                                                address payable receiver,
                                                uint amount,
                                                string memory message,
                                                string memory keyword

                                            ) public {


                        // main function definition , where core things happen

                        transactionCount += 1;
                        // incriment no. by one


                        transactions.push(
                            TransferStruct(
                                        msg.sender,
                                        receiver,
                                        amount,
                                        message,
                                        block.timestamp,
                                        keyword
                                        )
                        );
                        //push to block chain


                        

                        // pushing to specific transaction
                        // into transaction array
                        // we just adding to list of
                        // transactions


                        // to transaction to occur we need to emit


                        //emit

                        emit Transfer(msg.sender, receiver, message, block.timestamp, keyword, amount); 


                    }


                    //functions 2
                    function getAllTransactions() public view returns(TransferStruct[] memory){

                        //return transaction array
                        return transactions;
                        
                    }


                    //functions 3
                    function getTransactionCount() public view returns(uint256) {

                        //return transaction 
                        return transactionCount;
                        
                    }









}