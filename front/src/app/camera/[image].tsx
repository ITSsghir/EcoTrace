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
    useEffect(() => {
        console.log("Labels: ", labels);
    }, [labels]);
    // Get the image from the params
    const image : string = params.image as string;

    // Get the predictions from the server (Google cloud Vision API)
    const getPrediction = async (uri : string) => {

        console.log("Getting predictions");

        if (!uri) {
          return;
        }
        try {
          const base64ImageData = await FileSystem.readAsStringAsync(uri, { 
            encoding: FileSystem.EncodingType.Base64 
          });          
          
          const body = {
            requests: [
              {
                image: {
                  content: base64ImageData,
                },
                features: [
                  {
                    type: 'LABEL_DETECTION',
                    maxResults: 20,
                  },
                ],
              },
            ],
          };
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          const responseJson = await response.json();
          console.log(JSON.stringify(responseJson.responses));
          setLabels(responseJson.responses[0].labelAnnotations[0].description);
    
        } catch (error) {
          console.log(error);
        }
      };

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