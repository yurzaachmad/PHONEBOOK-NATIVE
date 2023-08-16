import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, View, Text} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const Avatar = ({route, navigation}) => {
  const [Picture, setPicture] = useState(null);
  const {studentId, setAvatar} = route.params;
  const dispatch = useDispatch();
  const openCamera = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(option, res => {
      if (res.didCancel) {
        console.log('User canceled image picker');
      } else if (res.errorCode) {
        console.log('Image picker error:', res.errorMessage);
      } else {
        const data = res.assets[0];
        setPicture(data);
        setAvatar(data);
        dispatch(updateAvatar(data.uri)); // Call the returned function with dispatch
        navigation.navigate('Home');
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const data = response.assets[0];
        setPicture(data);
        setAvatar(data);
        dispatch(updateAvatar(data.uri)); // Call the returned function with dispatch
        navigation.navigate('Home');
      }
    });
  };

  const updateAvatar = imagePath => dispatch => {
    const id = studentId;
    const formData = new FormData();
    formData.append('avatar', {
      uri: imagePath,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    axios
      .put(`http://192.168.1.25:3001/api/phonebooks/${id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        // dispatch(updateAvatarSuccess(response.data));
        console.log('Upload success', response.data);
      })
      .catch(e => {
        console.log('Axios error', e);
        alert('update avatar gagal');
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {Picture != null && (
        <Image
          source={{uri: Picture.uri}}
          style={{height: 100, width: 100}}></Image>
      )}
      <View style={{flexDirection: 'row'}}>
        <View>
          <Pressable
            onPress={openImagePicker}
            style={{padding: 10, margin: 10, backgroundColor: 'skyblue'}}>
            <Text style={{color: 'black'}}>Open Galery</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={requestCameraPermission}
            style={{padding: 10, margin: 10, backgroundColor: 'skyblue'}}>
            <Text style={{color: 'black'}}>Open Camera</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Avatar;
