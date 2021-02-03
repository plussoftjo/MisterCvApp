import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

// Constants
import { StorageToken, Faker } from "../../constants";

// Services
import { apis, LocaleLoader,FontsLoader } from "../../services";

// Stores
import { connect } from "react-redux";
import { UserActions, SettingsActions } from "../../stores";

let Loading = (props) => {
  let {
    navigation,
    setUser, // Set User
    setLocale, // Set Locale Language
    setMyCvs, // Set User Cvs
    setCategories, // SetCategories to settings storage
    setTemplates
  } = props;
  const isFocused = useIsFocused();
  /**
   *
   * @checker {Checker is about check the things inside our app}
   */

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

  let checker = async () => {
    await LocaleLoader();
    await FontsLoader();

    let _locale = await AsyncStorage.getItem(StorageToken.localeToken);
    if (!_locale) {
      setLocale({
        lang: "ar",
        rtl: true,
      });
    } else {
      if (_locale == "en") {
        setLocale({
          lang: "en",
          rtl: false,
        });
      } else if (_locale == "ar") {
        setLocale({
          lang: "ar",
          rtl: true,
        });
      }
    }

    // Check if user login or not
    let _userToken = await AsyncStorage.getItem(StorageToken.userToken);
    if (!_userToken) {
      // If Not Auth Navigation to auth
      navigation.navigate("Auth");
      return;
    }

    // If Auth @setUser in the stores
    let _token = "Bearer " + _userToken;
    apis.auth.auth(
      _token,
      (res) => {
        setUser(res.user);
        InstallAssets(_token);
      },
      (err) => {
        console.log(err.response);
        navigation.navigate("Auth");
      }
    );
  };

  // UseEffect
  useEffect(() => {
    // Checker Call

    checker();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/backgrounds/loading.png")}
    >
      <Image
        source={require("../../assets/logo/raccoon.png")}
        style={styles.imageCard}
        resizeMode="contain"
      />
      <View style={styles.pt30}>
        <Spinner status="basic" />
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
    setLocale: (item) => dispatch(SettingsActions.setLocale(item)),
    setMyCvs: (item) => dispatch(UserActions.setMyCvs(item)),
    setCategories: (item) => dispatch(SettingsActions.setCategories(item)),
    setTemplates:item => dispatch(SettingsActions.setTemplates(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
