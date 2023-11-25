import {
  SaveToDB,
  SendMessage,
  SendOrderOutput,
} from "../Utils/HelperFunctions.mjs";

// Place Order Intent Webhook Function
async function PlaceOrder(agent) {
  try {
    const { name, phone, address } =
      agent.context.get("system-vars").parameters;
    let output = SendOrderOutput(agent);

    const orderDetails = `Customer Name: ${
      name.name
    } \nCustomer Number: ${phone} \nCustomer Address: ${address} \n\nORDER DETAILS: \n\n${output} \n\nData&Time: ${new Date()}`;

    let order = SaveToDB(agent, { name, phone, address });

    if (order) {
      agent.add(`ORDER SUBMITTED:`);
      agent.add(orderDetails);
      agent.add(`Thank You For Ordering 💙`);

      agent.context.get("basket").lifespan = 0;
      console.log(agent.context.get("basket").parameters.items);

      // SendMessage(`\n\nNEW ORDER \n\n${orderDetails}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export default PlaceOrder;
