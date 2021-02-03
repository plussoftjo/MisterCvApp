import {Dimensions} from 'react-native'


// Width,Height
let {width,height} = Dimensions.get('window');

let Models = {
    header:{
        height:height,
        width:width,
        svgHeight:height * 0.7,
        ltrSpace:70,
        rtlSpace:300
    },
    login:{
        header:"Login",
        last:[
            "Dont't have account?",
            "New Account"
        ],
    },
    register:{
        header:"Register",
        last:[
            "Have account?",
            "Login"
        ],
    }
    
}

export default Models;