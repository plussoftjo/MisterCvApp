/**
 *
 *  This is skills not Interesting
 */

import React from "react";
import { View, ScrollView,Pressable } from "react-native";
import { Icon, Text, Input, Button } from "@ui-kitten/components";
import { connect } from "react-redux";

import { CvsActions } from "../../../../stores";
import {apis,Helper} from '../../../../services'
import {Loader,Toast} from '../../../../components'
import {Ads} from '../../../../constants'
import {translate} from '../../../../translations'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {Pager} from '../components'
let Interesting = (props) => {
  let [_skill, setSkill] = React.useState({ title: "" });
  let { selectedCv, user } = props.user;
  let { pageIndex, nextPage, setSkills,backPage } = props;
  let { skills } = props.cvs;
  let [err,setErr] = React.useState(null)
  let [loader,setLoader] = React.useState(false)




  let _end = () => {
    setLoader(true)
    let _skills = []
    skills.forEach((skill,index) => {
      if(skill.ID == 0) {
        _skills.push(skill)
      }
    })
    apis.cvs.storeSkills(_skills,res => {
      setLoader(false)
      nextPage()
    },err => {
      CallErr(translate("err.error"))
      setLoader(false)
    })
  }

  let CallErr = (title) => {
    setErr(title)
    setTimeout(() => {
      setErr(null)
    }, 3000);
  }

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

  React.useEffect(() => {
    // _loadAds()
  },[])
  let removeRecord = (id) => {
    if(id !== 0) {
      apis.cvs.deleteSkills(id,(res) => {

      },err => {
        console.log(err)
      })
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.skills")}</Text>
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.skills.title")}
            value={_skill.title}
            onChangeText={(val) => {
              setSkill({ ..._skill, title: val });
            }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Button
            onPress={() => {
              if (_skill.title !== "") {
                let _data = {
                  ..._skill,
                  user_id: user.ID,
                  cvs_id: selectedCv.ID,
                  ID:0
                };
                setSkills([...skills, _data]);
                setSkill({ title: "" });
              }else {
                CallErr(translate("err.complete_fields"))
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
          <View
            style={{
              padding: 15,
              borderRadius: 3,
              borderColor: "#7e7e7e",
              borderWidth: 0.5,
            }}
          >
            <Text style={{textAlign:'left'}}>{translate("cv.skills.skill")}</Text>
          </View>
          {skills.map((skill, index) => (
            <View
              key={index}
              style={{
                padding: 15,
                borderRadius: 3,
                borderColor: "#7e7e7e",
                borderWidth: 0.5,
                flexDirection:'row',
                justifyContent:'space-between'
              }}
            >
              <Text>{skill.title}</Text>
              <Pressable onPress={() => {
                  skills.splice(index,1)
                  setSkills(skills)
                  removeRecord(skill.ID)
                }}>
                  <Icon name="trash-2" fill="red" style={{width:18,height:18}} />
                </Pressable>
            </View>
          ))}
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <Pager title={pageIndex} backPage={backPage} hasBack={true} nextPage={_end} />
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
    setSkills: (item) => dispatch(CvsActions.setSkills(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Interesting);
