import React from 'react';
import { View,ScrollView,TouchableOpacity } from 'react-native';
import { Layout,Text,useTheme } from '@ui-kitten/components';
import { connect } from 'react-redux';

import {UserActions} from '../../../stores'
import {translate} from '../../../translations'

let Cvs = (props) => {
    let {exploreCvs} = props.user
    let {setSelectedCv,navigation} = props;
    let theme = useTheme()


    let onPressCv = (cv) => {
        setSelectedCv(cv)
        navigation.navigate("ShowCv")
    }

    let ItemList = ({title,value}) => (
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:theme['text-hint-color'],borderBottomWidth:0.5,paddingVertical:5}}>
            <Text category={'s1'} style={{flex:1}}>{title}</Text>
            <Text category={'s2'} style={{flex:1}}>{value}</Text>
        </View>
    )
    let CvCard = ({cv}) => (
        <TouchableOpacity onPress={() => {
            onPressCv(cv)
        }} style={{padding:15,margin:5,borderRadius:5,borderColor:theme['text-hint-color'],borderWidth:1}}>
            <ItemList title={translate("explore.cvs.full_name")} value={cv.basic_informations.full_name} />
            <ItemList title={translate("explore.cvs.country")} value={cv.basic_informations.country} />
            <ItemList title={translate("explore.cvs.gender")} value={cv.basic_informations.gender} />
            <ItemList title={translate("explore.cvs.keys")} value={cv.keys} />
        </TouchableOpacity>
    )
     return(
         <ScrollView showsVerticalScrollIndicator={false}>
            {exploreCvs.map((cv,index) => (
                <CvCard key={index} cv={cv} />
            ))}
         </ScrollView>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setSelectedCv:item => dispatch(UserActions.setSelectedCv(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cvs);