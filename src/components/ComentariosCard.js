import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Card = ({ text, additionalText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{text}</Text>
      <Text style={styles.additionalText}>{additionalText}</Text>
    </View>
  );
};

const ComentariosCard = () => {
  const cardsData = [
    {
      id: 1,
      text: 'Card 1',
      additionalText: 'Excelente servicio',
    },
    {
      id: 2,
      text: 'Card 2',
      additionalText: 'Additional Text 2 that can also be longer without issues.',
    },
    {
      id: 3,
      text: 'Card 2',
      additionalText: 'Additional Text 2 that can also be longer without issues.',
    },
    // Add more cards as needed
  ];

  const handleSwipeLeft = (cardId) => {
    // Lógica cuando se desliza a la izquierda
    console.log(`Card ${cardId} swiped left`);
  };

  const handleSwipeRight = (cardId) => {
    // Lógica cuando se desliza a la derecha
    console.log(`Card ${cardId} swiped right`);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.cardScrollView}>
        {cardsData.map((card) => (
          <Card key={card.id} text={card.text} additionalText={card.additionalText} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  cardScrollView: {
    alignItems: 'center', // Alinea las cards en la parte inferior
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: 200, // Increase card width for longer text
    minHeight: 120, // Ensure the card has a minimum height
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5,
    color:'#05668D',
    fontWeight:'600'
  },
  additionalText: {
    fontSize: 14,
    color: 'black',
  },
});

export default ComentariosCard;