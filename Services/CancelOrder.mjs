// Cancel Intent Webhook Function
const CancelOrder = (agent) => {
  let basketContext = agent.context.get("basket");
  if (basketContext) {
    basketContext.lifespan = 0;
    agent.add("Your Order is Canceled!");
  }
};

export default CancelOrder;
