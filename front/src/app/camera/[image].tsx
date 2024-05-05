import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, Image, ImageURISource, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useSession } from "../context/ctx";

export default function Preview() {

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
          let responseJson = await response.json();
          console.log(JSON.stringify(responseJson.responses));
          setLabels(responseJson.responses[0].labelAnnotations[0].description);
    
        } catch (error) {
          console.log(error);
        }
      };

      // Get the predictions from the server (Vertex Vision AI API)
      const getPredictionVertexAI = async (uri : string) => {      
        console.log("Getting predictions");

        if (!uri) {
          return;
        }

        const fileExtension = uri.split('.').pop();
        console.log(fileExtension);

        // convert image to base64
        const base64ImageData = await FileSystem.readAsStringAsync(uri, { 
          encoding: FileSystem.EncodingType.Base64 
        });

        const prompt = "Can you estimate the carbon foorprint of what's in this image? Give me just the number + unit (e.g. 10 kg CO2e)";

        const url = 'http://100.114.128.64:3000/predict';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            base64Image: base64ImageData,
            extension: `${fileExtension}`,
            prompt: prompt
          }),
        });

        const data = await response.json();
        return data;
      }

      const handleGetPrediction = async () => {
        const response = await getPredictionVertexAI(image);
        const prediction = response.prediction;
        setLabels(prediction);
        console.log(prediction);
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', padding: 10, marginTop: 20 }}>
                </View>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, margin: 10}}
                    onPress={() => {
                      handleGetPrediction();
                    }
                    }>
                <Text>Get predictions</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={styles.subTitle}>Predictions:</Text>
                <Text>{labels}</Text>
            </View>
        </SafeAreaView>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = {
    container: {
        flex: 1,
    },
    
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 3 / 4,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    subTitle: {
        fontSize: 12
    },
    imagePreview: {
        width: width,
        height: height * 0.7,
    }
};