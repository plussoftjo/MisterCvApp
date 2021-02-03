/** FontLoader */

import React from 'react';

import * as Font from "expo-font"; // Expo Fonts
import { Ionicons } from "@expo/vector-icons"; // Vector Icons Register

let FontsLoader = async () => {
    async function InstallFonts() {
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
          "OpenSans":require("../../assets/fonts/OpenSans-Regular.ttf")
        });
    }

    // Call Function
    InstallFonts();
}

export default FontsLoader;