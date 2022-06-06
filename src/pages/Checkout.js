// import React, {useState} from "react";
import {Button} from "@chakra-ui/button";

const Checkout = () => {
    const isMetaMaskInstalled = () => {
        const {ethereum} = window;
        return Boolean(ethereum && ethereum?.isMetaMask);
    };

    const handlePayment = async () => {
        if (!isMetaMaskInstalled) {
            console.log("Please install Metamask")
            return
        }
        const ETH = window?.ethereum
        await ETH.request({method: 'eth_requestAccounts'});

        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            to: '0xcAF8391EcF53464c1231aA73394B00cFD5f72568',
            from: ETH.selectedAddress, // must match user's active address.
            value: '0x000010000000000000',
            chainId: '0x61', // BSC Testnet
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ETH.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log(txHash)
    }

    return (
        <div>
            <Button
                onClick={handlePayment}
            >
                Pay
            </Button>
        </div>
    )
}

export default Checkout
