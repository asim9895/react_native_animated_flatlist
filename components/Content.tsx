import { View, Text } from "react-native";
import React from "react";
import { contentStyles } from "./content.style";
const SPACING = 20;

const Content: React.FC<any> = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={contentStyles.title}>{item.title}</Text>
      <Text style={contentStyles.desc}>{item.desc}</Text>
      <View style={{ flexDirection: "row", marginTop: SPACING }}>
        <Text style={contentStyles.price}>{item.price}</Text>
        <Text style={contentStyles.currency}>USD</Text>
      </View>
    </View>
  );
};

export default Content;
