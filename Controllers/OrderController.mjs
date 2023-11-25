import { WebhookClient } from "dialogflow-fulfillment";
import PlaceOrder from "../Services/PlaceOrder.mjs";
import ConfirmItem from "../Services/ConfirmItem.mjs";
import CancelOrder from "../Services/CancelOrder.mjs";

// @desc Get Home Route of Server
// @route GET /api/chatbot
// @access public

const getHomeRoute = (req, res) => {
  res.send("DIALOGFLOW CHATBOT WEBHOOK RUNNING ON PORT 8080");
};

// @desc Post Chatbot Data to DialogFlow
// @route POST /api/chatbot/webhook-call
// @access public

const postChatbotData = (request, response) => {
  const _agent = new WebhookClient({ request, response });
  let intentMap = new Map();
  // DialogFlow Intents
  intentMap.set("item.confirm.yes", ConfirmItem);
  intentMap.set("user.info.get", PlaceOrder);
  intentMap.set("cancel.order", CancelOrder);
  _agent.handleRequest(intentMap);
  console.log("Order Submitted Successfully");
};

export { getHomeRoute, postChatbotData };
