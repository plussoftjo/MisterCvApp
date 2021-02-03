import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@ui-kitten/components";


import {Main,Explore} from '../containers'
import SettingsNavigation from './SettingsNavigation'

const Tab = createBottomTabNavigator();

export default function BottomTapNavigation(props) {
  let theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "tablet" : "tablet";
          } else if(route.name === "Explore") {
            iconName = focused ? "globe" : "globe";
          }
          else if(route.name === "SettingsNavigation") {
            iconName = focused ? "settings" : "settings";
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                borderBottomColor: color,
                borderBottomWidth: focused ? 2 : 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme['color-primary-500'],
        inactiveTintColor: "gray",
        showLabel: false,
      }}
      initialRouteName={"Home"}
    >
      <Tab.Screen name="Home" component={Main.Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="SettingsNavigation" component={SettingsNavigation} />
    </Tab.Navigator>
  );
}