import UserType from './UserType'

export const setUser = (item) => {
  return {
    type:UserType.SET_USER,
    payload:item
  }
}

export const setMyCvs = (item) => {
  return {
    type:UserType.SET_MY_CVS,
    payload:item
  }
}

export const addNewCv = (item) => {
  return {
    type:UserType.ADD_NEW_CV,
    payload:item
  }
}

export const setSelectedCv = (item) => {
  return {
    type:UserType.SET_SELECTED_CV,
    payload:item
  }
}

export const setExploreCvs = (item) => {
  return {
    type:UserType.SET_EXPLORE_CVS,
    payload:item
  }
}