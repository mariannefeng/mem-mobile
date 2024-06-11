import { TouchableWithoutFeedback, Keyboard, View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { COLORS, SIZES, API_URL } from '../../../constants';
import { Button, BigText } from '../../shared/Button';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

export const CreateEntryText = ({ navigation }) => {
    const [memText, setMemText] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }} accessible={false}>
            <View style={styles.createContainer}>
                {!loading && <>
                    <BigText>type away</BigText>
                    <View style={styles.inputWrapper}>
                        <TextInput onChangeText={setMemText} />
                    </View>
                    <Button
                        displayText='ship it'
                        onPress={async () => {
                            if (memText != '') {
                                try {
                                    const options = {
                                        method: 'POST',
                                        url: `${API_URL}/books/1/entries`,
                                        data: {
                                            type: 'text',
                                            content: memText,
                                        }
                                    };
                                    setLoading(true);
                                    const response = await axios.request(options);

                                    console.log(response);
                                    setLoading(false);

                                    navigation.dispatch(StackActions.popToTop());
                                } catch (error) {
                                    console.log('error creating entry', error);
                                } finally {
                                    setLoading(false);
                                }
                            }
                        }}
                    />
                </>}
                {loading && <BigText>loading...</BigText>}

            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    createContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: SIZES.large,
    },
    inputWrapper: {
        marginHorizontal: SIZES.medium,
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        marginBottom: SIZES.large,
    }
})