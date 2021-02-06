import SettingsType from './SettingsType'

const intintalState = {
  locale:{
    lang:'',
    rtl:false
  },
  categories:[],
  templates:[],
  exampleCv:{}
};


const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case SettingsType.SET_LOCALE:
      return {...state,locale:action.payload}
      case SettingsType.SET_CATEGORIES:
        return {...state,categories:action.payload}
        case SettingsType.SET_TEMPLATES:
        return {...state,templates:action.payload}
        case SettingsType.SET_EXAMPLE_CV:
          return {...state,exampleCv:action.payload}
    default:
      return state;
  }
};

export default reducer;