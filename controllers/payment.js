const crypto = require("crypto");
const { BILLPLZ_X_SIGNATURE } = require("../config");

const Order = require("../models/order");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  // verify the signature
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;

  const x_signature = crypto
    .createHmac("sha256", BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex"); //Hmac is an encryption method

  // compare the x_signature with the one from billplz
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature not valid");
  } else {
    // if signature is correct, update the order status and also payment date
    // find the order using billplz id
    const selectedOrder = await Order.findOne({ billplz_id: billplz_id }); // using findOne cuz we wanna find one id only

    // check if order exists or nah
    if (!selectedOrder) {
      // if order not found throw error
      throw new Error("Order not found");
    } else {
      // if order is found, update the order
      selectedOrder.status = billplz_paid === "true" ? "paid" : " failed ";
      selectedOrder.paid_at = billplz_paid_at;

      // save the order
      const updatedOrder = await selectedOrder.save();
      return updatedOrder;
      // return await order.save();
    }
  }
};

module.exports = {
  verifyPayment,
};
