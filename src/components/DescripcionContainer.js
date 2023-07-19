import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DescripcionContainer = ({ descripcion }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.descripcion}>{descripcion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginVertical: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#333',
  },
});

export default DescripcionContainer;
