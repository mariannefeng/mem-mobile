import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Auth, Storage } from 'aws-amplify';
import { Button, BigText } from '../../shared/Button';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { API_URL } from '../../../constants';

const DISABLE_S3 = process.env.EXPO_PUBLIC_DISABLE_S3;

export const CreateEntryImage = ({ navigation }) => {

    const [uploading, setUploading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            aspect: [4, 3],
            quality: 1,
        });

        this.handleImagePicked(result);
    };

    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    handleImagePicked = async (pickerResult) => {
        try {
            if (pickerResult.cancelled) {
                setUploading(false);

                // TODO: fix the error that appears when you cancel
                return;
            } else {
                console.log('pic', pickerResult);
                const imageUri = pickerResult.assets[0].uri;

                setPercentage(0);
                const img = await fetchImageFromUri(imageUri);
                var randomFileName = Math.random().toString(36).slice(2)

                switch (pickerResult.assets[0].mimeType) {
                    case "image/png":
                        randomFileName += ".png";
                        break;
                    case "image/jpeg":
                        randomFileName += ".jpg";
                        break;
                }

                setUploading(true);

                // if s3 is disabled, write local file path to server
                if (DISABLE_S3 == 'true') {
                    try {
                        const options = {
                            method: 'POST',
                            url: `${API_URL}/books/1/entries`,
                            data: {
                                type: img.data.type,
                                content: imageUri,
                            }
                        };
                        const response = await axios.request(options);
                        console.log('resp data', response.data);
                        setUploading(false);

                        navigation.dispatch(StackActions.popToTop());
                    } catch (e) {
                        console.log('error creating entry', e);
                    } finally {
                        setUploading(false);
                    }
                } else {
                    // else upload to s3
                    uploadImage(randomFileName, img, imageUri);
                }
            }
        } catch (e) {
            console.log('err in handleImagePicked', e);
        }
    };

    uploadImage = (filename, img, localUri) => {
        Auth.currentCredentials();

        return Storage.put(filename, img, {
            resumable: true,
            progressCallback(progress) {
                setPercentage(parseInt((progress.loaded / progress.total) * 100));
            },
            completeCallback: async (resp) => {
                console.log('resp', resp);
                setUploading(true);

                try {
                    const options = {
                        method: 'POST',
                        url: `${API_URL}/books/1/entries`,
                        data: {
                            type: img.data.type,
                            content: localUri,
                            key: resp.key,
                        }
                    };
                    const response = await axios.request(options);
                    console.log('resp data', response.data);
                    setUploading(false);

                    navigation.dispatch(StackActions.popToTop());
                } catch (e) {
                    console.log('error creating entry', e);
                } finally {
                    setUploading(false);
                }
            },
            errorCallback: (err) => {
                console.log('error in try catch of storage.put', err);
                setUploading(false);
            },
        })
    };

    return (
        <View style={styles.pressWrapper}>
            {!uploading && <Button displayText="press me to choose and upload" onPress={pickImage} disabled={uploading} />}
            {uploading && percentage > 0 && <BigText>{percentage}%</BigText>}
        </View>
    )
}

const styles = StyleSheet.create({
    pressWrapper: {
        flex: 1,
        justifyContent: 'center',
    }
}); 