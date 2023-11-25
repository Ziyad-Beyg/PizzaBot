import mongoose from "mongoose";

// DB Schema For Placing Order
const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Please add customer name"],
    },
    customerPhone: {
      type: String,
      required: [true, "Please add customer phone"],
    },
    customerAddress: {
      type: String,
      required: [true, "Please add customer address"],
    },
    orderDetails: [
      {
        pizzaType: {
          type: String,
          required: [true, "Please add pizza type"],
        },
        pizzaSize: {
          type: String,
          required: [true, "Please add pizza size"],
        },
        pizzaQuantity: {
          type: String,
          required: [true, "Please add pizza quantity"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("order", orderSchema);
