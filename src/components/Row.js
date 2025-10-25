import React from "react";
import { View } from "react-native";
import DirectionContext from "./DirectionContext";

/**
 *
 * @param {Object} param
 * @param {React.ReactNode} param.children
 * @param {import('react-native').StyleProp<import('react-native').ViewStyle>} param.style
 * @param {boolean} param.spaceBetween
 * @param {boolean} param.spaceAround
 * @param {boolean} param.spaceEvenly
 * @param {boolean} param.center
 * @param {boolean} param.end
 * @param {boolean} param.alignCenter
 * @param {boolean} param.alignStart
 * @param {boolean} param.alignEnd
 * @returns
 */
const Row = ({
  children,
  style,
  spaceBetween,
  spaceAround,
  spaceEvenly,
  center,
  end,
  alignCenter,
  alignStart,
  alignEnd,
}) => {
  // Tentukan justifyContent
  let justifyContent = "flex-start";
  if (spaceBetween) justifyContent = "space-between";
  else if (spaceAround) justifyContent = "space-around";
  else if (spaceEvenly) justifyContent = "space-evenly";
  else if (center) justifyContent = "center";
  else if (end) justifyContent = "flex-end";

  // Tentukan alignItems
  let alignItems = "stretch";
  if (alignCenter) alignItems = "center";
  else if (alignStart) alignItems = "flex-start";
  else if (alignEnd) alignItems = "flex-end";

  return (
    <DirectionContext.Provider value="row">
      <View
        style={[{ flexDirection: "row", justifyContent, alignItems }, style]}
      >
        {children}
      </View>
    </DirectionContext.Provider>
  );
};

export default Row;
