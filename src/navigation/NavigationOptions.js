import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Options from '../screen/Options';

export default function NavigationOptions() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Options'>
			<Stack.Screen
				name='Options'
				component={Options}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
    )
}