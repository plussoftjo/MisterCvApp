import React from "react";
import { View, Pressable } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  Button,
  useTheme,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { env } from "../../constants";
import { WebView } from "react-native-webview";
import {translate} from '../../translations'
let ShowCv = (props) => {
  let { selectedCv } = props.user;
  let theme = useTheme();

  let SharePdf = async () => {
    const { uri: localUri } = await FileSystem.downloadAsync(
      env.server + "public/PDF/" + selectedCv.uri + '.pdf',
      FileSystem.documentDirectory + selectedCv.ID + ".pdf"
    ).catch((err) => {
      console.log(err);
    });

    await Sharing.shareAsync(localUri).catch((err) =>
      console.log("Sharing error", err)
    );
  };

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction
      onPress={() => {
        props.navigation.navigate("Home");
      }}
      icon={BackIcon}
    />
  );
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation accessoryLeft={BackAction} title="Cv" />
      <WebView
        style={{ height: "100%" }}
        source={{ uri: env.server + "public/PDF/" + selectedCv.uri + '.pdf'}}
      ></WebView>

      <View
        style={{
          flexDirection: "row",
          padding:15,
          backgroundColor: theme["color-success-500"],
        }}
      >
        <Pressable
          onPress={() => {
            SharePdf();
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {translate("preview_cv.share")}
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCv);
