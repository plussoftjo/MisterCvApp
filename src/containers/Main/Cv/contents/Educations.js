import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Icon, Text, Input, Button } from "@ui-kitten/components";
import { connect } from "react-redux";

import { CvsActions } from "../../../../stores";
import { apis, Helper } from "../../../../services";
import { Pager } from "../components";
import { Loader, Toast } from "../../../../components";
import {Ads} from '../../../../constants'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {translate} from '../../../../translations'

let Educations = (props) => {
  // let [educations, setEducations] = React.useState([]);

  let { education, educations } = props.cvs;
  let { user, selectedCv } = props.user;
  let {
    setEducation,
    nextPage,
    pageIndex,
    setEducationsList,
    backPage,
  } = props;
  let [loader, setLoader] = React.useState(false);
  let [err, setErr] = React.useState(null);
  let _end = () => {
    setLoader(true);
    let _educationsList = [];
    educations.forEach((edu, index) => {
      if (edu.ID == 0) {
        _educationsList.push(edu);
      }
    });
    apis.cvs.storeEducations(
      _educationsList,
      (res) => {
        setLoader(false);
        nextPage();
      },
      (err) => {
        setLoader(false);
        console.log(err.response);
        CallErr(translate("err.error"))
      }
    );
  };

  let removeRecord = (id) => {
    if (id !== 0) {
      apis.cvs.deleteEducations(
        id,
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    }
  };

  let _loadAds = async() => {
    // Set global test device ID
  await setTestDeviceIDAsync('EMULATOR');
  // Display an interstitial
  await AdMobInterstitial.setAdUnitID(Platform.select({
    ios:Ads.ios.educations,
    android:Ads.android.educations
  })); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  await AdMobInterstitial.showAdAsync();
  }

  React.useEffect(() => {
    // _loadAds()
  },[])

  let CallErr = (title) => {
    setErr(title);
    setTimeout(() => {
      setErr(null);
    }, 3000);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.educations")}</Text>
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.educations.course_name")}
            value={education.title}
            onChangeText={(val) => setEducation({ ...education, title: val })}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.educations.colleague")}
            value={education.colleague}
            onChangeText={(val) =>
              setEducation({ ...education, colleague: val })
            }
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <View style={{ flex: 1 }}>
            <Input
              label={translate("cv.educations.start_date")}
              value={education.start}
              onChangeText={(val) => setEducation({ ...education, start: val })}
            />
          </View>
          <View style={{ width: 3 }}></View>
          <View style={{ flex: 1 }}>
            <Input
              label={translate("cv.educations.end_date")}
              value={education.end}
              onChangeText={(val) => setEducation({ ...education, end: val })}
            />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <Button
            onPress={() => {
              if (
                Helper.check_values([
                  education.title,
                  education.start,
                  education.colleague,
                  education.end,
                ])
              ) {
                let _data = {
                  ...education,
                  user_id: user.ID,
                  cvs_id: selectedCv.ID,
                  ID: 0,
                };
                setEducationsList([...educations, _data]);
                setEducation({ title: "", state: "", colleague: "", end: "" });
              } else {
                CallErr(translate("err.complete_fields"));
              }
            }}
          >
            {translate("global.add")}
          </Button>
        </View>
        <View
          style={{
            padding: 15,
            borderTopColor: "#7e7e7e",
            borderTopWidth: 0.5,
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 3,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
              >
                <Text>{translate("cv.educations.course_name")}</Text>
              </View>
              {educations.map((education, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{education.title}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 3,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
              >
                <Text>{translate("cv.educations.colleague")}</Text>
              </View>
              {educations.map((education, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{education.colleague}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 3,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
              >
                <Text>{translate("cv.educations.start_date")}</Text>
              </View>
              {educations.map((education, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{education.start}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 3,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
              >
                <Text>{translate("cv.educations.end_date")}</Text>
              </View>
              {educations.map((education, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{education.end}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 3,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
              >
                <Text>{translate("global.delete")}</Text>
              </View>
              {educations.map((education, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      educations.splice(index, 1);
                      setEducationsList(educations);
                      removeRecord(education.ID);
                    }}
                  >
                    <Icon
                      name="trash-2"
                      fill="red"
                      style={{ width: 18, height: 18 }}
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={{ height: 50 }}></View>
        </View>
      </ScrollView>
      <Pager
        title={pageIndex}
        backPage={backPage}
        hasBack={true}
        nextPage={_end}
      />
      {loader && <Loader />}
      {err && <Toast title={err} status={"danger"} />}
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
    setEducation: (item) => dispatch(CvsActions.setEducation(item)),
    setEducationsList: (item) => dispatch(CvsActions.setEducationsList(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Educations);
