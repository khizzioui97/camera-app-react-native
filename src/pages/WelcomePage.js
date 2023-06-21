import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

function WelcomePage({ navigation }) {
  useEffect(() => {
    // Wait for 3 seconds and navigate to the Home page
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 50, fontWeight: 'bold',}}>LOGO</Text>
    </View>
  );
}

export default WelcomePage;