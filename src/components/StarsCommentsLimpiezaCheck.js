
import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StarsCommentsLimpiezaCheck() {
    const [rating, setRating] = useState(0);

    const handleRating = (selectedRating) => {
      setRating(selectedRating);
    };
      return (
          <View style={styles.container}>
            <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.starButton}
                onPress={() => handleRating(item)}
              >
                <FontAwesome
                  name={item <= rating ? 'star' : 'star-o'}
                  size={30}
                  color={item <= rating ? '#ffc107' : '#bbb'}
                />
              </TouchableOpacity>
            ))}
          </View>
                      
      <TextInput
              placeholder='Escribir comentario...'
              style={styles.input}
              autoCapitalize='none'
        />
  
         
          
          <TouchableOpacity style={styles.buttonSi}>
              <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
         
        </View>
      );
  }
  
  const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:1,
      },
      fotoPerfil:{
          width: 250, height: 250, left:8, borderColor: 'white', borderWidth:7, borderRadius:180
      },
      input:{
          height:80,
          margin:5,
          width:350,
          backgroundColor:'#ECECEC',
          borderRadius:5,
          padding:10,
          marginTop:5,
          paddingStart:20
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      starsContainer: {
        flexDirection: 'row',
      },
      starButton: {
        padding: 8,
      },
      ratingText: {
        fontSize: 18,
        marginTop: 16,
      },
      buttonSi: {
          width: 160,
          height: 30,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F18F01',
          color: '#090808',
          marginTop: 5,
      },
      buttonNo: {
          width: 260,
          height: 60,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#006E90',
          color: '#090808',
          marginTop: 10,
      },
      buttonText: {
          color: '#fff',
          fontSize: 22,
          fontWeight: 'bold',
      },
    });