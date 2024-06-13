import React, { useState } from 'react';
import { Button, ButtonTitle, Container, ContainerBrokenKey, ContainerSmartphone, ContentAccount, Input, Label, LinkBold, StyledInput, Subitle, TextContentAccount, Title } from './Styles';

import Smartphone from '../../components/Icons/Smartphone';

// Definição do componente de criação de conta
export const EmailVerification= ({ navigation, route }) => {

    // Obtém o email da rota
    const { userEmail } = route.params;

    // Verifica se o email foi recebido corretamente
    console.log("Email recebido:", userEmail);

    const RedirectVerificationCode = () => {
        // Navega para a tela final passando o email
        // navigation.navigate("VerificationCode", { userEmail });
        navigation.replace("VerificationCode", { userEmail });
    };

    return (
        <Container>
            
            <ContainerSmartphone>
                     <Smartphone size={250} />
            </ContainerSmartphone>
            
            <Subitle>Enviamos uma verificação link para seu e-mail </Subitle>
        
            <Button onPress={RedirectVerificationCode}>
                <ButtonTitle>Validar código </ButtonTitle>
            </Button>

        </Container>
    );
};
