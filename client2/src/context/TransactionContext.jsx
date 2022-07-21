import React, {useEffect, useState} from 'react'

import {ethers} from 'ethers'

import {contractABI, contractAddress} from '../utils/constants'

export const TransactionContext = React.createContext();

//since we use metamask we have access to ethereum object

const {ethereum} = window;


//function to fetch ethereum contract

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)

    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    //three ingrediants need to fetch our contract

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // });

    return transactionContract
}


export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', mwssage: '' })

    const [isLoading, setIsLoading] = useState(false)

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

    const [transactions, setTransactions] = useState([]);


    const handleChange = (e, name) => {
        //handle change is going to dynamically update form data
        setFormData( (prevState) => ({
            ...prevState, [name] : e.target.value

        }))
    }
 
        const getAllTransactions = async () => {
            try 
            {
                if(!ethereum) return alert("Please install Metamask")

                const transactionContract =   getEthereumContract();

                const availableTransactions = await transactionContract.getAllTransactions()

                const structuredTransactions = availableTransactions.map( (transation) => ({
                    addressTo: transation.receiver,
                    addressFrom: transation.sender,
                    timestamp: new Date(transation.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transation.message,
                    keyword: transation.keyword,
                    amount: parseInt(transation.amount._hex) / (10 ** 18)
                }))

                //console.log(availableTransactions);
                setTransactions(structuredTransactions);

                console.log(structuredTransactions);
            } 
            catch (error) 
            {
               console.log(error);
            }
        }


    const checkIfWalletIsConnected = async () => {

            try 
            {
                if(!ethereum) return alert("Please install Metamask")


                const accounts = await ethereum.request({
                    method: 'eth_accounts'
                })
        
                if(accounts.length) {
                    //setConnectedAccount(accounts[0])
                    setCurrentAccount(accounts[0]);


                        getAllTransactions()
        
                //get all transactions
        
                //console.log(accounts);
                } else {
                    console.log('No accounts found');
                }    
            }
             catch (error) 
            {
                console.log(error);
                //throw new error('No ethereum object')
            }


    }


    const checkIfTransactionsExist = async () => {
        try 
        {
            const transactionContract =   getEthereumContract();

            const transactionCount = await transactionContract.getTransactionCount()

            window.localStorage.setItem('transactionsCount', transactionCount)
        } 
        catch (error) 
        {
            console.log(error);
        }
    }


    const connectWallet = async () => {
        try 
        {
            if(!ethereum) return alert("Please install Metamask")

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })

            setCurrentAccount(account[0])
        } 
        
        catch (error) 
        {
            console.log(error);
            //throw new error('No ethereum object')
        }
    }



    const sendTransaction = async () => {
        //Entire logic for sending and storing transactions

        try 
        {
            if(!ethereum) return alert("Please install Metamask")
            //get the data from forms

            const {addressTo, amount, message, keyword} = formData;

          const transactionContract =   getEthereumContract();

          const parsedAmount = ethers.utils.parseEther(amount)

          await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //2100 gwei
                value: parsedAmount._hex, // 0.0001

            }]
          });



        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);

        await transactionHash.wait()

        setIsLoading(false);
        console.log(`Success - ${transactionHash.hash}`);

        const transactionCount = await transactionContract.getTransactionCount()

        setTransactionCount(transactionCount.toNumber());

        location.reload()

    
        } 
        catch (error)
        {
            console.log(error);
            throw new error('No ethereum object')
        }

    }
 




useEffect(() => {
  checkIfWalletIsConnected();

  checkIfTransactionsExist()

  
}, [])



    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )

}
