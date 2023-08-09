import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import StarsCommentsLimpiezaCheck from './StarsCommentsLimpiezaCheck';

const BottomSheetOpinion = () => {
  const bottomSheetRef = useRef(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const openBottomSheet = () => {
    setIsButtonVisible(false); // Oculta el botón cuando el Bottom Sheet se abre
    bottomSheetRef.current.expand();
  };

  const closeBottomSheet = () => {
    setIsButtonVisible(true); // Muestra el botón cuando el Bottom Sheet se cierra
    bottomSheetRef.current.close();
  };

  return (
    <View style={styles.container}>
      {isButtonVisible && (
        <TouchableOpacity style={styles.button} onPress={openBottomSheet}>
          <Text style={styles.buttonText}>Evaluar Limpieza</Text>
        </TouchableOpacity>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%', '100%']}
        enablePanDownToClose={true}
        animateOnMount={true}
        onClose={closeBottomSheet} // Agrega un manejador para el evento de cierre
      >
        <View style={styles.sheetContainer}>
          <View style={styles.containerSvg}>
            <Image
              source={require('../assets/kaax.png')}
              style={{ width: 70, height: 70, left: 8 }}
            />
            <Text>Nombre de usuario</Text>
            <StarsCommentsLimpiezaCheck />
          </View>

          
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSvg: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 260,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006E90',
    color: '#090808',
    marginTop: -180,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  sheetContainer: {
    backgroundColor: 'white',
    padding: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  closeButton: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});
export default BottomSheetOpinion;