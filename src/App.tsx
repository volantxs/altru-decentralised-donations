

//lambda function?

import {WsProvider, ApiPromise} from "@polkadot/api"
import { useEffect, useState } from "react"

const App = () => { 
  const [api, setApi] = useState<ApiPromise>();

  const setup = async () => {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({provider: wsProvider});
    setApi(api);
  }

  useEffect(() => {
    setup();
  }, [])

  useEffect(() => {
    if(!api) return

    (async() => {
      const time = await api.query.timestamp.now();
      console.log(time);
    })

  }, [])

  return (
    <>
      dappj
    </>
  )
}

export default App
