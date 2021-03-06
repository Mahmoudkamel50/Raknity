import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHome from "../adminPages/AdminHome";
import BanUser from "../adminPages/BanUser";
import CancelBooking from "../adminPages/CancelBooking";
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
          name="Edit user"
          component={EditUser}
          options={{
            headerStyle: {
              backgroundColor: "#151e3d",
            },
            headerTintColor: "#3ded97",
          }}
        />
        <Stack.Screen
          name="Cancel booking"
          component={CancelBooking}
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
