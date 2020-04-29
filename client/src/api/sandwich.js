import serviceFactory from "./handlers";
const service = serviceFactory("sandwiches");

export default {
  service: service,
  getSandwiches() {
    return service.get("").then(res => {
      const sandwiches = res.data.sandwiches;
      return sandwiches;
    });
  },

  deleteSandwich(id) {
    console.log("id", id);
    return service.delete(`/${id}`).then(res => {
      return res.data;
    });
  },

  editSandwich(updatedSandwich) {
    console.log("changes", updatedSandwich);
    return service.patch("", updatedSandwich).then(res => {
      return res.data;
    });
  },

  addSandwich(newSandwich) {
    return service.post("", newSandwich).then(res => {
      return res.data;
    });
  }
};
