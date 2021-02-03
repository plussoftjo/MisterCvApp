import React from "react";
import { View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";

// Stores
import { UserActions, CvsActions } from "../../../stores";

let ConfigHandler = (props) => {
  let { selectedCv } = props.user;
  let {
    setBasicsInformations,
    setSummary,
    setEducationsList,
    setWorkExperience,
    setSkills,
    setCertifications,
  } = props;

  let HandlerBasicInformations = () => {
    setBasicsInformations(selectedCv.basic_informations);
  };

  let HandlerSummary = () => {
    setSummary(selectedCv.summary);
  };

  let HandlerEducations = () => {
    if(selectedCv.educations !== null) {
      if (selectedCv.educations.length >= 1) {
        setEducationsList(selectedCv.educations);
      }
    }
    
  };

  let HandlerWorkExperience = () => {
    if(selectedCv.work_experience !== null) {
      if (selectedCv.work_experience.length >= 1) {
        setWorkExperience(selectedCv.work_experience);
      }
    }
      
  };

  let HandlerSkills = () => {
    if(selectedCv.skills !== null) {
      if (selectedCv.skills.length >= 1) {
        setSkills(selectedCv.skills);
      }
    }
      
  };

  let HandlerCertifications = () => {
    if(selectedCv.certifications !== null) {
      if (selectedCv.certifications.length >= 1) {
        setCertifications(selectedCv.certifications);
      }
    }
      
  };

  React.useEffect(() => {
    // Handler Methods
    HandlerBasicInformations();
    HandlerSummary();
    HandlerEducations();
    HandlerWorkExperience();
    HandlerSkills();
    HandlerCertifications();
  }, []);
  return <View />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBasicsInformations: (item) =>
      dispatch(CvsActions.setBasicsInformations(item)),
    setSummary: (item) => dispatch(CvsActions.setSummary(item)),
    setEducationsList: (item) => dispatch(CvsActions.setEducationsList(item)),
    setWorkExperience: (item) => dispatch(CvsActions.setWorkExperience(item)),
    setSkills: (item) => dispatch(CvsActions.setSkills(item)),
    setCertifications: (item) => dispatch(CvsActions.setCertifications(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigHandler);
