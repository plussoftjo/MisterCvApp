import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import {Text,useTheme} from '@ui-kitten/components'

import {Models,env} from '../../../constants'

export default (props) => {
    let {cv,onPressCv,settings} = props;
    let GetCaption = () => {
        let caption = ""
        settings.templates.forEach((trg,index) => {
            if(trg.ID == cv.template_id) {
                caption = trg.caption
            }
        })
        return caption
    }
     return (
        <TouchableOpacity onPress={() => {onPressCv(cv)}} style={{padding:10}}>
            {cv.template_id == 0 &&
                <Image source={require('../../../assets/file.jpg')} style={{width:Models.imageSize.width,height:Models.imageSize.height,borderRadius:5,borderColor:'#7e7e7e',borderWidth:1}} resizeMode="contain" />
            }
            {cv.template_id !== 0 &&
                <Image source={{uri:env.server + 'public/Images/TemplateCaptions/' + GetCaption()}} style={{width:Models.imageSize.width,height:Models.imageSize.height,borderRadius:5,borderColor:'#7e7e7e',borderWidth:1}} resizeMode="contain" />
            }
            <Text category="s1" style={{textAlign:'center',marginTop:10}}>{cv.title}</Text>
        </TouchableOpacity>
     )
}