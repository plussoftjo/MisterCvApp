import React, { useState } from "react";
import { View, ScrollView, Image, TouchableOpacity,Platform } from "react-native";
import {
  Layout,
  Text,
  Input,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import {translate} from '../../../../translations'

import { CvsActions } from "../../../../stores";
import { env,Ads } from "../../../../constants";

import { apis,Helper } from "../../../../services";
import { Loader,Toast } from "../../../../components";

import { Pager } from "../components";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
let _countryJSON = require("../../../../assets/jsons/countries.json");
let _genderJSON = ["Male", "Female"];
let BasicInformation = (props) => {
  let { user, selectedCv } = props.user;
  let { basics_informations } = props.cvs;
  let { setBasicsInformations, nextPage, pageIndex,backPage } = props;
  let [selectedCountry, setSelectedCountry] = useState(new IndexPath(0));
  let [selectedGender, setSelectedGender] = useState(new IndexPath(0));
  let [loader, setLoader] = useState(false);
  let [err,setErr] = useState(null)

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
      setLoader(true)
      let _image = result.uri;
      // HERE FOR UPLOAD IMAGE AND RETURN THE URI
      let uriArray = _image.split(".");
      let fileType = uriArray[uriArray.length - 1];
      let formData = new FormData();
      let fileName = Math.round(Math.random() * 10000000000000);
      formData.append("image", {
        uri: _image,
        name: `${fileName}.${fileType}`,
        type: `image/${fileType}`,
      });
      let options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      fetch(env.server + "cvs/basics_information/image/store", options)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          if (json.message == "success") {
            setBasicsInformations({
              ...basics_informations,
              photo: json.image,
            });
          }
          setLoader(false)
        })
        .catch((error) => {
          console.log(error)

          CallErr(translate("err.error"))
          setLoader(false)
        });
    }
  };


  let _loadAds = async() => {
    // Set global test device ID
  await setTestDeviceIDAsync('EMULATOR');
  // Display an interstitial
  await AdMobInterstitial.setAdUnitID(Platform.select({
    ios:Ads.ios.basics_informations,
    android:Ads.android.basics_informations
  })); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  await AdMobInterstitial.showAdAsync();
  }

  React.useEffect(() => {
    let __country = "";
    let __gender = "";
    _countryJSON.forEach((country, index) => {
      if (country.name == basics_informations.country) {
        __country = country.name;
        setSelectedCountry(new IndexPath(index));
      }
    });
    if(__country == "") {
      __country = _countryJSON[0].name
    }

    _genderJSON.forEach((gender, index) => {
      if (gender == basics_informations.gender) {
        __gender = gender;
        setSelectedGender(new IndexPath(index));
      }
    });

    if(__gender == "") {
      __gender = _genderJSON[0]
    }
    setBasicsInformations({
      ...basics_informations,
      country: __country,
      gender: __gender,
    });
  }, []);

  let _end = () => {
    setLoader(true);
    if(Helper.check_values([
      basics_informations.full_name,
      basics_informations.phone,

    ])) {
      if (basics_informations.ID == 0) {
        let _data = {
          ...basics_informations,
          user_id: user.ID,
          cvs_id: selectedCv.ID,
          country:_countryJSON[selectedCountry.row].name,
          gender:_genderJSON[selectedGender.row]
        };
  
        apis.cvs.storeBasicInformations(
          _data,
          (res) => {
            setBasicsInformations(res.BasicsInformations);
            setLoader(false);
            nextPage();
          },
          (err) => {
            CallErr(translate("err.error"))
            setLoader(false);
          }
        );
      } else {
        apis.cvs.updateBasicInformations(
          basics_informations,
          (res) => {
            setBasicsInformations(res.BasicsInformations);
            setLoader(false);
            nextPage();
          },
          (err) => {
            setLoader(false);
            CallErr(translate("err.error"))
          }
        );
      }
    }else {
      CallErr(translate("err.complete_fields"))
      setLoader(false)
    }
    
  };


  let CallErr = (title) => {
    setErr(title)
    setTimeout(() => {
      setErr(null)
    }, 3000);
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.basics_informations")}</Text>
        </View>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {basics_informations.photo == "" ? (
            <TouchableOpacity onPress={pickup_image}>
              <Image
                source={require("../../../../assets/user/avatar.png")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickup_image}>
              <Image
                source={{
                  uri:
                    env.server +
                    "public/Images/BasicsInformations/" +
                    basics_informations.photo,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderColor: "#7e7e7e",
                  borderWidth: 0.5,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Input
            label={translate("cv.basics_informations.full_name")}
            value={basics_informations.full_name}
            onChangeText={(val) =>
              setBasicsInformations({ ...basics_informations, full_name: val })
            }
          />
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Input
            label={translate("cv.basics_informations.email")}
            value={basics_informations.email}
            onChangeText={(val) =>
              setBasicsInformations({ ...basics_informations, email: val })
            }
          />
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Input
            label={translate("cv.basics_informations.phone")}
            value={basics_informations.phone}
            onChangeText={(val) =>
              setBasicsInformations({ ...basics_informations, phone: val })
            }
          />
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Input
            label={translate("cv.basics_informations.website")}
            value={basics_informations.website}
            onChangeText={(val) =>
              setBasicsInformations({ ...basics_informations, website: val })
            }
          />
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Input
            label={translate("cv.basics_informations.address")}
            value={basics_informations.address}
            onChangeText={(val) =>
              setBasicsInformations({ ...basics_informations, address: val })
            }
          />
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Select
            label={translate("cv.basics_informations.country")}
            value={_countryJSON[selectedCountry.row].name}
            selectedIndex={selectedCountry}
            onSelect={(index) => {
              setSelectedCountry(index);
              setBasicsInformations({
                ...basics_informations,
                country: _countryJSON[index.row].name,
              });
            }}
          >
            {_countryJSON.map((country, index) => (
              <SelectItem key={index} title={country.name} />
            ))}
          </Select>
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Input
            label={translate("cv.basics_informations.city")}
            value={basics_informations.city}
            onChangeText={(val) =>
              setBasicsInformations({ ...basics_informations, city: val })
            }
          />
        </View>
        <View style={{ padding: 15, paddingVertical: 10 }}>
          <Select
            label={translate("cv.basics_informations.gender")}
            value={_genderJSON[selectedGender.row]}
            selectedIndex={selectedGender}
            onSelect={(index) => {
              setSelectedGender(index);
              setBasicsInformations({
                ...basics_informations,
                gender: _genderJSON[index.row],
              });
            }}
          >
            {_genderJSON.map((gender, index) => (
              <SelectItem key={index} title={gender} />
            ))}
          </Select>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Pager title={pageIndex} backPage={backPage} hasBack={true} nextPage={_end} />
      {loader && <Loader />}
      {err && <Toast title={err} status="danger" />}
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
    setBasicsInformations: (item) =>
      dispatch(CvsActions.setBasicsInformations(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation);
