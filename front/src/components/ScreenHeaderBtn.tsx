import React from "react";
import { Image, TouchableOpacity, StyleSheet, ImageStyle, ViewStyle, ImageURISource } from "react-native";
import { ScreenHeaderBtnProps } from "@/types/ScreenHeaderBtn";
import styles from "@/styles/ScreenHeaderBtn";

const ScreenHeaderBtn : React.FC<ScreenHeaderBtnProps> = ({ iconUrl, dimension, handlePress }) => {
  const imgStyle: ImageStyle = {
    width: dimension,
    height: dimension,
    borderRadius: 10 / 1.25,
  };

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image 
        source={iconUrl}
        resizeMode='cover'
        style={imgStyle}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;