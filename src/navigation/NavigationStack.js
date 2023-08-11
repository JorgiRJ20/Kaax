import NavigationTab from './NavigationTab';
import Notificaciones from '../screen/Notificaciones';
import Solicitudes from '../screen/Solicitudes';
import CrearCuenta from '../screen/CrearCuenta';
import OlvidasteContrasena from '../screen/OlvidasteContrasena';
import LimpiezaCheck from '../screen/LimpiezaCheck'
import PublicacionesCard from '../components/PublicacionesCard';
import DetallePublicacion from '../components/DetallePublicacion';
import CrearPublicacion from '../screen/CrearPublicacion';
import MyLocations from '../screen/MyLocations';
import AddLocation from '../screen/AddLocation';
import ApiPublicacion from '../api/ApiPublicacion';
import ApiPublicacionLim from '../api/ApiPublicacionLim';
import ApiDirecciones from '../api/ApiDirecciones'
import DetallePublicacionLim from '../components/PublicacionesLim/DetallePublicacionLim';
import DetalleDirecciones from '../components/DetalleDirecciones';
import DireccionesList from '../components/DireccionesList';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../screen/LoginForm';

export default function NavigationStack() {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen
				name='Login'
				component={LoginForm}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Tab'
				component={NavigationTab}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='Notificaciones'
				component={Notificaciones}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='Solicitudes'
				component={Solicitudes}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='CrearCuenta'
				component={CrearCuenta}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='LimpiezaCheck'
				component={LimpiezaCheck}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='OlvidasteContrasena'
				component={OlvidasteContrasena}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>

            <Stack.Screen
				name='PublicacionesCard'
				component={PublicacionesCard}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='DetallePublicacion'
				component={DetallePublicacion}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='DetallePublicacionLim'
				component={DetallePublicacionLim}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='DetalleDirecciones'
				component={DetalleDirecciones}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='DireccionesList'
				component={DireccionesList}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			
			<Stack.Screen
				name='MyLocations'
				component={MyLocations}
				options={{ headerTitle: 'Mis lugares de limpieza' }}
			/>
			<Stack.Screen
				name='AddLocation'
				component={AddLocation}
				options={{ headerShown: false }}
			/>
			 <Stack.Screen
          name='ApiPublicacion'
          component={ApiPublicacion}
          options={{
            title:'',
            headerTransparent: true,
          }}
        />
		 <Stack.Screen
          name='ApiPublicacionLim'
          component={ApiPublicacionLim}
          options={{
            title:'',
            headerTransparent: true,
          }}
        />
		<Stack.Screen
          name='ApiDirecciones'
          component={ApiDirecciones}
          options={{
            title:'',
            headerTransparent: true,
          }}
        />
		<Stack.Screen
          name='CrearPublicacion'
          component={CrearPublicacion}
          options={{
            title:''
          }}
        />
		</Stack.Navigator>
	);
}
