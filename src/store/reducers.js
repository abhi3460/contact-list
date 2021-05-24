import {
  CLEAR_CONCTACTS,
  CONTACT_LIST_SUCCESS,
  CLEAR_FAV_CONCTACTS,
  FAV_CONTACT_LIST_SUCCESS,
} from "./types";

const initial_state = {
  contacts: [],
  favContacts: [],
};

const contactReducer = (state = initial_state, action) => {
  switch (action.type) {
    case CONTACT_LIST_SUCCESS:
      return {
        ...state,
        contacts: { ...action.payload },
      };

    case FAV_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        favContacts: [ ...state.favContacts, ...action.payload ],
      };

    case CLEAR_CONCTACTS:
      return {
        ...state,
        contacts: []
      };

    case CLEAR_FAV_CONCTACTS:
      return {
        ...state,
        favContacts: []
      };

    default:
        return state;
  }
};

export default contactReducer;
