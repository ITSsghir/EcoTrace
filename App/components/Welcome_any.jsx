import { View, Text, TouchableOpacity } from 'react-native';

const Welcome_any = () => {
    return (
        <View>
            <Text>Welcome</Text>
            <Text>Some Text</Text>
            <TouchableOpacity>
                <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}