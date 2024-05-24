import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';

const CarbonFootprintTips = () => {
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const screenWidth = Dimensions.get('window').width;

    const handleScrollToDefinition = () => {
        setIsDefinitionVisible(!isDefinitionVisible);
        Animated.timing(scrollX, {
            toValue: isDefinitionVisible ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const translateX = scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: [screenWidth, screenWidth * 0.25],
    });

    const tips = [
        { title: "Utilisez les transports en commun", description: "Réduisez votre empreinte carbone en utilisant les transports en commun au lieu de conduire une voiture." },
        { title: "Optez pour le covoiturage", description: "Partagez les trajets en voiture avec d'autres personnes pour réduire les émissions de gaz à effet de serre." },
        { title: "Privilégiez le vélo ou la marche", description: "Réduisez votre impact environnemental en choisissant le vélo ou la marche pour vos déplacements courts." },
        { title: "Économisez l'énergie à la maison", description: "Éteignez les lumières et les appareils électroniques lorsque vous ne les utilisez pas pour économiser de l'énergie." },
        { title: "Utilisez des appareils éconergétiques", description: "Remplacez les vieux appareils électroménagers par des modèles éconergétiques pour réduire votre consommation d'énergie." },
        { title: "Installez des ampoules LED", description: "Remplacez les ampoules traditionnelles par des ampoules LED plus économes en énergie." },
        { title: "Réduisez la consommation d'eau", description: "Économisez l'eau en réparant les fuites, en installant des toilettes à faible débit et en prenant des douches plus courtes." },
        { title: "Recyclez et réutilisez", description: "Recyclez les matériaux comme le papier, le plastique et le verre et réutilisez les objets autant que possible." },
        { title: "Achetez des produits locaux et de saison", description: "Réduisez l'empreinte carbone de votre alimentation en choisissant des produits locaux et de saison." },
        { title: "Réduisez la consommation de viande", description: "Diminuez votre consommation de viande pour réduire l'empreinte carbone de votre alimentation." },
        { title: "Privilégiez les aliments biologiques", description: "Optez pour des aliments biologiques qui ont un impact environnemental moindre que les aliments conventionnels." },
        { title: "Évitez le gaspillage alimentaire", description: "Planifiez vos repas, congelez les restes et compostez les déchets alimentaires pour réduire le gaspillage." },
        { title: "Choisissez des vêtements durables", description: "Achetez des vêtements de qualité fabriqués à partir de matériaux durables pour réduire votre empreinte carbone." },
        { title: "Favorisez la seconde main", description: "Achetez des vêtements d'occasion pour réduire la demande de nouveaux vêtements et prolonger leur durée de vie." },
        { title: "Lavez vos vêtements à l'eau froide", description: "Utilisez de l'eau froide pour laver vos vêtements et séchez-les à l'air libre pour réduire votre consommation d'énergie." },
        { title: "Privilégiez les transports écologiques", description: "Optez pour des moyens de transport écologiques comme le train, le métro ou le tramway." },
        { title: "Réduisez votre consommation d'électricité", description: "Éteignez les appareils électriques lorsque vous ne les utilisez pas et investissez dans des sources d'énergie renouvelables." },
        { title: "Adoptez un mode de vie minimaliste", description: "Réduisez votre consommation en choisissant la qualité plutôt que la quantité et en évitant les achats impulsifs." },
        { title: "Investissez dans l'isolation de votre maison", description: "Améliorez l'isolation de votre maison pour réduire votre consommation de chauffage et de climatisation." },
        { title: "Utilisez des produits de nettoyage écologiques", description: "Choisissez des produits de nettoyage écologiques pour réduire les produits chimiques nocifs dans l'environnement." },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Conseils pour Réduire l'Empreinte Carbone</Text>
                {tips.map((tip, index) => (
                    <View key={index} style={styles.tipContainer}>
                        <Text style={styles.tipTitle}>{tip.title}</Text>
                        <Text style={styles.tipDescription}>{tip.description}</Text>
                        {index === 0 && (
                            <TouchableOpacity style={styles.button} onPress={handleScrollToDefinition}>
                                <Text style={styles.buttonText}>Qu'est-ce que l'empreinte carbone ?</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>
            {isDefinitionVisible && (
                <TouchableWithoutFeedback onPress={handleScrollToDefinition}>
                    <View style={styles.overlay}>
                        <Animated.View style={[styles.definitionContainer, { transform: [{ translateX }] }]}>
                            <Text style={styles.definitionTitle}>Qu'est-ce que l'empreinte carbone ?</Text>
                            <Text style={styles.definitionText}>
                                L'empreinte carbone est la quantité totale de gaz à effet de serre émis directement ou indirectement par les activités humaines. Elle est généralement mesurée en tonnes de CO2 équivalent (CO2e).
                            </Text>
                            <Text style={styles.definitionText}>
                                En moyenne, l'empreinte carbone par personne en France est d'environ 11 tonnes de CO2e par an. Cela inclut les émissions liées à l'énergie, aux transports, à l'alimentation, aux biens de consommation et aux services.
                            </Text>
                            <View style={styles.separator}></View>
                            <Text style={styles.definitionTitle}>Statistiques en France</Text>
                            <Text style={styles.definitionText}>
                                - <Text style={styles.definitionCategory}>Alimentation :</Text> Environ 25% de l'empreinte carbone totale, avec la viande représentant une grande part. (~2.75 tonnes de CO2e)
                            </Text>
                            <Text style={styles.definitionText}>
                                - <Text style={styles.definitionCategory}>Transports :</Text> Environ 30%, principalement dus aux véhicules personnels et aux voyages aériens. (~3.3 tonnes de CO2e)
                            </Text>
                            <Text style={styles.definitionText}>
                                - <Text style={styles.definitionCategory}>Logement :</Text> Environ 20%, incluant la consommation d'énergie pour le chauffage et l'électricité. (~2.2 tonnes de CO2e)
                            </Text>
                            <Text style={styles.definitionText}>
                                - <Text style={styles.definitionCategory}>Biens et services :</Text> Environ 25%, comprenant l'achat de vêtements, d'électronique, etc. (~2.75 tonnes de CO2e)
                            </Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#4CAF50',
    },
    tipContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#4CAF50',
    },
    tipDescription: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '77%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    definitionContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#e0f7fa',
        padding: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    definitionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00796B',
    },
    definitionText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    definitionCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00796B',
    },
    separator: {
        height: 1,
        backgroundColor: '#00796B',
        marginVertical: 15,
    },
});

export default CarbonFootprintTips;
