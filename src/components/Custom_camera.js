import React,{useState,useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Camera,CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Custom_Button from '../components/Custom_Button';

export default function Custom_camera() {
  const [hasCameraPermession,setHasCameraPermission]=useState(null);
  const [image,setImage]=useState(null);
  const [type,setType]=useState(Camera.Constants.Type.back);
  const [flash,setFlash]= useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  useEffect(()=>{
  (async ()=>{
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
  })();
  },[])


  const takePicture=async () =>{
    if(cameraRef)
    {
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      }catch(e){
        console.log(e);
      }
    }
  }

  const saveImage = async () => {
    if(image){
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('picture save !!');
        setImage(null);
      } catch (e) {
        console.log(e)
      }
    }
  }
  if(hasCameraPermession===false)
    return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {!image?
      <Camera
      ratio='16:9'
      style={styles.camera}
      type={type}
      flashMode={flash}
      ref={cameraRef}
      >
        <StatusBar hidden={true} />
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingLeft:35,
          paddingRight:35,
          paddingTop:0,

        }}>
          <Custom_Button icon={"retweet"} onPress={() => {
            setType(type===CameraType.back
              ?CameraType.front
              :CameraType.back)
          }}/>
          <Custom_Button icon={"flashlight"} onPress={() => {
            setFlash(flash===Camera.Constants.FlashMode.off
              ?Camera.Constants.FlashMode.on
              :Camera.Constants.FlashMode.off)
          }} />

        </View>
      </Camera>:

        <Image source={{uri:image}} style={styles.camera}/>

      }
      <View>
        {image?
        <View style={{
          flexDirection:'row',
          justifyContent:"space-between",
          paddingHorizontal:50,
        }}>
          <Custom_Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
          <Custom_Button title={"send"} icon="check" onPress={saveImage}/>

        </View>:
        <Custom_Button title={'take a picture'} icon="camera" onPress={takePicture}/>}
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom:15
  },
  camera:{
    flex:1,
    borderRadius:20,
  }
});
