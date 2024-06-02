import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from 'expo-file-system';
import styles from "@/styles/camera";
import { useSession } from "../context/ctx";

export default function Preview() {

    const { getPredictionVertexAI, predictionJson } = useSession();

    // Get the image from the camera(passed as a params from the camera component via the router)
    const router = useRouter();
    const params = useLocalSearchParams();
    const EXPO_PUBLIC_API_KEY='AIzaSyB2cXdGtEfR9rw6oHHOQD7QLII9n0rmn_g'
    const EXPO_PUBLIC_API_URL="https://vision.googleapis.com/v1/images:annotate?key="

    // Get the API key from the environment variables
    const apiUrl = EXPO_PUBLIC_API_URL + EXPO_PUBLIC_API_KEY;

    // Set the labels
    const [labels, setLabels] = React.useState<string | null>(null);
    // Get the image from the params
    const image : string = params.image as string;

    const handleGetPrediction = async () => {
      // Get the predictions from the server
      await getPredictionVertexAI(image);
      router.push('/camera/result');
    }

    return (
        <SafeAreaView style={styles.PreviewStyles.container}>
            <View style={styles.PreviewStyles.Imagecontainer}>
                <Image source={{ uri: image }} style={styles.PreviewStyles.imagePreview} />
                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}
                    onPress={() => {
                      handleGetPrediction();
                    }
                }>
                  <Text>Get predictions</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={styles.PreviewStyles.subTitle}>Predictions:</Text>
                <Text>{labels}</Text>
            </View>
        </SafeAreaView>
    );
}