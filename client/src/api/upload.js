import serviceFactory from "./handlers";
const service = serviceFactory("uploads");

export default {
  service: service,
  postPhoto(file, photo_option) {
    const formData = new FormData();
    console.log(file, "file", photo_option, "option");
    formData.append("photo", file);
    return service
      .post(`/photo/${photo_option}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        return res.data;
      });
  },

  postText(text, text_option) {
    console.log(text, "file", text_option, "option");
    return service.post(`/text/${text_option}`, { text: text }).then(res => {
      return res.data;
    });
  },

  postCSV(json_info) {
    console.log("about to post");
    return service.post(`/kasboek`, { newKasboekRow: json_info }).then(res => {
      return res.data;
    });
  }
};
