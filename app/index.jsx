import { useEffect } from "react";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Create } from '../components/Create';
import { CreateText } from '../components/Create/CreateText';
import { CreateImage } from '../components/Create/CreateImage';
import { ViewFeed } from '../components/ViewFeed';
import { Profile } from '../components/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Amplify } from 'aws-amplify';

import Ionicons from '@expo/vector-icons/Ionicons';

import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

const CreateStackScreen = () => {
    const CreateStack = createNativeStackNavigator();

    return (
        <CreateStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <CreateStack.Screen name="Create" component={Create} />
            <CreateStack.Screen name="CreateText" component={CreateText} />
            <CreateStack.Screen name="CreateImage" component={CreateImage} />
        </CreateStack.Navigator>
    )
}

export default function App() {
    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const cameraRollStatus =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (cameraRollStatus.status !== "granted") {
                    alert("Sorry, we need these permissions to make this work!");
                }
            }
        })();
    }, []);

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#000',
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'CreateStack':
                            iconName = focused ? 'flower' : 'flower-outline';
                            break;
                        case 'View':
                            iconName = focused ? 'leaf' : 'leaf-outline';
                            break;
                        case 'Me':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} />;
                },
            })}
        >
            <Tab.Screen options={{
                title: "Create",
            }} name="CreateStack" component={CreateStackScreen} />
            <Tab.Screen options={{
                title: "Reminisce"
            }} name="View" component={ViewFeed} />
            <Tab.Screen options={{
                title: "Me"
            }} name="Me" component={Profile} />
        </Tab.Navigator>
    );
}