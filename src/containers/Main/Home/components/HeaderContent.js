import React from 'react';
import {View,} from 'react-native';
import {Text,TopNavigation,Icon,TopNavigationAction,useTheme} from '@ui-kitten/components'


import {Icons} from '../../../../constants'
import {translate} from '../../../../translations'

export default (props) => {

    let {handlePressPlusIcon} = props;
    // Variables
    let theme = useTheme();

    // Icon
    let PlusIcon = (props) => (
        <Icon name={Icons.plus} {...props} fill={theme['color-primary-500']}  />
    )

    // Icon Actions
    let PlusIconActions = () => (
        <TopNavigationAction onPress={handlePressPlusIcon} icon={PlusIcon} />
    )

    // Return
     return (
        <TopNavigation title={translate("main.header")} accessoryRight={PlusIconActions} />
     )
}