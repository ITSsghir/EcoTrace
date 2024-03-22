import React from "react";
import { Image, TouchableOpacity, StyleSheet, ImageStyle, ViewStyle, ImageURISource } from "react-native";

interface ScreenHeaderBtnProps {
  iconUrl: ImageURISource;
  dimension: number;
  handlePress: () => void;
}

const ScreenHeaderBtn : React.FC<ScreenHeaderBtnProps> = ({ iconUrl, dimension, handlePress }) => {
  const imgStyle: ImageStyle = {
    width: dimension,
    height: dimension,
    borderRadius: 10 / 1.25,
  };

  const styles = StyleSheet.create({
    btnContainer: {
      width: 40,
      height: 40,
      borderRadius: 10 / 1.25,
      justifyContent: "center",
      alignItems: "center",
    }
  });

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
