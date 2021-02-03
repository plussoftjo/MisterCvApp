import React from 'react';
import { View } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';


import {Cards} from '../../../../components'
import {UserActions} from '../../../../stores'

let Cvs = (props) => {
    let {myCvs,} = props.user;
    let {navigation,setSelectedCv} = props;
    
    // onPressCv
    let onPressCv = (cv) => {

        setSelectedCv(cv)
        if(cv.active == 1 ){
            navigation.navigate("PreviewCv")
            return
        }
        navigation.navigate("Cv")
    }

     return(
         <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center',zIndex:1}}>
            {myCvs.map((cv,index) => (
                <Cards.CvCard onPressCv={onPressCv} key={index} cv={cv} settings={props.settings} />
            ))}
         </View>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user,
         settings:state.settings
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setSelectedCv:item => dispatch(UserActions.setSelectedCv(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cvs);