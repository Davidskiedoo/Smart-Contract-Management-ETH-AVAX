import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  //I added two state variables
  const [customDepositAmount, setCustomDepositAmount] = useState(undefined);
  const [customWithdrawAmount, setCustomWithdrawAmount] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

  const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
  handleAccount(accounts);

  // once wallet is set we can get a reference to our deployed contract
  getATMContract();
};
   
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      const tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      const tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  //custom deposit 
  const depositCustom = async () => {
    if (atm && customDepositAmount > 0) {
      const tx = await atm.deposit(customDepositAmount);
      await tx.wait();
      getBalance();
    } else {
      console.error("Invalid amount for deposit");
    }
  };
  //custom withdraw
  const withdrawCustom = async () => {
    if (atm && customWithdrawAmount > 0) {
      const tx = await atm.withdraw(customWithdrawAmount);
      await tx.wait();
      getBalance();
    } else {
      console.error("Invalid amount for withdrawal");
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }
     // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount} style={{ padding: '10px 20px', height: '40px' }}>Connect your MetaMask wallet</button>
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit} style={{ width: '200px', height: '40px', padding: '10px 20px', marginRight: '10px' }}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={{ width: '200px', height: '40px', padding: '10px 20px', marginLeft: '10px' }}>Withdraw 1 ETH</button>
        <div>
          <input
            type="number"
            value={customDepositAmount}
             onChange={(e) => setCustomDepositAmount(parseFloat(e.target.value))}
            style={{ width: '200px', height: '40px', padding: '5px', boxSizing: 'border-box' }}
          />
          <button onClick={depositCustom} style={{ padding: '10px 20px', marginTop: '10px',}}>Deposit Custom ETH Amount</button>
        </div>
        <div>
          <input
            type="number"
            value={customWithdrawAmount}
            onChange={(e) => setCustomWithdrawAmount(parseFloat(e.target.value))}
            style={{ width: '200px', height: '40px', padding: '5px', boxSizing: 'border-box' }}
          />
          <button onClick={withdrawCustom} style={{ padding: '10px 20px', marginTop: '10px' }}>Withdraw Custom ETH Amount</button>
        </div>
      </div>
    );
  };

  useEffect(() => {getWallet();}, []);
  
  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
