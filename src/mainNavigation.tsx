import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC, useEffect, } from 'react';
import { View, Image, Text, ProgressBarAndroid, Button } from 'react-native';
const Stack = createStackNavigator();
import TrackPlayer, { Capability, State, useProgress } from 'react-native-track-player';
import { saveFileToTemp, track1 } from './helper/FileHelper';

const MyPlayerBar = () => {
    const progress = useProgress();
    return (
        <View>
            <Text>{(progress.position.toFixed())}</Text>
            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress.position}
                style={{ marginTop: 20, width: 300 }}
            />
        </View>
    );
}

const PlayButton = () => {
    return (
        <Button
            title={'Play'}
            onPress={async () => {
                const state = await TrackPlayer.getState();
                if (state === State.Playing) {
                    TrackPlayer.pause()
                } else {
                    TrackPlayer.play();
                }
            }}
        />
    )
}

function HomeScreen() {

    useEffect(() => {
        startPlayer()
    }, [])

    const startPlayer = async () => {
        await TrackPlayer.setupPlayer()
        TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause],
        });

        await TrackPlayer.add([track1]);
        TrackPlayer.play();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Song Name</Text>
            <PlayButton />
            <MyPlayerBar />
        </View>
    );
}

export const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                title: "Player",
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 22
                }
            }}>
                <Stack.Screen
                    name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
