import {View, Text, StatusBar, StyleSheet, PermissionsAndroid, CameraRoll} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';

const HomeScreen = ({navigation}) => {

    const [nodes, getNodes] = useState();

    useEffect(() => {
      checkPermission()
      .then(() => {
        getPhotos()
      })
    }, [])
    

    const checkPermission  = async () => {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (hasPermission) {
            return true
        }

        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
            title: "Camera App",
            message: "Camera App needs your permission to access your photos",
            buttonPositive: "Yes"
        });

        return status === 'granted';
    }
    const openCam = () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
        });
      }
    
      const openGallery = () => {
        ImagePicker.openPicker({
          multiple: true
        }).then(images => {
          console.log(images);
        });
      }

      const getPhotos = async() => {
        const photos = await CameraRoll.getPhotos({
            first: 10
        })
        }

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 20}}> Open Camera</Text>
      <StatusBar backgroundColor="white" />
      <View style={{marginTop: 10}}>
        <Button
          icon="camera"
          mode="contained"
          onPress={openCam}>
          Camera
        </Button>
      </View>
      <Text style={{color: 'black', fontSize: 20, marginTop: 20}}> Open Gallery</Text>
      <View style={{marginTop: 10}}>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate('Display')}>
          Gallery
        </Button>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})