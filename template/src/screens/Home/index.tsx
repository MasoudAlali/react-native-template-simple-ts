import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salam</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {},
});

export default Home;
