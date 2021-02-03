import React, { useState } from "react";
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  Input,
  Text,
  Icon,
  useTheme,
  Toggle,
  Button,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import {translate} from '../../../translations'
let _countryJSON = require("../../../assets/jsons/countries.json");
let _genderJSON = ["Any", "Male", "Female"];
import { ContentCard, Toast, Loader } from "../../../components";
import { Icons, Models } from "../../../constants";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { apis, Helper } from "../../../services";
import {UserActions} from '../../../stores'

let AddNew = (props) => {
  // Global Variables
  let theme = useTheme();
  let { categories } = props.settings;
  let [categoriesIndex, setCategoriesIndex] = React.useState(new IndexPath(0));
  let [selectedCountry, setSelectedCountry] = useState(new IndexPath(0));
  let [selectedGender, setSelectedGender] = useState(new IndexPath(0));
  let [data, setData] = React.useState({
    category: "",
    anyCountry: true,
    country: "",
  });
  let [err, setErr] = React.useState(null);
  let [loader, setLoader] = React.useState(false);

  // Animation And Close
  let translationAnimated = React.useRef(
    new Animated.Value(Models.window.height)
  ).current;
  let HandlerPanDown = (event) => {
    let angelY = event.nativeEvent.translationY;
    if (angelY >= 100) {
      _handleAnimation("hide");
      setTimeout(() => {
        props.onHide();
      }, 600);
    }
  };
  let _handleAnimation = (type) => {
    if (type == "show") {
      Animated.timing(translationAnimated, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translationAnimated, {
        toValue: Models.window.height,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };
  React.useEffect(() => {
    _handleAnimation("show");
  }, []);

 

  let CallErr = (title) => {
    setErr(title);
    setTimeout(() => {
      setErr(null);
    }, 3000);
  };

  // save
  let _save = () => {
    let _data = {
      country:_countryJSON[selectedCountry.row].name,
      gender:_genderJSON[selectedGender.row],
      category:categories[categoriesIndex.row].ID,
      any_country:data.anyCountry
    }
    
    apis.cvs.searchInCv(_data,(res) => {
      props.setExploreCvs(res.cvs)
      _handleAnimation("hide");
      setTimeout(() => {
        props.onHide();
      }, 600);
    },err => {
      console.log(err)
    })

  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
    >
      <PanGestureHandler onGestureEvent={HandlerPanDown}>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            transform: [{ translateY: translationAnimated }],
          }}
        >
          <ContentCard>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#7e7e7e",
                  borderBottomWidth: 0.5,
                  paddingBottom: 5,
                }}
              >
                <Icon
                  name={"funnel-outline"}
                  style={{
                    width: Models.iconSimple.width,
                    height: Models.iconSimple.height,
                  }}
                  fill={theme["text-hint-color"]}
                />
                <View style={{ width: 5 }}></View>
                <Text category={"h3"}>{translate("explore.filter.search_cvs")}</Text>
              </View>
              {/* Here The Content Of Search Gone */}
              <View style={{ paddingVertical: 5 }}>
                <Select
                  label={translate("main.add_new.categories")}
                  value={categories[categoriesIndex.row].title}
                  selectedIndex={categoriesIndex}
                  onSelect={(index) => setCategoriesIndex(index)}
                >
                  {categories.map((category, index) => (
                    <SelectItem key={index} title={category.title} />
                  ))}
                </Select>
              </View>
              <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                <Toggle
                  checked={data.anyCountry}
                  onChange={() => {
                    setData({ ...data, anyCountry: !data.anyCountry });
                  }}
                >
                  {data.anyCountry ? translate("explore.filter.any_country") : translate("explore.filter.select_country")}
                </Toggle>
              </View>
              {!data.anyCountry &&
                <View style={{ paddingVertical: 5 }}>
                <Select
                  label={translate("explore.filter.country")}
                  value={_countryJSON[selectedCountry.row].name}
                  selectedIndex={selectedCountry}
                  onSelect={(index) => {
                    setSelectedCountry(index);
                  }}
                >
                  {_countryJSON.map((country, index) => (
                    <SelectItem key={index} title={country.name} />
                  ))}
                </Select>
              </View>
              }
              
              <View style={{ paddingVertical: 5 }}>
                <Select
                  label={translate("explore.filter.gender")}
                  value={_genderJSON[selectedGender.row]}
                  selectedIndex={selectedGender}
                  onSelect={(index) => {
                    setSelectedGender(index);
                  }}
                >
                  {_genderJSON.map((gender, index) => (
                    <SelectItem key={index} title={gender} />
                  ))}
                </Select>
              </View>
              {/* Here End Of Content Of Search */}
              <View style={{ paddingVertical: 5 }}>
                <Button status="success" onPress={_save}>
                {translate("global.search")}
                </Button>
              </View>
            </ScrollView>
          </ContentCard>
        </Animated.View>
      </PanGestureHandler>
      {err && <Toast title={err} status={"danger"} />}
      {loader && <Loader />}
    </KeyboardAvoidingView>
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
    setExploreCvs:item => dispatch(UserActions.setExploreCvs(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
