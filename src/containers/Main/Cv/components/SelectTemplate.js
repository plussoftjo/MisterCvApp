import React from "react";
import { View, Image, ScrollView,TouchableOpacity } from "react-native";
import { Layout, Text, useTheme,Button } from "@ui-kitten/components";
import { connect } from "react-redux";

import { ContentCard } from "../../../../components";
import { env } from "../../../../constants";
import {UserActions} from '../../../../stores'
import {translate} from '../../../../translations'

let SelectTemplate = (props) => {
  let theme = useTheme();
  let { templates } = props.settings;

  let {selectedCv} = props.user
  let {setSelectedCv} = props;

  let SelectTemplate = (id) => {
      setSelectedCv({...selectedCv,template_id:id})
  }

  React.useEffect(() => {

    if(templates.length >= 1) {
      setSelectedCv({...selectedCv,template_id:templates[0].ID})
    }
  },[])

  let TemplateCard = ({ template }) => (
    <TouchableOpacity onPress={() => {
        SelectTemplate(template.ID)
    }} style={{ padding: 5, width: "50%" }}>
      <View style={{ borderColor: selectedCv.template_id == template.ID?theme['color-success-500']: theme["text-hint-color"], borderWidth: selectedCv.template_id == template.ID?1:0.5,borderRadius:5 }}>
        <Image
          source={{
            uri: env.server + "public/Images/TemplateCaptions/" + template.caption,
          }}
          style={{ width: "100%", height: 150,borderRadius:5 }}
          resizeMode="contain"
        />
      </View>
      <Text category="s1" style={{padding:5}}>{template.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ position: "absolute", left: 0, bottom: 0, width: "100%",height:"90%" }}>
      <ContentCard>
        <Text category="h3" style={{textAlign:'left'}}>{translate("cv.select_template.title")}</Text>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: theme["color-basic-500"],
            marginTop: 5,
          }}
        ></View>
        {/* Captions */}
        <ScrollView
          contentContainerStyle={{ flexDirection: "row", alignItems: "center",flexWrap:'wrap',justifyContent:'center',paddingBottom:63 }}
        >
          {templates.map((trg, index) => (
            <TemplateCard key={index} template={trg} />
          ))}
        </ScrollView>
      </ContentCard>
      <Button status={"success"} onPress={() => {
          props.GenerateCv()
      }}>{translate("cv.select_template.generate_cv")}</Button>
      <Button status={"danger"} onPress={() => {
          props.CloseSelectTemplate()
      }}>{translate("cv.select_template.close")}</Button>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    cvs:state.cvs,
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedCv:item => dispatch(UserActions.setSelectedCv(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
