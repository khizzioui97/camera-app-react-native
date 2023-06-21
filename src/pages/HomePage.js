import React, { forwardRef } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Custom_camera from '../components/Custom_camera';

export function getData() {
  console.log("test");
  const query = "https://www.flickr.com/services/feeds/photos_public.gne?tags=soccer&format=json&nojsoncallback=1";

  fetch(query)
    .then(response => response.json())
    .then(data => {
      let title = "";
      data.items.forEach(item => {
        title = item.title;
      });
      console.log(title);
      Toast.show({
        type: 'success',
        text1: 'Data Retrieved',
        text2: title,
      });
    })
    .catch(error => {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to retrieve data',
      });
    });
}


const HomePage = forwardRef((props, ref) => {
  return (
    <View style={styles.container}>
      <Text style={styles.square}>Welcome Home!</Text>
      <Button title='click me' onPress={<Custom_camera/>} />
      <Button title='Camera' onPress={Custom_camera} />
      <Toast ref={ref} />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    lineHeight: 100,
  },
});

export default HomePage;
