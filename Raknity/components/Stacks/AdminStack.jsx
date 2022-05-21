import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHome from "../adminPages/AdminHome";
import BanUser from "../adminPages/BanUser";
import EditUser from "../adminPages/EditUser";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={AdminHome}
          options={{
            headerStyle: {
              backgroundColor: "#151e3d",
            },
            headerTintColor: "#3ded97",
          }}
        />
        <Stack.Screen
          name="Ban user"
          component={BanUser}
          options={{
            headerStyle: {
              backgroundColor: "#151e3d",
            },
            headerTintColor: "#3ded97",
          }}
        />
        <Stack.Screen
          name="edit user"
          component={EditUser}
          options={{
            headerStyle: {
              backgroundColor: "#151e3d",
            },
            headerTintColor: "#3ded97",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
