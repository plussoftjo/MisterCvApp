import React from "react";
import { View, ScrollView } from "react-native";
import { Layout, Text,Modal,Card,Button } from "@ui-kitten/components";
import { connect } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Local Components
import * as Components from "./components";
import * as Contents from "./contents";

// Constants
import { Faker } from "../../../constants";

// Global components
import { ContentCard, Cards } from "../../../components";

import { translate } from "../../../translations";
import { UserActions } from "../../../stores";

let Home = (props) => {
  // Global Variables
  let { myCvs, user } = props.user;
  let { navigation, setSelectedCv } = props;
  let {exampleCv} = props.settings

  // Local Variables
  let [addNew, setAddNew] = React.useState(false); // Add New Screen
  const [visible, setVisible] = React.useState(false);

  // onPressCv
  let onPressCv = (cv) => {
    setSelectedCv(cv);
    if (cv.active == 1) {
      navigation.navigate("PreviewCv");
      return;
    }
    navigation.navigate("Cv");
  };


  let _CheckFirstTime = async() => {
    let _isFirstTimeForUser = await AsyncStorage.getItem("isFirstTimeForUser")
    if(!_isFirstTimeForUser) {
      setTimeout(() => {
        setVisible(true)
      },1000)
      await AsyncStorage.setItem("isFirstTimeForUser",JSON.stringify(user))
    }else {
      let _isFirstTime = JSON.parse(_isFirstTimeForUser);
      if(_isFirstTime.ID !== user.ID) {
        setTimeout(() => {
          setVisible(true)
        },1000)
        await AsyncStorage.setItem("isFirstTimeForUser",JSON.stringify(user))
      }
    }
  }

  React.useEffect(() => {
    _CheckFirstTime()
  },[])
  return (
    <Layout style={{ flex: 1 }}>
      <Components.HeaderContent
        handlePressPlusIcon={() => {
          setAddNew(!addNew);
        }}
      />

      {myCvs.length == 0 && <Contents.Empty />}
      {myCvs.length >= 1 && (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              {myCvs.map((cv, index) => (
                <Cards.CvCard
                  onPressCv={onPressCv}
                  key={index}
                  cv={cv}
                  settings={props.settings}
                />
              ))}
            </View>
            {/* <Contents.Cvs navigation={navigation} /> */}
          </ScrollView>
        </View>
      )}
      {addNew && <Contents.AddNew onHide={() => setAddNew(false)} />}

      <Modal
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text category="h5" style={{textAlign:'center'}}>Welcome to Mister CV 😻</Text>
          <Text category="s1" style={{textAlign:'center'}}>Create Your Cv For Free. 😎</Text>
          <Button style={{marginTop:10}} status="success" size="small" onPress={
            () => {
              setSelectedCv(exampleCv)
              setVisible(false)
              navigation.navigate("ShowCv")
          }}>
            Open Example Cv
          </Button>
          <Button status="basic" style={{marginTop:5}} size="small" onPress={
            () => setVisible(false)}>
            Close
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCv: (item) => dispatch(UserActions.setSelectedCv(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
