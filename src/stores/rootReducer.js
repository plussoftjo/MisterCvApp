import UserReducers from './User/UserReducers'
import SettingsReducers from './Settings/SettingsReducers'
import CvsReducers from './Cvs/CvsReducers'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  user: UserReducers,
  settings:SettingsReducers,
  cvs:CvsReducers
});

export default rootReducer;