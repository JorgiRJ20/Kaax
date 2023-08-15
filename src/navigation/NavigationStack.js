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
import EditarPublicacion from '../screen/EditarPublicacion';
import { createStackNavigator } from '@react-navigation/stack';
import SolicitudesTrabajo from '../screen/SolicitudesTrabajo';
import LoginForm from '../screen/LoginForm';
import DetallePostulacion from '../screen/DetallePostulacion';
import MiPerfil from '../screen/MiPerfil';


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
				name='SolicitudesTrabajo'
				component={SolicitudesTrabajo}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='Solicitudes'
				component={SolicitudesTrabajo}
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
				options={{title: "Detalle de publicación"}}
				component={DetallePublicacion}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='DetallePublicacionLim'
				options={{title: "Detalle de publicación"}}
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
				options={{ headerTitle: 'Mis lugares de limpieza'}}
			/>
			<Stack.Screen
				name='DetallePostulacion'
				component={DetallePostulacion}
				options={{ headerTitle: 'DetPos'}}
			/>
			<Stack.Screen
				name='AddLocation'
				component={AddLocation}
				options={{ headerShown: false }}
			/>
				<Stack.Screen
				name='MiPerfil'
				component={MiPerfil}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			
			 <Stack.Screen
          name='ApiPublicacion'
          component={ApiPublicacion}
          options={{
            title:'',
            headerTransparent: true,
			headerShown: false
          }}
        />
		 <Stack.Screen
          name='ApiPublicacionLim'
          component={ApiPublicacionLim}
          options={{
            title:'',
            headerTransparent: true,
			headerShown: false
          }}
        />
		<Stack.Screen
          name='ApiDirecciones'
          component={ApiDirecciones}
          options={{
            title:'Mis direcciones',
            headerTransparent: false,
          }}
        />
		<Stack.Screen
          name='CrearPublicacion'
          component={CrearPublicacion}
          options={{
            title:''
          }}
        />
		<Stack.Screen
          name='EditarPublicacion'
          component={EditarPublicacion}
          options={{
            title:''
          }}
        />
		</Stack.Navigator>
	);
}
