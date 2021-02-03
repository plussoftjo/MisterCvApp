import CvsType from "./CvsType";

const intintalState = {
  basics_informations: {
    ID:0,
    full_name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    country: "",
    city: "",
    photo: "",
    gender: "",
  },
  education: { // Not need to modify
    title: "",
    colleague: "",
    start: "",
    end: "",
  },
  educations: [],
  skills:[],
  summary:{
    ID:0,
    title:''
  },
  certifications:[],
  work_experiences:[]
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case CvsType.SET_BASICS_INFORMATIONS:
      return { ...state, basics_informations: action.payload };
    case CvsType.SET_EDUCATIONS:
      return { ...state, education: action.payload };
    case CvsType.SET_EDUCATIONS_LIST:
      return { ...state, educations: action.payload };
      case CvsType.SET_SKILLS:
      return { ...state, skills: action.payload };
      case CvsType.SET_SUMMARY:
      return { ...state, summary: action.payload };
      case CvsType.SET_CERTIFICATIONS:
      return { ...state, certifications: action.payload };
      case CvsType.SET_WORK_EXPERIENCE:
      return { ...state, work_experiences: action.payload };
    default:
      return state;
  }
};

export default reducer;
