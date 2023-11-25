import { PizzaSizes } from "./Constants.mjs";
import { OrderModel } from "../Models/OrderModel.mjs";
import twilio from "twilio";

// SMS Sending Helper Function
export const SendMessage = async (body) => {
  const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  let messageOption = {
    from: process.env.SENDER_NUMBER,
    to: process.env.RECIEVER_NUMBER,
    body,
  };
  try {
    const message = await client.messages.create(messageOption);
  } catch (error) {
    console.log(error);
  }
};

// Order Output Generating Helper Function
export const SendOrderOutput = (agent) => {
  const basketItem = agent.context.get("basket").parameters.items;
  let itemKeys = Object.keys(basketItem);

  let basketOutput = "";

  for (let i = 0; i < itemKeys.length; i++) {
    let item = basketItem[itemKeys[i]];
    if (i > 0 && i === itemKeys.length - 1) {
      basketOutput += ` and `;
    } else if (i > 0) {
      basketOutput += `, `;
    }
    basketOutput += `${item.amount} ${PizzaSizes[item.size]} (${item.size}) ${
      item.type
    } pizza`;
  }

  return basketOutput;
};

// Save To DB Helper Function
export const SaveToDB = async (agent, customer) => {
  try {
    const basketItem = agent.context.get("basket").parameters.items;
    let itemKeys = Object.keys(basketItem);
    let orderArray = [];

    for (let i = 0; i < itemKeys.length; i++) {
      let item = basketItem[itemKeys[i]];
      let singleEntry = {
        pizzaType: `${item.type} pizza`,
        pizzaSize: `${PizzaSizes[item.size]} (${item.size})`,
        pizzaQuantity: item.amount,
      };
      orderArray.push(singleEntry);
    }

    console.log("orderArray: ", orderArray);
    console.log("Customer: ", customer);

    const order = await OrderModel.create({
      customerName: customer.name.name,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      orderDetails: orderArray,
    });

    return order;
  } catch (error) {
    console.log(error);
  }
};
