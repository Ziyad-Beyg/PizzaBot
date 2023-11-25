import { nanoid } from "nanoid";
import { SendOrderOutput } from "../Utils/HelperFunctions.mjs";

// Item Confirm Intent Webhook Function
const ConfirmItem = (agent) => {
  try {
    const { type, size, amount } = agent.context.get("system-vars").parameters;
    let basketContext = { name: "basket", lifespan: 50, parameters: {} },
      items = {};
    if (agent.context.get("basket")) {
      items = agent.context.get("basket").parameters.items;
    }
    items[nanoid()] = {
      type,
      size,
      amount,
    };
    basketContext.parameters.items = items;
    console.log(JSON.stringify(basketContext));
    agent.context.set(basketContext);

    let output = SendOrderOutput(agent);
    agent.add(`Your order so far is ${output}`);
    agent.add(`Anything else?`);
  } catch (error) {
    console.log(error);
  }
};

export default ConfirmItem;
