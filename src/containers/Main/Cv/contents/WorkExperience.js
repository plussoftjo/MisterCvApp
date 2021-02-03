import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Icon, Text, Input, Button } from "@ui-kitten/components";
import { connect } from "react-redux";
import { CvsActions } from "../../../../stores";
import { Pager } from "../components";
import { apis, Helper } from "../../../../services";
import { Loader, Toast } from "../../../../components";
import {translate} from '../../../../translations'
let WorkExperience = (props) => {
  let { selectedCv, user } = props.user;
  let { pageIndex, nextPage, setWorkExperience, backPage } = props;
  let { work_experiences } = props.cvs;
  let [experience, setExperience] = React.useState({
    title: "",
    company: "",
    start: "",
    end: "",
  });
  let [err, setErr] = React.useState(null);
  let [loader, setLoader] = React.useState(false);

  let _end = () => {
    setLoader(true);
    let _workExperiences = [];
    work_experiences.forEach((trg, index) => {
      if (trg.ID == 0) {
        _workExperiences.push(trg);
      }
    });
    apis.cvs.storeWorkExperiences(
      _workExperiences,
      (res) => {
        setLoader(false);
        nextPage();
      },
      (err) => {
        setLoader(false);
        CallErr(translate("err.error"));
      }
    );
  };

  let removeRecord = (id) => {
    if (id !== 0) {
      apis.cvs.deleteWorkExperiences(
        id,
        (res) => {},
        (err) => {
          CallErr(translate("err.error"));
          
        }
      );
    }
  };

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
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.work_experiences")}</Text>
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.work_experiences.title")}
            value={experience.title}
            onChangeText={(val) => {
              setExperience({ ...experience, title: val });
            }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.work_experiences.company")}
            value={experience.company}
            onChangeText={(val) => {
              setExperience({ ...experience, company: val });
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <View style={{ flex: 1 }}>
            <Input
              label={translate("cv.work_experiences.start_date")}
              value={experience.start}
              onChangeText={(val) => {
                setExperience({ ...experience, start: val });
              }}
            />
          </View>
          <View style={{ width: 3 }}></View>
          <View style={{ flex: 1 }}>
            <Input
              label={translate("cv.work_experiences.end_date")}
              value={experience.end}
              onChangeText={(val) => {
                setExperience({ ...experience, end: val });
              }}
            />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <Button
            onPress={() => {
              if (
                Helper.check_values([
                  experience.title,
                  experience.company,
                  experience.state,
                  experience.end,
                ])
              ) {
                let _data = {
                  ...experience,
                  user_id: user.ID,
                  cvs_id: selectedCv.ID,
                  ID: 0,
                };
                setWorkExperience([...work_experiences, _data]);
                setExperience({
                  title: "",
                  company: "",
                  start: "",
                  end: "",
                });
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
                <Text>{translate("cv.work_experiences.title")}</Text>
              </View>
              {work_experiences.map((experience, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{experience.title}</Text>
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
                <Text>{translate("cv.work_experiences.company")}</Text>
              </View>
              {work_experiences.map((experience, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{experience.company}</Text>
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
                <Text>{translate("cv.work_experiences.start_date")}</Text>
              </View>
              {work_experiences.map((experience, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{experience.start}</Text>
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
                <Text>{translate("cv.work_experiences.end_date")}</Text>
              </View>
              {work_experiences.map((experience, index) => (
                <View
                  key={index}
                  style={{
                    padding: 15,
                    borderRadius: 3,
                    borderColor: "#7e7e7e",
                    borderWidth: 0.5,
                  }}
                >
                  <Text>{experience.end}</Text>
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
              {work_experiences.map((experience, index) => (
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
                      work_experiences.splice(index, 1);
                      setWorkExperience(work_experiences);
                      removeRecord(experience.ID);
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

      {err && <Toast title={err} status={'danger'} />}
      {loader && <Loader />}
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
    setWorkExperience: (item) => dispatch(CvsActions.setWorkExperience(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperience);
