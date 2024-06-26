import { View, StyleSheet } from 'react-native';
import { SIZES } from '../../constants';
import { Button, BigText } from '../shared/Button';

export const CreateEntry = ({ navigation }) => {
    return (
        <View>
            <View style={styles.headerWrapper}>
                <BigText>whatcha wanna add</BigText>
            </View>

            <View>
                <Button onPress={() => { navigation.navigate('CreateEntryText') }} displayText='text' />
                <Button onPress={() => { navigation.navigate('CreateEntryImage') }} displayText='picture' />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: SIZES.xLarge,
        marginVertical: SIZES.large,
    },
    headerWrapper: {
        alignItems: "center",
        margin: "10px"
    }
})