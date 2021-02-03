import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme, Icon } from "@ui-kitten/components";
import {connect} from 'react-redux'
import {translate} from '../../../../translations'

let Pager = (props) => {
  let theme = useTheme();
  let {rtl} = props.locale
  let { title, nextPage, backPage, hasBack = false } = props;
  return (
    <View style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme["color-success-500"],
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        {hasBack && (
          <TouchableOpacity
            onPress={() => {
              backPage();
            }}
            style={{
              padding: 17,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme["color-danger-500"],
            }}
          >
            <Icon
              name={rtl ? 'arrow-forward-outline':'arrow-back-outline'}
              fill="white"
              style={{ width: 18, height: 18 }}
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            flex: 3,
            padding: 17,
            backgroundColor: theme["color-info-500"],
            borderTopLeftRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold",textAlign:'left' }} category="s1">
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            nextPage();
          }}
          style={{
            flex: 1,
            padding: 17,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }} category="s1">
            {title == "Certifications" ? translate("cv.enums.preview") : translate("global.next")}
          </Text>
          <View style={{ width: 5 }}></View>
          <Icon
            name={rtl ? 'arrow-back-outline':'arrow-forward-outline'}
            fill="white"
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const mapStateToProps = (state) => {
  return {
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
