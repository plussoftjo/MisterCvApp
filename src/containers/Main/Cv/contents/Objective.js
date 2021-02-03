import React from "react";
import { View, ScrollView } from "react-native";
import { Input, Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";

import { CvsActions } from "../../../../stores";
import { apis, Helper } from "../../../../services";

import { Pager } from "../components";
import { Loader, Toast } from "../../../../components";

import {translate} from '../../../../translations'

let Objective = (props) => {
  let { pageIndex, nextPage, setSummary, backPage } = props;
  let { summary } = props.cvs;
  let { user, selectedCv } = props.user;
  let [loader, setLoader] = React.useState(false);
  let [err, setErr] = React.useState(null);

  let _end = () => {
    setLoader(true);
    if (Helper.check_values([summary.title])) {
      if (summary.ID == 0) {
        let _data = {
          ...summary,
          user_id: user.ID,
          cvs_id: selectedCv.ID,
        };
        apis.cvs.storeSummary(
          _data,
          (res) => {
            setSummary(res.summary);
            setLoader(false);
            nextPage();
          },
          (err) => {
            setLoader(false);
            CallErr(translate("err.error"));
          }
        );
      } else {
        apis.cvs.updateSummary(
          summary,
          (res) => {
            setSummary(res.summary);
            nextPage();
          },
          (err) => {
            CallErr(translate("err.error"));
            setLoader(false);
          }
        );
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
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.objective")}</Text>
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.summary.title")}
            placeholder={translate("cv.summary.title_hint")}
            value={summary.title}
            onChangeText={(val) => setSummary({ ...summary, title: val })}
            multiline={true}
            textStyle={{ minHeight: 128 }}
          />
        </View>
      </ScrollView>
      <Pager
        title={pageIndex}
        backPage={backPage}
        hasBack={true}
        nextPage={_end}
      />
      {loader && <Loader />}
      {err && <Toast title={err} status="danger"></Toast>}
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
    setSummary: (item) => dispatch(CvsActions.setSummary(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Objective);
