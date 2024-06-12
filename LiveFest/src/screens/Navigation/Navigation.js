import { Button, View } from "react-native";

export  const Navigation = ({navigation}) => {

return(

    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}> 
        <Button
            title="Login"
            onPress={() => navigation.replace
            ("Login")}
        />
        <Button
            title="CreateAccount"
            onPress={() => navigation.replace
            ("CreateAccount")}
        />
        <Button
            title="RegistrationSuccessful"
            onPress={() => navigation.replace
            ("RegistrationSuccessful")}
        />
        
        <Button
            title="PasswordRecover"
            onPress={() => navigation.replace
            ("PasswordRecover")}
        />
        <Button
            title="EmailVerification"
            onPress={() => navigation.replace
            ("EmailVerification")}
        />
        <Button
            title="PasswordResetSuccessful"
            onPress={() => navigation.replace
            ("PasswordResetSuccessful")}
        />
        <Button
            title="VerificationCode"
            onPress={() => navigation.replace
            ("VerificationCode")}
        />
        <Button
            title="PasswordReset"
            // onPress={() => navigation.navigate
            onPress={() => navigation.replace
            ("PasswordReset")}
        />
        
    </View>


);

}