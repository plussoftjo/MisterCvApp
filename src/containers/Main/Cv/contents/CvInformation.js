import React from "react";
import { View, ScrollView } from "react-native";
import {
  Layout,
  Text,
  Input,
  Toggle,
  useTheme,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import { Pager } from "../components";
import { apis, Helper } from "../../../../services";
import { UserActions } from "../../../../stores";
import { Loader, Toast } from "../../../../components";
import {translate} from '../../../../translations'

let CvInformation = (props) => {
  // Global values
  let { selectedCv, myCvs } = props.user;
  let { categories } = props.settings;
  let { nextPage, pageIndex, setMyCvs } = props;

  let theme = useTheme();

  let [loader, setLoader] = React.useState(false);

  let [data, setData] = React.useState({
    title: selectedCv.title,
    public: selectedCv.public == 1 ? true : false,
    keys: selectedCv.keys,
    note: selectedCv.note,
    categories_id: selectedCv.categories_id,
    user_id: selectedCv.user_id,
    ID: selectedCv.ID,
    template_id: selectedCv.template_id,
    active: selectedCv.active,
    uri:selectedCv.uri
  });

  let [err, setErr] = React.useState(null);

  let [categoriesIndex, setCategoriesIndex] = React.useState(new IndexPath(0));

  React.useEffect(() => {
    // settings
    categories.forEach((category, index) => {
      if (category.ID == selectedCv.categories_id) {
        setCategoriesIndex(new IndexPath(index));
      }
    });
  }, []);

  let _flushCvs = (cv) => {
    let _myCvs = myCvs;
    _myCvs.forEach((_cv, index) => {
      if (_cv.ID == data.ID) {
        _myCvs[index] = cv;
      }
    });

    setMyCvs(_myCvs);
  };
  let _end = () => {
    setLoader(true);

    if (Helper.check_values([data.title])) {
      // Finish the Edit
      let _data = {
        title: data.title,
        public: data.public ? 1 : 0,
        keys: data.keys,
        note: data.note,
        user_id: data.user_id,
        ID: data.ID,
        categories_id: categories[categoriesIndex.row].ID,
        template_id: data.template_id,
        active: data.active,
        uri:data.uri
      };
      apis.cvs.update(
        _data,
        (res) => {
          _flushCvs(res.cv);
          setLoader(false);
          nextPage();
        },
        (err) => {
          CallErr(translate("err.error"));
          setLoader(false);
        }
      );
    } else {
      CallErr(translate("err.complete_fields"));
      setLoader(false)
    }
  };

  let CallErr = (title) => {
    setErr(title);
    setTimeout(() => {
      setErr(null);
    }, 3000);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.cv_informations")}</Text>
        </View>
        <View style={{ padding: 15 }}>
          <View style={{ paddingVertical: 16 }}>
            <Input
              placeholder={translate("cv.cv_informations.title")}
              value={data.title}
              onChangeText={(val) => setData({ ...data, title: val })}
              label={translate("cv.cv_informations.title")}
            />
          </View>
          <View style={{ paddingVertical: 16, flexDirection: "row" }}>
            <Toggle
              checked={data.public}
              onChange={() => {
                setData({ ...data, public: !data.public });
              }}
            >
             {translate("cv.cv_informations.public_cv")}
            </Toggle>
          </View>
          <Text category="s2" style={{ color: theme["text-hint-color"],textAlign:'left' }}>
          {translate("cv.cv_informations.public_hint")}
          </Text>
          {data.public && (
            <View style={{ paddingVertical: 16 }}>
              <Input
                placeholder="ex:Eng,Desginer other"
                value={data.keys}
                onChangeText={(val) => setData({ ...data, keys: val })}
                label={translate("cv.cv_informations.keys")}
                caption={translate("cv.cv_informations.keys_hint")}
              />
            </View>
          )}
          <View style={{ paddingVertical: 16 }}>
            <Select
              label={translate("cv.cv_informations.categories")}
              value={categories[categoriesIndex.row].title}
              selectedIndex={categoriesIndex}
              onSelect={(index) => setCategoriesIndex(index)}
            >
              {categories.map((category, index) => (
                <SelectItem key={index} title={category.title} />
              ))}
            </Select>
          </View>
          <View style={{ paddingVertical: 16 }}>
            <Input
              placeholder={translate("cv.cv_informations.note_placeholder")}
              label={translate("cv.cv_informations.note")}
              value={data.note}
              onChangeText={(val) => setData({ ...data, note: val })}
              multiline={true}
              textStyle={{ minHeight: 62 }}
            />
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Pager nextPage={_end} title={pageIndex} />
      {loader && <Loader />}
      {err && <Toast title={err} status={'danger'} />}
    </View>
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
    setMyCvs: (item) => dispatch(UserActions.setMyCvs(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CvInformation);
