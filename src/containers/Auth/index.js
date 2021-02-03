import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import {
  Layout,
  Text,
  Input,
  Button,
  useTheme,
  Spinner,
  Icon,
} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

// Stores
import { connect } from "react-redux";
import { UserActions,SettingsActions } from "../../stores";

// Services
import { apis } from "../../services";
import { translate } from "../../translations";

// Components
import { Header } from "./components";
import { Toast } from "../../components";

// Constants
import { StorageToken, env } from "../../constants";

// Models
import Models from "./models";

let Auth = (props) => {
  /**
   * @theme {Component theme} Theme
   * @model {The currect model} Models
   * @left {Left animation value} AnimatedValue
   * @fade {Fade animation value} AnimatedValue
   * @_timeInteger {Animated Duration} integer
   * @data {name:user name,phone:user phone,password:secret password} object
   * */
  let theme = useTheme();
  let [model, setModel] = useState(Models.login);
  let left = useRef(new Animated.Value(-1000)).current;
  let fade = useRef(new Animated.Value(0)).current;
  let _timeInteger = 500;
  let [data, setData] = useState({
    name: "",
    phone: "",
    password: "",
    role_id: 1,
    referral_code: "",
  });
  let { navigation, setUser,setCategories,setTemplates,setMyCvs } = props;
  let [image, setImage] = useState(null);
  let [isload, setIsLoad] = useState(false);
  let [error, setError] = useState(null);
  /**
   *
   *
   * @AnimationHandler {Hand the animate}
   * @useEffect {Fire Up Methods}
   * @changeModel {Fire Up Methods}
   */
  let AnimationHandler = (type) => {
    // @type => Type of animation is doing the animation or back from it
    switch (type) {
      case "do":
        // Animate Lef
        Animated.timing(left, {
          toValue: 0,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        // Animate fade
        Animated.timing(fade, {
          toValue: 1,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        break;
      case "back":
        //Animated left
        Animated.timing(left, {
          toValue: -1000,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        // Animated fade
        Animated.timing(fade, {
          toValue: 0,
          duration: _timeInteger,
          useNativeDriver: true,
        }).start();
        break;
      default:
        break;
    }
  };

  let InstallAssets = (token) => {
    apis.main.index(
      token,
      (res) => {
        setCategories(res.categories);
        setMyCvs(res.cvs);
        setTemplates(res.templates);
        navigation.navigate("MainNavigation");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  let _login = () => {
    setIsLoad(true);
    apis.auth.login(
      data,
      async (res) => {
        setIsLoad(false);
        await AsyncStorage.setItem(StorageToken.userToken, res.token);
        let _token = "Bearer " + res.token;
        setUser(res.user);
        InstallAssets(_token);
      },
      (err) => {
        console.log(err.response);
        setError(translate("err.login_error"));
        setTimeout(() => {
          setError(null);
        }, 3000);
        setIsLoad(false);
      }
    );
  };

  let _register = () => {
    setIsLoad(true);

    apis.auth.register(
      data,
      async (res) => {
        await AsyncStorage.setItem(StorageToken.userToken, res.token);
        let _token = "Bearer " + res.token;
        setUser(res.user);
        setIsLoad(false);
        InstallAssets(_token);
      },
      (err) => {
        setIsLoad(false);
        console.log(err.response)
        setError(translate("err.complete_fields"));
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    );
  };

  const LoadingIndicator = (props) => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;
  let pickup_image = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    AnimationHandler("do");
  }, []);

  let changeModel = () => {
    switch (model.header) {
      case "Login":
        AnimationHandler("back");
        setTimeout(() => {
          setModel(Models.register);
          AnimationHandler("do");
        }, _timeInteger + 100);
        break;
      case "Register":
        AnimationHandler("back");
        setTimeout(() => {
          setModel(Models.login);
          AnimationHandler("do");
        }, _timeInteger + 100);
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      {/* Headers Space With Positions */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: Models.header.svgHeight,
          width: Models.header.width,
        }}
      >
        <Header />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        {/* Content */}
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                paddingTop: "5%",
                paddingHorizontal: 10,
                transform: [{ translateX: left }],
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 48,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {model.header == "Login" ? translate("auth.login"):translate("auth.register")}
              </Text>
            </Animated.View>
            {model.header == "Register" && (
              <Animated.View
                style={{
                  paddingTop: 10,
                  transform: [{ translateX: left }],
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Image
                    source={require("../../assets/user/avatar.png")}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
            <Animated.View
              style={{
                paddingTop: "2%",
                paddingHorizontal: "10%",
                opacity: fade,
                flex: 1,
              }}
            >
              {model.header == "Register" && (
                <Input
                  placeholder={translate("auth.name")}
                  value={data.name}
                  onChangeText={(val) => setData({ ...data, name: val })}
                  style={{ borderRadius: 20, marginTop: 5 }}
                />
              )}
              <Input
                placeholder={translate("auth.phone")}
                value={data.phone}
                keyboardType={"number-pad"}
                onChangeText={(val) => setData({ ...data, phone: val })}
                style={{ borderRadius: 20, marginTop: 5 }}
              />
              <Input
                placeholder={translate("auth.password")}
                value={data.password}
                onChangeText={(val) => setData({ ...data, password: val })}
                secureTextEntry={true}
                style={{ borderRadius: 20, marginTop: 5 }}
              />
            </Animated.View>
          </View>
        </View>
      </ScrollView>
      <Animated.View
        style={{
          paddingTop: "25%",
          flex: 1,
          justifyContent: "center",
          position: "absolute",
          left: 0,
          bottom: 30,
          width: "100%",
          alignItems: "center",
          transform: [{ translateX: left }],
        }}
      >
        <Button
          style={{ width: "80%", borderRadius: 20 }}
          onPress={() => {
            if (model.header == "Login") {
              _login();
            } else {
              _register();
            }
            // props.navigation.navigate("MainNavigation")
          }}
          accessoryLeft={isload ? LoadingIndicator : null}
        >
          {isload ? "Loading" : model.header == "Login" ?translate("auth.login"):translate("auth.register")}
        </Button>
        {model.header == "Login" ? 
        <View
          style={{
            paddingTop: "10%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "500" }}>{translate("auth.do_not_have_account")}</Text>
          <TouchableOpacity
            onPress={() => {
              changeModel();
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: theme["color-success-900"] }}
            >
              {" "}
              {translate("auth.new_account")}
            </Text>
          </TouchableOpacity>
        </View>:
        <View
          style={{
            paddingTop: "10%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "500" }}>{translate("auth.have_account")}</Text>
          <TouchableOpacity
            onPress={() => {
              changeModel();
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: theme["color-success-900"] }}
            >
              {" "}
              {translate("auth.login")}
            </Text>
          </TouchableOpacity>
        </View>
        }
        
      </Animated.View>
      {error && <Toast status="danger" title={error} />}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
    setMyCvs: (item) => dispatch(UserActions.setMyCvs(item)),
    setCategories: (item) => dispatch(SettingsActions.setCategories(item)),
    setTemplates:item => dispatch(SettingsActions.setTemplates(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
