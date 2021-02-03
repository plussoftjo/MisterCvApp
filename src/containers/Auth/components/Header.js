import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Defs, Ellipse, LinearGradient, Stop } from "react-native-svg";

// Models
import Models from "../models";

// Constants
import { colors } from "../../../constants";

export default () => {
  /**
   *
   * @height {ScreenHeight}
   * @width {ScreenWidth}
   * */
  let { height, width } = Dimensions.get("window");

  return (
    <View style={{ width: "100%", height: Models.header.svgHeight + 20 }}>
      <Svg height={Models.header.svgHeight + 20} width={Models.header.width}>
        <Defs>
          <LinearGradient id="grad" x1="1" x2="1" y2="100%">
            <Stop offset="0" stopColor={colors.uraninBlue} stopOpacity="1" />
            <Stop offset="1" stopColor={colors.mauve5} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* TODO: Change the handler for arabic */}
        <Ellipse
          rx={Models.header.svgHeight}
          ry={Models.header.svgHeight}
          cx={Models.header.rtlSpace}
          fill="url(#grad)"
        />
      </Svg>
    </View>
  );
};
