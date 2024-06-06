
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

export const Profile = () => {
    return (
        <View style={styles.profileContainer}>
            <Text>your username goes here</Text>
            <Text>your email</Text>
            <Text>other profile stuffs would go into this page...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: SIZES.large,
    }
})