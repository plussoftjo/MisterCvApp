import React from 'react';
import { View } from 'react-native';
import { Layout,Text, TopNavigation,Icon,TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Models
import {Icons} from '../../../../constants'

let HeaderContent = ({navigation,locale}) => {
    let {rtl} = locale

    let DrawerIcon = (props) => (
        <Icon name={Icons.grid} {...props} />
    );
    let DrawerActions = () => (
        <TopNavigationAction  icon={DrawerIcon} />
    )

    let xCloseIcon = (props) => (
        <Icon name={rtl ? Icons.back_rtl:Icons.back} {...props} />
    );
    let xCloseActions = () => (
        <TopNavigationAction onPress={() => {navigation.goBack()}} icon={xCloseIcon}></TopNavigationAction>
    )
     return(
         <TopNavigation accessoryLeft={xCloseActions}></TopNavigation>
     )
}


const mapStateToProps = (state) => {
     return {
         locale:state.settings.locale
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);