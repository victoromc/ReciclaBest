import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import KeysInfo from '../Utils/KeysInfo';
import * as Location from 'expo-location';


const height = Dimensions.get('window').height;
export default function Map({route, navigation }) {

    const [position, setPosition] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [count, setCount] = useState(0);
    const [usinas, setUsinas] = useState(null);

    const { tipoUsina } = route.params;
    useEffect(() => {
        if (count == 0) {
            setCount(1);
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Localização!', 'Precisamos da sua permissão para capturar a sua localização atual.');
                    setErrorMsg('Permission to access location was denied');
                }
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                setPosition(location);
            })();
        }

    });

    useEffect(() => {
        if (position && count == 1) {
            setCount(2);
            console.log('tipo usina');
            console.log(tipoUsina);
            (async () => {
                // let material = 'plástico';
                let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=usina+de+reciclagem+de+' + tipoUsina + '&';
                //let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=usina+de+reciclagem+de+' + material + '&';
                let endPoint = url + '&location' + position.coords.latitude + ',' + position.coords.longitude + '&radius=5000&key=' + KeysInfo.getGooglePlacesKey();
                const response = await fetch(endPoint);
                const data = await response.json();
                setUsinas(data.results);
            })();
        }
    }, [position]);

    let mapRender = null;
    if (mapRender === null) {
        mapRender = (
            <Text> Waiting ... </Text>
        );
    }
    if (errorMsg) {
        mapRender = (
            <Text> {errorMsg}</Text>
        );
    }
    if (position) {
        mapRender = (
            <MapView
                // showsUserLocation
                style={styles.mapFullScreen}
                initialRegion={{
                    latitude: position.coords.latitude, longitude: position.coords.longitude,
                    latitudeDelta: 0.5500,
                    longitudeDelta: 0.5500
                }}
            >
                <Marker coordinate={{ latitude: position.coords.latitude, longitude: position.coords.longitude }}
                    title={'Você está aqui'}
                />

            </MapView>
        );
    }
    if (position && usinas) {
        mapRender = (
            <MapView
                // showsUserLocation
                style={styles.mapFullScreen}
                initialRegion={{
                    latitude: position.coords.latitude, longitude: position.coords.longitude,
                    latitudeDelta: 0.3500,
                    longitudeDelta: 0.3500
                }}
            >
                <Marker coordinate={{ latitude: position.coords.latitude, longitude: position.coords.longitude }}
                    title={'Você está aqui'}
                />
                {usinas.map(usina => (
                    <Marker key={Math.random()} coordinate={{ latitude: usina.geometry.location.lat, longitude: usina.geometry.location.lng }}
                        title={usina.name}
                        description={usina.formatted_address}
                        pinColor={'blue'}

                    />
                ))}
            </MapView>
        );
    }

    return (
        <View style={styles.container}>
            {mapRender}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'column',
    },
    mapFullScreen: {
        height: height,
    },
});