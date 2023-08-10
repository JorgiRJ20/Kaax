import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Swiper} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
//import CardComentario from '../components/CardCoemntario'
import ComentariosCard from '../components/ComentariosCard'
import useAuth from '../hooks/useAuth';


export default function MiPerfil() {
	const { auth, logout } = useAuth();

	const [rating, setRating] = useState(4);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

	return (
		<View style={styles.container}>
					<Image  style={styles.fotoPerfil}
			 source={{url:auth.userImage}}
		 />	
		<Text style={styles.title}>{auth.name}</Text>
	  <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.starButton}>
            <FontAwesome
              name={item <= rating ? 'star' : 'star-o'}
              size={40}
              color={item <= rating ? '#ffc107' : '#bbb'}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity><View style={styles.input2}><FontAwesome style={styles.icono2} name='folder'></FontAwesome><Text  style={styles.inputText2}>  Trabajos</Text></View></TouchableOpacity>
    <View style={styles.input}><FontAwesome style={styles.icono} name='phone'></FontAwesome><Text  style={styles.inputText}>  {auth.phone}</Text></View> 
  <View style={styles.input}><FontAwesome style={styles.icono} name='envelope'></FontAwesome><Text  style={styles.inputText}>   {auth.email}</Text></View> 
 <ComentariosCard></ComentariosCard>
      
  </View>
	);
}

const styles = StyleSheet.create({
	container: {
	  alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor:'#FFF',
    width:'100%',
    height:'100%',
  },
	fotoPerfil:{
		width: 200, height: 200, borderColor: '#ECECEC', borderWidth:7, borderRadius:180, marginTop:50
	},
	input:{
        height:50,
        margin:10,
        width:300,
        backgroundColor:'#ECECEC',
        borderRadius:30,
        padding:10,
        marginTop:10,
        paddingStart:20,
        flexDirection:'row',
        alignItems:'center'
    },
    input2:{
        height:50,
        margin:10,
        width:300,
        backgroundColor:'#05668D',
        borderRadius:30,
        padding:10,
        marginTop:10,
        paddingStart:20,
        flexDirection:'row',
        alignItems:'center'
    },
    inputText:{
     color:'#05668D',
     fontSize:20,
     fontWeight:'bold'
  },
  inputText2:{
    color:'#FFF',
    fontSize:20,
    fontWeight:'bold'
 },
  icono:{
    color:'#05668D',
    fontSize:30,
    fontWeight:'bold',
 },
 icono2:{
    color:'#FFF',
    fontSize:30,
    fontWeight:'bold',
 },
	title: {
	  fontSize: 30,
	  fontWeight: 'bold',
	  marginBottom: 10,
    color:'#05668D',
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
	buttonText: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold',
	},
 
  });