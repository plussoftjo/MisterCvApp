import React from "react";
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
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
  CheckBox,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import { ContentCard, Toast, Loader } from "../../../../components";
import { Icons, Models } from "../../../../constants";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { apis, Helper } from "../../../../services";
// Stores
import { UserActions } from "../../../../stores";
import { changeLanguage, translate } from "../../../../translations";

let UserDetails = (props) => {
  // Global Variables
  let theme = useTheme();
  let { user } = props.user;
  let { locale } = props.settings;
  let { onHide, setUser } = props;
  let [categoriesIndex, setCategoriesIndex] = React.useState(new IndexPath(0));

  let [err, setErr] = React.useState(null);
  let [loader, setLoader] = React.useState(false);

  let [inx, setInx] = React.useState(0);
  let { lang } = locale;
  // Animation And Close
  let translationAnimated = React.useRef(
    new Animated.Value(Models.window.height)
  ).current;
  let HandlerPanDown = (event) => {
    let angelY = event.nativeEvent.translationY;
    if (angelY >= 100) {
      _handleAnimation("hide");
      setTimeout(() => {
        onHide();
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
    let lang = locale.lang;

    if (lang == "en") {
      setInx(0);
    } else if (lang == "ar") {
      setInx(1);
    }
  }, []);

  // Save
  let _save = () => {
    setLoader(true);
    apis.auth.update(
      user,
      (res) => {
        _handleAnimation("hide");
        setTimeout(() => {
          onHide();
        }, 600);
        setLoader(false);
      },
      (err) => {
        console.log(err);
        setLoader(false);
      }
    );
  };

  let CallErr = (title) => {
    setErr(title);
    setTimeout(() => {
      setErr(null);
    }, 3000);
  };
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
                  name={"edit-2-outline"}
                  style={{
                    width: Models.iconSimple.width,
                    height: Models.iconSimple.height,
                  }}
                  fill={theme["text-hint-color"]}
                />
                <View style={{ width: 5 }}></View>
                <Text category={"h3"}>{translate("settings.select_language")}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // change Language
                  // Check if not the same language
                  if (inx !== 0) {
                    changeLanguage("en", false);
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderBottomColor: "#7e7e7e",
                  borderBottomWidth: 0.5,
                }}
              >
                <CheckBox status="success" checked={inx == 0 ? true : false} />
                <View style={{ width: 15 }}></View>
                <Text category="h5">English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // change Language
                  // Check if not the same language
                  if (inx !== 1) {
                    changeLanguage("ar", true);
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderBottomColor: "#7e7e7e",
                  borderBottomWidth: 0.5,
                }}
              >
                <CheckBox status="success" checked={inx == 1 ? true : false} />
                <View style={{ width: 15 }}></View>
                <Text category="h5">العربية</Text>
              </TouchableOpacity>
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
    setUser: (item) => dispatch(UserActions.setUser(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
