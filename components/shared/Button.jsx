import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

export const Button = ({ onPress, displayText, disabled }) => (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}>
        <Text>{displayText}</Text>
    </TouchableOpacity>
)

export const BigText = ({ children }) => (
    <Text style={styles.bigText}>{children}</Text>
)

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        marginBottom: SIZES.small,
        marginHorizontal: SIZES.small,
        paddingVertical: SIZES.xxLarge,
        borderRadius: SIZES.xSmall,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    bigText: {
        fontSize: SIZES.xLarge,
        marginVertical: SIZES.large,
        textAlign: "center",
    }
});