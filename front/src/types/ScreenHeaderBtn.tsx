import { ImageURISource } from "react-native";

export interface ScreenHeaderBtnProps {
    iconUrl: ImageURISource;
    dimension: number;
    handlePress: () => void;
}