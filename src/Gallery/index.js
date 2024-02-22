import React from "react";
import { View, Image } from "react-native";

export default function Gallery(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        justifyContent: "space-evenly",
      }}
    >
      {props.allUri.map((uri, index) => {
        return (
          <Image
            style={{
              borderRadius: 10,
            }}
            width={170}
            height={200}
            key={index}
            source={{ uri }}
          />
        );
      })}
    </View>
  );
}
