import React, { useState } from 'react';
import { Button, ButtonTitle, Container, ContainerBrokenKey, ContentAccount, Input, Label, LinkBold, StyledInput, TextContentAccount, Title } from './Styles';
import BrokenKey from '../../components/Icons/BrokenKey';
import api from '../../service/service';

// Definição do componente de recuperação de senha
export const PasswordRecover = ({ navigation }) => {
    const [email, setEmail] = useState('');    // inicia o estado do email como uma string vazia.

    const handlePress = () => {
        // Navega para a próxima página e passa o email como parâmetro
        navigation.replace("EmailVerification", { userEmail: email });         //é chamado na função handlePress, que é acionada quando o botão é pressionado.
    };

    async function SendEmail() {
        try {
            const response = await api.post(`/RecoveryPassword?email=${email}`)
            console.log(response.data);
            if (response.status == 200) {

                handlePress()
            }
        } catch (error) {
            console.log(error);
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
                    value={email}                                  //vincula o valor do input ao estado email.
                    onChangeText={(text) => setEmail(text)}        //atualiza o estado email toda vez que o usuário digita algo.
                />
            </Input>

            <Button onPress={() => SendEmail()}>
                <ButtonTitle>Recuperar minha senha</ButtonTitle>
            </Button>
        </Container>
    );
};
