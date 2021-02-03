import React from "react";
import { View,TouchableOpacity } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageToken} from '../../../constants'
import {UserDetails,Languages} from './contents'
import {translate} from '../../../translations'

let SettingsMain = (props) => {
     
let {user} = props.user
let {navigation} = props
let {rtl} = props.locale

let [show,setShow] = React.useState("")
  let theme = useTheme();


let _logout = async() => {
     await AsyncStorage.removeItem(StorageToken.userToken)
     navigation.popToTop();
}

  let ListItem = ({ icon, title, hasRightIcon = true,onPress = () => {} }) => (
    <TouchableOpacity
    onPress={() => {onPress()}}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical:7,
        borderBottomColor:"rgba(0,0,0,0.1)",
        borderBottomWidth:0.5
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name={icon}
          fill={theme["text-hint-color"]}
          style={{ width: 26, height: 26 }}
        />
        <View style={{width:10}}/>
        <Text category="s1">{title}</Text>
      </View>
      {hasRightIcon && (
        <Icon
          name={"arrow-ios-forward-outline"}
          name={rtl ? 'arrow-ios-back-outline':'arrow-ios-forward-outline'}
          fill={theme["text-hint-color"]}
          style={{ width: 26, height: 26 }}
        />
      )}
    </TouchableOpacity>
  );
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title={translate("settings.settings")} />
      <View
        style={{
          padding: 5,
          paddingVertical: 10,
          borderColor: "#fafafa",
          borderWidth: 15,
          borderRadius: 10,
          margin: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0,0,0,0.1)",
          }}
        >
          <Icon
            name="person-outline"
            style={{ width: 26, height: 26 }}
            fill={theme["text-hint-color"]}
          />
          <Text category="s1" style={{ fontSize: 18 }}>
            {" "}
            {user.name}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Icon
            name="phone-outline"
            style={{ width: 26, height: 26 }}
            fill={theme["text-hint-color"]}
          />
          <Text category="s1" style={{ fontSize: 18 }}>
            {" "}
            {user.phone}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 5,
          paddingVertical: 10,
          borderColor: "#fafafa",
          borderWidth: 15,
          borderRadius: 10,
          margin: 10,
        }}
      >
           <ListItem title={translate("settings.user_details")}  onPress={() => {setShow("UserDetails")}} icon={'edit-2-outline'} />
           <ListItem title={translate("settings.languages")} onPress={() => {setShow("Languages")}} icon={'flag-outline'} />
           <ListItem title={translate("settings.logout")} icon={'close-circle-outline'} hasRightIcon={false} onPress={() => {_logout()}} />
      </View>
      {show == "UserDetails" &&
        <UserDetails onHide={() => {
             setShow("")
        }} />
      }
      {show == "Languages" &&
        <Languages onHide={() => {
             setShow("")
        }} />
      }
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
       user:state.user,
       locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMain);
