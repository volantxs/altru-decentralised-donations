

//lambda function?

import {WsProvider, ApiPromise} from "@polkadot/api"
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { useEffect, useState } from "react"

const NAME = "Altru"

const App = () => { 
  const [api, setApi] = useState<ApiPromise>();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState();


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
      <button onClick={handleConnection}>Connect</button>
    </div>
    </>
  )
}

export default App
