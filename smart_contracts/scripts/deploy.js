const { hexStripZeros } = require("ethers/lib/utils");



const main = async () => {

  const Transactions = await hre.ethers.getContractFactory('Transactions');
  // a class/ factory that generate instances of a contract

  const transactions = await Transactions.deploy();
  //this is one specific instance

 await transactions.deployed();

 console.log("Transactions deployed to :",  transactions.address)

 //we need gas to make something happen


  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
  try 
  {
    await main();
    //This excute and deploy contract
    process.exit(0);
    //exit 0 means success

  } 
  
  catch (error) 
  {
    console.error(error);

    process.exit(1)
    // exit 1 means error

  }
}


runMain();
//This line is executes first it call main functions and code is deployed