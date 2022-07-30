// https://github.com/ethers-io/ethers.js/issues/487#issuecomment-1084339975

import { ethers } from "ethers";
import { Interface, LogDescription } from "ethers/lib/utils";

const argsParser = (parsed: LogDescription): Record<string, any> => {
  const parsedEvent: Record<string, any> = {};

  for (let i = 0; i < parsed.args.length; i++) {
    const input = parsed.eventFragment.inputs[i];
    const arg = parsed.args[i];

    const newObj = { ...input, ...{ value: arg } };
    parsedEvent[input["name"]] = newObj.value;
  }
  return parsedEvent;
};

const eventParser = (receipt: ethers.providers.TransactionReceipt, abi: any) => {
  const iface = new Interface(abi);

  let parsedEvents = [];

  for (let event of receipt.logs) {
    try {
      const ethersParsed = iface.parseLog(event);
      parsedEvents.push(ethersParsed);
    } catch (error) {}
  }

  const args = argsParser(parsedEvents[0]);

  return { name: parsedEvents[0].name, args };
};

export default eventParser;
