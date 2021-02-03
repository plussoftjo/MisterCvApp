import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Icon, Text, Input, Button } from "@ui-kitten/components";
import { connect } from "react-redux";

import { CvsActions } from "../../../../stores";
import { apis,Helper } from "../../../../services";
import { Loader,Toast } from "../../../../components";
import {translate} from '../../../../translations'
import { Pager } from "../components";
let Certifications = (props) => {
  let [_certification, setCertification] = React.useState({ title: "" });
  let { selectedCv, user } = props.user;
  let { pageIndex, nextPage, setCertifications,backPage } = props;
  let { certifications } = props.cvs;
  let [loader, setLoader] = React.useState(false);
  let [err,setErr] = React.useState(null)

  let _end = () => {
    setLoader(true);
    let __certifications = [];
    certifications.forEach((cert, index) => {
      if (cert.ID == 0) {
        __certifications.push(cert);
      }
    });
    apis.cvs.storeCertifications(
      __certifications,
      (res) => {
        setLoader(false);
        nextPage();
      },
      (err) => {
        setLoader(false);
        CallErr(translate('err.error'))
      }
    );
  };

  let CallErr = (title) => {
    setErr(title)
    setTimeout(() => {
      setErr(null)
    }, 3000);
  }

  let removeRecord = (id) => {
    if (id !== 0) {
      apis.cvs.deleteCertifications(
        id,
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 15 }}>
          <Text category="h3" style={{textAlign:'left'}}>{translate("cv.enums.certifications")}</Text>
        </View>
        <View style={{ padding: 15 }}>
          <Input
            label={translate("cv.certifications.title")}
            value={_certification.title}
            onChangeText={(val) => {
              setCertification({ ..._certification, title: val });
            }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Button
            onPress={() => {
              if (_certification.title !== "") {
                let _data = {
                  ..._certification,
                  user_id: user.ID,
                  cvs_id: selectedCv.ID,
                  ID: 0,
                };
                setCertifications([...certifications, _data]);
                setCertification({ title: "" });
              }else {
                CallErr(translate("err.complete_fields"))
              }
            }}
          >
            {translate("global.add")}
          </Button>
        </View>
        <View
          style={{
            padding: 15,
            borderTopColor: "#7e7e7e",
            borderTopWidth: 0.5,
          }}
        >
          <View
            style={{
              padding: 15,
              borderRadius: 3,
              borderColor: "#7e7e7e",
              borderWidth: 0.5,
            }}
          >
            <Text style={{textAlign:'left'}}>{translate("cv.certifications.title")}</Text>
          </View>
          {certifications.map((certification, index) => (
            <View
              key={index}
              style={{
                padding: 15,
                borderRadius: 3,
                borderColor: "#7e7e7e",
                borderWidth: 0.5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{certification.title}</Text>
              <Pressable
                onPress={() => {
                  certifications.splice(index, 1);
                  setCertifications(certifications);
                  removeRecord(certification.ID);
                }}
              >
                <Icon
                  name="trash-2"
                  fill="red"
                  style={{ width: 18, height: 18 }}
                />
              </Pressable>
            </View>
          ))}
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <Pager title={pageIndex} backPage={backPage} hasBack={true} nextPage={_end} />
      {loader &&
        <Loader />
      }
      {err && <Toast title={err} status={'danger'} />}
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
    setCertifications: (item) => dispatch(CvsActions.setCertifications(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Certifications);
