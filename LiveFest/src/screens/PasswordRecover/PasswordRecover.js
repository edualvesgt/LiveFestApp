import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, ButtonTitle, Container, ContainerBrokenKey, Input, Label, StyledInput, Title } from './Styles'; // Importando o Button e ButtonTitle de Styles
import BrokenKey from '../../components/Icons/BrokenKey';
import api from '../../service/service';

export const PasswordRecover = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePress = () => {
        navigation.replace("EmailVerification", { userEmail: email });
    };

    async function SendEmail() {
        setLoading(true);
        try {
            const response = await api.post(`/RecoveryPassword?email=${email}`);
            console.log(response.data);
            if (response.status === 200) {
                handlePress();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Title>Esqueceu a senha?</Title>

            <ContainerBrokenKey>
                <BrokenKey size={250} />
            </ContainerBrokenKey>

            <Input>
                <Label>Email</Label>
                <StyledInput
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </Input>

            <Button onPress={() => !loading && SendEmail()} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <ButtonTitle>Recuperar minha senha</ButtonTitle>
                )}
            </Button>
        </Container>
    );
};
