import React from "react";
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

import { ContentCard, Toast, Loader } from "../../../../components";
import { Icons, Models } from "../../../../constants";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { apis, Helper } from "../../../../services";
// Stores
import { UserActions } from "../../../../stores";

import {translate} from '../../../../translations'

let AddNew = (props) => {
  // Global Variables
  let theme = useTheme();
  let { addNewCv, onHide } = props;
  let { user } = props.user;
  let { categories } = props.settings;
  let [categoriesIndex, setCategoriesIndex] = React.useState(new IndexPath(0));

  let [err, setErr] = React.useState(null);
  let [loader, setLoader] = React.useState(false);
  // Data
  let [data, setData] = React.useState({
    title: "",
    public: false,
    keys: "",
    note: "",
  });

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
  }, []);

  // Save
  let _save = () => {
    setLoader(true);
    if (Helper.check_values([data.title])) {
      let _data = {
        user_id: user.ID,
        title: data.title,
        keys: data.keys,
        public: data.public ? 1 : 0,
        categories_id: categories[categoriesIndex.row].ID,
        note: data.note,
        template_id: 0,
        active: 0,
      };
      apis.cvs.store(
        _data,
        (res) => {
          addNewCv(res.cv);
          onComplete();
          setLoader(false);
        },
        (err) => {
          CallErr(translate("err.error"));
          setLoader(false);
        }
      );
      // Save New cv to global myCvs
      // On complete
      function onComplete() {
        _handleAnimation("hide");
        setTimeout(() => {
          onHide();
        }, 600);
      }
    } else {
      CallErr(translate("err.complete_fields"));
      setLoader(false);
    }
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
            zIndex:1
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
                  name={Icons.newCv}
                  style={{
                    width: Models.iconSimple.width,
                    height: Models.iconSimple.height,
                  }}
                  fill={theme["text-hint-color"]}
                />
                <View style={{ width: 5 }}></View>
                <Text category={"h3"}>{translate("main.add_new.new_cv")}</Text>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <Input
                  placeholder={translate("main.add_new.title_placeholder")}
                  value={data.title}
                  onChangeText={(val) => setData({ ...data, title: val })}
                  label={translate("main.add_new.title")}
                />
              </View>
              <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                <Toggle
                  checked={data.public}
                  onChange={() => {
                    setData({ ...data, public: !data.public });
                  }}
                >
                  {translate("main.add_new.public_cv")}
                </Toggle>
              </View>
              <Text category="s2" style={{ color: theme["text-hint-color"] }}>
              {translate("main.add_new.public_hint")}
              </Text>
              {data.public && (
                <View style={{ paddingVertical: 5 }}>
                  <Input
                    placeholder="ex:Eng,Desginer other"
                    value={data.keys}
                    onChangeText={(val) => setData({ ...data, keys: val })}
                    label={translate("main.add_new.keys")}
                    caption={translate("main.add_new.keys_hint")}
                  />
                </View>
              )}
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
              <View style={{ paddingVertical: 5 }}>
                <Input
                  placeholder={translate("main.add_new.note_placeholder")}
                  label={translate("main.add_new.note")}
                  value={data.note}
                  onChangeText={(val) => setData({ ...data, note: val })}
                  multiline={true}
                  textStyle={{ minHeight: 42 }}
                />
              </View>
              <View style={{ paddingVertical: 5 }}>
                <Button status="success" onPress={_save}>
                {translate("global.save")}
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
    addNewCv: (item) => dispatch(UserActions.addNewCv(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
