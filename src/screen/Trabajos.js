import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Card from '../components/SolicitudesCard';
import useAuth  from '../hooks/useAuth';
import { getPostulaciones } from '../api/ApiSolicitud';

export default function Trabajos() {
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
      <Text>No tengo idea</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  cardContainer: {
    marginTop: 16,
  },
});

