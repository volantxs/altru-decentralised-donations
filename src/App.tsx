

//lambda function?

import {WsProvider, ApiPromise} from "@polkadot/api"
import { useEffect, useState } from "react"

const App = () => { 
  const [api, setApi] = useState<ApiPromise>();

  const setup = async () => {
    const wsProvider = new WsProvider("wss://ws.gm.bldnodes.org/");
    const api = await ApiPromise.create({provider: wsProvider});
    setApi(api);

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
      dappj
    </>
  )
}

export default App
