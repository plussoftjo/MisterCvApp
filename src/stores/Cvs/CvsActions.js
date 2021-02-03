import CvsType from './CvsType'


export const setBasicsInformations = (item) => {
    return {
        type:CvsType.SET_BASICS_INFORMATIONS,
        payload:item
      }
}

export const setEducation = (item) => {
  return {
      type:CvsType.SET_EDUCATIONS,
      payload:item
    }
}

export const setEducationsList = (item) => {
  return {
      type:CvsType.SET_EDUCATIONS_LIST,
      payload:item
    }
}

export const setSkills = (item) => {
  return {
      type:CvsType.SET_SKILLS,
      payload:item
    }
}

export const setSummary = (item) => {
  return {
      type:CvsType.SET_SUMMARY,
      payload:item
    }
}

export const setCertifications = (item) => {
  return {
      type:CvsType.SET_CERTIFICATIONS,
      payload:item
    }
}


export const setWorkExperience = (item) => {
  return {
      type:CvsType.SET_WORK_EXPERIENCE,
      payload:item
    }
}