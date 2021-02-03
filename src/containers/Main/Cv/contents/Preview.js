import React from "react";
import { View, ScrollView,TouchableOpacity } from "react-native";
import { Button, Text,Icon,useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";

import { Models,Ads } from "../../../../constants";
import { apis } from "../../../../services";
import { UserActions, CvsActions } from "../../../../stores";
import { Loader,ContentCard,Toast } from "../../../../components";

import {SelectTemplate} from '../components'
import {translate} from '../../../../translations'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
let Preview = (props) => {
  let [loader, setLoader] = React.useState(false);
  let [showTemplates,setShowTemplates] = React.useState(false)
  let [err,setErr] = React.useState(null)
  let theme = useTheme()
  let {
    basics_informations,
    summary,
    work_experiences,
    certifications,
    skills,
    educations,
  } = props.cvs;

  let { selectedCv } = props.user;
  let { setSelectedCv, navigation, setBasicsInformations,backPage } = props;


  let GenerateCv = () => {
    setLoader(true);
    // _loadAds()
    function GenerateIt() {
      apis.main.GenerateCV(
        selectedCv.ID,
        (res) => {
          setLoader(false);
          setSelectedCv(res.cv);
          setBasicsInformations(res.cv.basic_informations);
          props.setCertifications(res.cv.certifications);
          props.setEducations(res.cv.educations);
          props.setWorkExperiences(res.cv.work_experience);
          props.setSkills(res.cv.skills);
          props.setSummary(res.cv.summary);
          navigation.navigate("PreviewCv");
        },
        (err) => {
          setLoader(false);
          CallErr(translate("err.error"))
          console.log(err)
        }
      );
    }
    
    apis.cvs.updateTemplateID(selectedCv,res => {
      GenerateIt()
    },err => {
      CallErr(translate("err.error"))
      setLoader(false)
    })
  };

  let _loadAds = async() => {
    // Set global test device ID
  await setTestDeviceIDAsync('EMULATOR');
  // Display an interstitial
  await AdMobInterstitial.setAdUnitID(Platform.select({
    ios:Ads.ios.skills,
    android:Ads.android.skills
  })); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  await AdMobInterstitial.showAdAsync();
  }
  let CallErr = (title) => {
    setErr(title)
    setTimeout(() => {
      setErr(null)
    }, 3000);
  }
  let ListBox = (props) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#7e7e7e",
        padding: 15,
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
      }}
    >
      <Text category="s1" style={{ flex: 1,textAlign:'left' }}>
        {props.title}
      </Text>
      <Text category="s1" style={{ flex: 1,textAlign:'left' }}>
        {props.value}
      </Text>
    </View>
  );
  let PreviewBox = (props) => (
    <View
      style={{
        borderRadius: 3,
        borderColor: "#7e7e7e",
        borderWidth: 1,
        margin: 5,
      }}
    >
      <View
        style={{
          padding: 10,
          borderBottomColor: "#7e7e7e",
          borderBottomWidth: 1,
        }}
      >
        <Text category="h5" style={{textAlign:'left'}}>{props.title}</Text>
      </View>
      {props.children}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.preview")}</Text>
        </View>
        <PreviewBox title={translate("cv.enums.basics_informations")}>
          <ListBox title={translate("cv.basics_informations.full_name")} value={basics_informations.full_name} />
          <ListBox title={translate("cv.basics_informations.phone")} value={basics_informations.phone} />
          <ListBox title={translate("cv.basics_informations.email")} value={basics_informations.email} />
          <ListBox title={translate("cv.basics_informations.website")} value={basics_informations.website} />
          <ListBox title={translate("cv.basics_informations.address")} value={basics_informations.address} />
          <ListBox title={translate("cv.basics_informations.country")} value={basics_informations.country} />
          <ListBox title={translate("cv.basics_informations.city")} value={basics_informations.city} />
          <ListBox title={translate("cv.basics_informations.gender")} value={basics_informations.gender} />
        </PreviewBox>
        <PreviewBox title={translate("cv.enums.objective")}>
          <ListBox title={translate("cv.summary.title")} value={summary.title} />
        </PreviewBox>
        <PreviewBox title={translate("cv.enums.work_experiences")}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {work_experiences.map((trg, index) => (
              <View
                key={index}
                style={{
                  width: Models.window.width / 1.2,
                  borderLeftColor: "#7e7e7e",
                  borderLeftWidth: 0.5,
                  borderRightColor: "#7e7e7e",
                }}
              >
                <ListBox title={translate("cv.work_experiences.title")} value={trg.title} />
                <ListBox title={translate("cv.work_experiences.company")} value={trg.company} />
                <ListBox title={translate("cv.work_experiences.start_date")} value={trg.start} />
                <ListBox title={translate("cv.work_experiences.end_date")} value={trg.end} />
              </View>
            ))}
          </ScrollView>
        </PreviewBox>
        <PreviewBox title={translate("cv.enums.certifications")}>
          {certifications.map((trg, index) => (
            <ListBox key={index} title={translate("cv.enums.certifications")} value={trg.title} />
          ))}
        </PreviewBox>
        <PreviewBox title={translate("cv.enums.educations")}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {educations.map((trg, index) => (
              <View
                key={index}
                style={{
                  width: Models.window.width / 1.2,
                  borderLeftColor: "#7e7e7e",
                  borderLeftWidth: 0.5,
                  borderRightColor: "#7e7e7e",
                }}
              >
                <ListBox title={translate("cv.educations.course_name")} value={trg.title} />
                <ListBox title={translate("cv.educations.colleague")} value={trg.colleague} />
                <ListBox title={translate("cv.educations.start_date")} value={trg.start} />
                <ListBox title={translate("cv.educations.end_date")} value={trg.end} />
              </View>
            ))}
          </ScrollView>
        </PreviewBox>
        <PreviewBox title={translate("cv.enums.skills")}>
          {skills.map((trg, index) => (
            <ListBox key={index} title={translate("cv.skills.skill")} value={trg.title} />
          ))}
        </PreviewBox>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            backPage();
          }}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme["color-danger-500"],
          }}
        >
          <Icon
            name="arrow-back-outline"
            fill="white"
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 5 }}>
        <Button
          status="success"
          
          onPress={() => {
            setShowTemplates(true)
          }}
        >
          {translate("cv.preview.generate_cv")}
        </Button>
        </View>
        
      </View>
      {loader && <Loader />}
      {showTemplates &&
        <SelectTemplate GenerateCv={GenerateCv} CloseSelectTemplate={() => {
          setShowTemplates(false)
        }} />
      }
      {err && <Toast title={err} status={'danger'} />}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cvs: state.cvs,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCv: (item) => dispatch(UserActions.setSelectedCv(item)),
    setBasicsInformations: (item) =>
      dispatch(CvsActions.setBasicsInformations(item)),
    setCertifications: (item) => dispatch(CvsActions.setCertifications(item)),
    setEducations: (item) => dispatch(CvsActions.setEducationsList(item)),
    setWorkExperiences: (item) => dispatch(CvsActions.setWorkExperience(item)),
    setSkills: (item) => dispatch(CvsActions.setSkills(item)),
    setSummary: (item) => dispatch(CvsActions.setSummary(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
