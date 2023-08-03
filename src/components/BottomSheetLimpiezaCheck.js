import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

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
          <Text style={styles.buttonText}>Abrir Bottom Sheet</Text>
        </TouchableOpacity>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['25%', '50%', '90%']}
        enablePanDownToClose={true}
        animateOnMount={true}
        onClose={closeBottomSheet} // Agrega un manejador para el evento de cierre
      >
        <View style={styles.content}>
          <Text>Contenido del Bottom Sheet</Text>
          <TouchableOpacity onPress={closeBottomSheet}>
            <Text style={styles.closeButton}>Cerrar Bottom Sheet</Text>
          </TouchableOpacity>
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
  button: {
		width: 260,
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#006E90',
		color: '#090808',
		marginTop: -170,
	},
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  content: {
    padding: 16,
    backgroundColor: 'white',
  },
  closeButton: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});

export default BottomSheetOpinion;

