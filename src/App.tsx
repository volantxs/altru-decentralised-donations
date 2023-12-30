

//lambda function?

import {WsProvider, ApiPromise} from "@polkadot/api"
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ChangeEvent, useEffect, useState } from "react"

const NAME = "Altru"

const App = () => { 
  const [api, setApi] = useState<ApiPromise>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>();
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>();


  const setup = async () => {
    const wsProvider = new WsProvider("wss://ws.gm.bldnodes.org/");
    const api = await ApiPromise.create({provider: wsProvider});
    setApi(api);

  }


  const handleConnection = async () => {
    const extensions = await web3Enable(NAME);

    if (!extensions) {
      throw Error("NO_EXTENSION_FOUND");
    }

    const allAccounts = await web3Accounts();

    console.log(allAccounts)

    setAccounts(allAccounts)

    if(allAccounts.length === 1) {
      setSelectedAccount(allAccounts[0]) 
    }

  }

  const handleAccountSelection = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedAddress = e.target.value

    const account = accounts?.find(account => account.address === selectedAddress)

    if(!account) {
      throw Error("No account found")
    } 

    setSelectedAccount(account)

  }

  useEffect(() => {
    setup();
    
  }, [])

  useEffect(() => {
    if(!api) return
    console.log("hiiasii");
    (async() => {
      const time = await api.query.timestamp.now();
      console.log(time.toPrimitive());  //toPrimitive is like json
    })();
  }, [api]);

  return (
    <>
    <div>
      {accounts?.length === undefined || 0 ? (
      <button onClick={handleConnection}>Connect</button>
      ) : null}

      {accounts?.length > 0 && !selectedAccount ? (
        <>
      <select onChange={handleAccountSelection} >
        <option value="" disabled selected hidden>
        Choose your account
        </option>
        {accounts?.map(account => (
        <option value={account.address}>{account.address}</option>
        ))}
      </select>
      </>
      ) : null}
      
      {selectedAccount ? (
        selectedAccount.address
        ) : null }
    </div>
    </>
  )
}

export default App
