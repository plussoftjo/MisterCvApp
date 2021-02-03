import React from "react";
import { View, Image } from "react-native";
import { Layout, Text, useTheme, Icon,Button } from "@ui-kitten/components";
import { connect } from "react-redux";
import {translate} from '../../../translations'
let Empty = (props) => {
  let theme = useTheme();
  let {setShowFilter} = props;
  return (
    <Layout style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Icon
          name={"clipboard-outline"}
          style={{ width: 62, height: 64 }}
          fill={theme["text-hint-color"]}
        />
        <Text
          category="h3"
          style={{ textAlign: "center", color: theme["text-hint-color"] }}
        >
          {translate("explore.empty.search")}
        </Text>
        <Text
          category="s1"
          style={{ textAlign: "center", color: theme["text-hint-color"] }}
        >
          {translate("explore.empty.you_want_employ")}
        </Text>
        <Text
          category="s1"
          style={{ textAlign: "center", color: theme["text-hint-color"] }}
        >
          {translate("explore.empty.search_in_the_app")}
        </Text>
        <Button status="basic" size="small" onPress={() => {
          setShowFilter(true)
        }} style={{marginTop:15,width:'50%'}}>{translate("global.search")}</Button>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Empty);
