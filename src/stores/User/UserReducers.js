import UserType from "./UserType";

const intintalState = {
  user: {},
  auth: false,
  myCvs: [],
  selectedCv: {},
  exploreCvs:[]
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case UserType.SET_USER:
      return { ...state, user: action.payload, auth: true };
    case UserType.SET_MY_CVS:
      return { ...state, myCvs: action.payload };
    case UserType.ADD_NEW_CV:
      return { ...state, myCvs: [...state.myCvs, action.payload] };
    case UserType.SET_SELECTED_CV:
      return { ...state, selectedCv: action.payload };
    case UserType.SET_EXPLORE_CVS:
      return {...state,exploreCvs:action.payload}
    default:
      return state;
  }
};

export default reducer;
