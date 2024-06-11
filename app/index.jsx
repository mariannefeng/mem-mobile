import { useEffect } from "react";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { CreateEntry } from '../components/CreateEntry';
import { ViewFeed } from '../components/ViewFeed';
import { Profile } from '../components/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Amplify } from 'aws-amplify';

import Ionicons from '@expo/vector-icons/Ionicons';

import amplifyconfig from '../src/amplifyconfiguration.json';
import { Books } from "../components/Books";
import { CreateBook } from "../components/Books/CreateBook";
import { CreateEntryText } from "../components/CreateEntry/CreateEntryText";
import { CreateEntryImage } from "../components/CreateEntry/CreateEntryImage";
Amplify.configure(amplifyconfig);

const CreateEntryStackScreen = () => {
    const CreateStack = createNativeStackNavigator();

    return (
        <CreateStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <CreateStack.Screen name="CreateEntry" component={CreateEntry} />
            <CreateStack.Screen name="CreateEntryText" component={CreateEntryText} />
            <CreateStack.Screen name="CreateEntryImage" component={CreateEntryImage} />
        </CreateStack.Navigator>
    )
}

const BooksStackScreen = () => {
    const CreateStack = createNativeStackNavigator();

    return (
        <CreateStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <CreateStack.Screen name="ViewBooks" component={Books} />
            <CreateStack.Screen name="CreateBook" component={CreateBook} />
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
                        case 'Books':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} />;
                },
            })}
        >
            <Tab.Screen options={{
                title: "Books"
            }} name="Books" component={BooksStackScreen} />
            <Tab.Screen options={{
                title: "Create",
            }} name="CreateStack" component={CreateEntryStackScreen} />
            <Tab.Screen options={{
                title: "Reminisce"
            }} name="View" component={ViewFeed} />
            <Tab.Screen options={{
                title: "Me"
            }} name="Me" component={Profile} />
        </Tab.Navigator>
    );
}