import React from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';


const height = Dimensions.get('window').height;
export default function HomeLogado({ route, navigation }) {
    let behavior = '';
    if (Platform === 'ios') {
        behavior = 'padding';
    }
    const { userName } = route.params;
    const navigateToScreen = (type) => {
        navigation.navigate('Map', {
            tipoUsina: type,
          })    
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            enabled
            behavior={behavior}
            keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.textView}>
                    <Text style={styles.txtTitle}>Bem vindo, {userName}!</Text>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => navigateToScreen('papel')} style={styles.btn}>
                        <Icon name="recycle" type="font-awesome" color="#282828" />
                        <Text style={styles.appButtonText}>Papel</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => navigateToScreen('plástico')} style={styles.btn}>
                        <Icon name="recycle" type="font-awesome" color="#282828" />
                        <Text style={styles.appButtonText}>Plástico</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => navigateToScreen('metal')} style={styles.btn}>
                        {/* <Icon recycle/> */}
                        <Icon name="recycle" type="font-awesome" color="#282828" />
                        <Text style={styles.appButtonText}>Metal</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={() => navigateToScreen('vidro')} style={styles.btn}>
                        <Icon name="recycle" type="font-awesome" color="#282828" />
                        <Text style={styles.appButtonText}>Vidro</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 20,
    },
    buttonView: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '4%',

    },
    imageView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    textView: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '15%', 
    },
    txtTitle: {
        fontWeight: 'bold',
        color: '#282828',
        fontSize: 24,
    },
    btn: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#14E075',
        width: '50%',
        padding: 10,
    },
    appButtonText: {
        fontWeight: 'bold',
        color: '#282828',
        fontSize: 18,
    }
});