import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


/** Screens */
import {Main,ShowCv} from '../containers'
import BottomTapNavigation from './BottomTapNavigation'


/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function MainNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"BottomTapNavigation"}
    >
     <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
     <Stack.Screen name="Cv" component={Main.Cv} />
     <Stack.Screen name="PreviewCv" component={Main.PreviewCv} />
     <Stack.Screen name="ShowCv" component={ShowCv} />
    </Stack.Navigator>
  );
}
