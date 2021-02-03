import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


/** Screens */
import {Settings} from '../containers'



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
      initialRouteName={"SettingsMain"}
    >
     <Stack.Screen name="SettingsMain" component={Settings.SettingsMain} />
    </Stack.Navigator>
  );
}
