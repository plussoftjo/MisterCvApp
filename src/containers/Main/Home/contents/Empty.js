import React from 'react';
import {View,} from 'react-native';
import {Text,Icon,useTheme} from '@ui-kitten/components'

import {translate} from '../../../../translations'

// Models 
import {Models,Icons} from '../../../../constants'

export default () => {
    let theme = useTheme();
     return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Icon name="archive-outline" style={{width:Models.iconSize.width,height:Models.iconSize.height}} fill={theme['text-hint-color']} />
            <Text category={'h3'} style={{color:theme['text-hint-color'],textAlign:'center'}}>{translate("main.empty.empty_cvs_list")}</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:theme['text-hint-color'],textAlign:'center'}} category="s1">{translate("main.empty.you_can_add_new_cv")}</Text>
                <Icon name={Icons.plus} style={{width:24,height:24}} fill={theme['color-primary-500']} />
            </View>
        </View>
     )
}