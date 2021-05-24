import axios from "axios";

const BASE_URL = "https://reqres.in/api/users";

// To Retrieve Contacts
export const getContactList = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${BASE_URL}/?per_page=30`)
        .then(({ data }) => {
          resolve({
            msg: "All contacts are recieved!",
            contacts: data,
          });
        })
        .catch((error) => {
          throw {
            msg: "There seems to be a issue with retrieving data!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};

// To Retrieve A Contact By Id
export const getContactById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${BASE_URL}/?per_page=30`)
        .then(({ data }) => {
          resolve({
            msg: "Contact recieved!",
            contacts: data,
          });
        })
        .catch((error) => {
          throw {
            msg: "There seems to be a issue with retrieving contact!",
            error,
          };
        });
    } catch (error) {
      reject(error);
    }
  });
};
