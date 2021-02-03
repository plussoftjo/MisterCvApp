import React from "react";
import { View } from "react-native";
import { Layout, Text,Button } from "@ui-kitten/components";
import { connect } from "react-redux";

// Locale Components
import { HeaderContent, Pager } from "./components";
import ConfigHandler from './ConfigHandler'
import {translate} from '../../../translations'
import {
  CvInformation,
  BasicInformation,
  Objective,
  WorkExperience,
  Educations,
  Skills,
  Preview,
  Certifications
} from "./contents";



let Cv = (props) => {
  let _PAGE_ENUM = {
    CV_INFORMATION: translate("cv.enums.cv_informations"),
    BASIC_INFORMATION: translate("cv.enums.basics_informations"),
    OBJECTIVE: translate("cv.enums.objective"),
    WORK_EXPERIENCE: translate("cv.enums.work_experiences"),
    EDUCATIONS: translate("cv.enums.educations"),
    SKILLS: translate("cv.enums.skills"),
    PREVIEW: translate("cv.enums.preview"),
    CERTIFICATIONS:translate("cv.enums.certifications")
  };
  // Global Variables
  let { navigation } = props;
  let { selectedCv } = props.user;

  // Page Indexes
  let [pageIndex, setPageIndex] = React.useState(_PAGE_ENUM.CV_INFORMATION);



  let nextPage = () => {
    switch (pageIndex) {
      case _PAGE_ENUM.CV_INFORMATION:
        setPageIndex(_PAGE_ENUM.BASIC_INFORMATION);
        break;
      case _PAGE_ENUM.BASIC_INFORMATION:
        setPageIndex(_PAGE_ENUM.OBJECTIVE);
        break;
      case _PAGE_ENUM.OBJECTIVE:
        setPageIndex(_PAGE_ENUM.EDUCATIONS);
        break;
      case _PAGE_ENUM.EDUCATIONS:
        setPageIndex(_PAGE_ENUM.WORK_EXPERIENCE);
        break;
        case _PAGE_ENUM.WORK_EXPERIENCE:
        setPageIndex(_PAGE_ENUM.SKILLS);
        break;
      case _PAGE_ENUM.SKILLS:
        setPageIndex(_PAGE_ENUM.CERTIFICATIONS);
        break;
      case _PAGE_ENUM.CERTIFICATIONS:
        setPageIndex(_PAGE_ENUM.PREVIEW);
        break;
      default:
        break;
    }
  };


  let backPage = () => {
    switch (pageIndex) {
      case _PAGE_ENUM.BASIC_INFORMATION:
        setPageIndex(_PAGE_ENUM.CV_INFORMATION);
        break;
      case _PAGE_ENUM.OBJECTIVE:
        setPageIndex(_PAGE_ENUM.BASIC_INFORMATION);
        break;
      case _PAGE_ENUM.EDUCATIONS:
        setPageIndex(_PAGE_ENUM.OBJECTIVE);
        break;
        case _PAGE_ENUM.WORK_EXPERIENCE:
        setPageIndex(_PAGE_ENUM.EDUCATIONS);
        break;
      case _PAGE_ENUM.SKILLS:
        setPageIndex(_PAGE_ENUM.WORK_EXPERIENCE);
        break;
      case _PAGE_ENUM.CERTIFICATIONS:
        setPageIndex(_PAGE_ENUM.SKILLS);
        break;
        case _PAGE_ENUM.PREVIEW:
        setPageIndex(_PAGE_ENUM.CERTIFICATIONS);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    console.log(selectedCv)
  },[])
  return (
    <Layout style={{ flex: 1 }}>
      <HeaderContent navigation={navigation} />
      {pageIndex == _PAGE_ENUM.CV_INFORMATION && <CvInformation nextPage={nextPage} backPage={backPage} pageIndex={pageIndex} />}
      {pageIndex == _PAGE_ENUM.BASIC_INFORMATION && <BasicInformation nextPage={nextPage} backPage={backPage} pageIndex={pageIndex}  />}
      {pageIndex == _PAGE_ENUM.OBJECTIVE && <Objective nextPage={nextPage} pageIndex={pageIndex} backPage={backPage} />}
      {pageIndex == _PAGE_ENUM.WORK_EXPERIENCE && <WorkExperience nextPage={nextPage} backPage={backPage} pageIndex={pageIndex} />}
      {pageIndex == _PAGE_ENUM.EDUCATIONS && <Educations nextPage={nextPage} pageIndex={pageIndex} backPage={backPage} />}
      {pageIndex == _PAGE_ENUM.SKILLS && <Skills nextPage={nextPage} pageIndex={pageIndex} backPage={backPage} />}
      {pageIndex == _PAGE_ENUM.CERTIFICATIONS && <Certifications nextPage={nextPage} pageIndex={pageIndex} backPage={backPage} />}
      {pageIndex == _PAGE_ENUM.PREVIEW && <Preview navigation={navigation} backPage={backPage}  />}
      {/* ConfigHandler */}
      <ConfigHandler />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cv);
