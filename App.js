import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './src/screen/LoginForm';
import ButtonLogin from './src/components/ButtonLogin';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation/NavigationStack';
import NavigationTab from './src/navigation/NavigationTab';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<NavigationStack />
			{/* <NavigationTab/> */}
			</AuthProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F4F4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 0,
	},
	loginFormContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
