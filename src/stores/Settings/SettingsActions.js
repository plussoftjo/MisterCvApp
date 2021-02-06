import SettingsType from './SettingsType';



export const setLocale = (item) => {
  return {
    type:SettingsType.SET_LOCALE,
    payload:item
  }
}

export const setCategories = (item) => {
  return {
    type:SettingsType.SET_CATEGORIES,
    payload:item
  }
}

export const setTemplates = (item) => {
  return {
    type:SettingsType.SET_TEMPLATES,
    payload:item
  }
}

export const setExampleCv = (item) => {
  return {
    type:SettingsType.SET_EXAMPLE_CV,
    payload:item
  }
}