import { CONTACT_LIST_SUCCESS, FAV_CONTACT_LIST_SUCCESS } from "./types";

import { getContactList } from "../api/contact_api";

export const contactListAction = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      getContactList()
        .then(({ contacts }) => {
          dispatch({
            type: CONTACT_LIST_SUCCESS,
            payload: contacts,
          });
          resolve({
            msg: "All contacts are recieved!",
            contacts,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const favContactListAction = (contactDetail) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: FAV_CONTACT_LIST_SUCCESS,
        payload: [contactDetail],
      });
      resolve({
        msg: "Contact has been added to favourites!",
      });
    } catch (error) {
      reject(error);
    }
  });
};
