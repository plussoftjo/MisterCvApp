import SettingsType from './SettingsType'

const intintalState = {
  locale:{
    lang:'',
    rtl:false
  },
  categories:[],
  templates:[]
};


const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case SettingsType.SET_LOCALE:
      return {...state,locale:action.payload}
      case SettingsType.SET_CATEGORIES:
        return {...state,categories:action.payload}
        case SettingsType.SET_TEMPLATES:
        return {...state,templates:action.payload}
    default:
      return state;
  }
};

export default reducer;