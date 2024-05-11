import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from 'expo-file-system';

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

        // convert image to base64
        const base64ImageData = await FileSystem.readAsStringAsync(uri, { 
          encoding: FileSystem.EncodingType.Base64 
        });

        // Prompt for the model (for more information on the prompt, check the Vertex AI API documentation https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts?hl=fr)
        const prompt = "Fournissez la liste de tous les attributs suivants :\n"
          + "ingrédients (estimation quantité, unité (en gramme)), l'empreinte carbone totale de la recette, et l'unité, au format JSON\n"
          + "Exemple :\n"
          + "{\n"
          + "  \"ingrédients\": [\n"
          + "    {\n"
          + "      \"nom\": \"tomate\",\n"
          + "      \"quantité\": 100,\n"
          + "      \"unité\": \"g\"\n"
          + "    },\n"
          + "    {\n"
          + "      \"nom\": \"pomme\",\n"
          + "      \"quantité\": 200,\n"
          + "      \"unité\": \"g\"\n"
          + "    }\n"
          + "  ],\n"
          + "  \"total_carbon_footprint\": 100,\n"
          + "  \"unité\": \"g CO2e\"\n" // or "kg CO2e"
          + "}";

        const url = process.env.EXPO_PUBLIC_AUTH_API_URL + '/predict';
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

        // Trim the prediction (remove the '```json' and '```' from the string)
        const predictionTrimmed = prediction.replace('```json', '').replace('```', '');
        
        // Store the prediction in a variable as a json object
        const predictionJson = JSON.parse(predictionTrimmed);

        // Set the labels
        setLabels(predictionJson.total_carbon_footprint + ' ' + predictionJson.unité);
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Imagecontainer}>
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
const cameraHeight = height * 0.7;
const styles = {
    container: {
        flex: 1,
    },
    Imagecontainer : {
        flex: 1,
        height: cameraHeight,
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