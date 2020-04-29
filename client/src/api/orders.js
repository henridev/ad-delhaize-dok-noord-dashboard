import serviceFactory from "./handlers";
const service = serviceFactory("orders");

export default {
  service: service,
  getOrders() {
    return service.get("").then(res => {
      const bestellingen = res.data.bestellingen;
      return bestellingen;
    });
  },

  deleteOrder(orderId) {
    return service.delete(`/${orderId}`).then(res => {
      return res.data;
    });
  }
};
