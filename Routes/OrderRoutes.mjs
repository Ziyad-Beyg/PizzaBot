import { Router } from "express";
import {
  getHomeRoute,
  postChatbotData,
} from "../Controllers/OrderController.mjs";

export const router = Router();

// Home Route
router.get("/", getHomeRoute);

// DialogFlow FulFillment WebHook Route
router.post("/webhook-call", postChatbotData);
