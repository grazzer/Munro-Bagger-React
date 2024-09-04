import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyClimbsScreen from "../screens/MyClimbsScreen";


const Stack = createNativeStackNavigator();

export default function MyClimbsLS() {
    
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
          }}
        initialRouteName="MyClimbsScreen">
            <Stack.Screen name="MyClimbsScreen" component={MyClimbsScreen} />
        </Stack.Navigator>
      );

}