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
import { env,Icons } from "../../../constants";
import {translate} from '../../../translations'
import { WebView } from "react-native-webview";
import {Loader} from '../../../components'
let PreviewCv = (props) => {
  let { selectedCv } = props.user;
  let {rtl} = props.locale
  let theme = useTheme();

  let [load,setLoad] = React.useState(true)

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

  const BackIcon = (props) => <Icon {...props} name={rtl ? Icons.back_rtl:Icons.back} />;

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
      onLoad={() => {
        setLoad(false)
      }}
        style={{ height: "100%" }}
        source={{ uri: env.server + "public/PDF/" + selectedCv.uri + '.pdf' }}
      ></WebView>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme["color-success-500"],
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => {
              // Edit
              props.navigation.navigate("Cv")
            }}
            style={{ borderRadius: 0 }}
          >
            {translate("preview_cv.edit")}
          </Button>
        </View>
        <Pressable
          onPress={() => {
            SharePdf();
          }}
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
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
      {load &&
        <Loader />
      }
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    locale:state.settings.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCv);
