import React, { useState } from 'react';
import { Button, ButtonTitle, Container, ContainerBrokenKey, ContainerPadlock, ContentAccount, Input, Label, LinkBold, StyledInput, Subitle, TextContentAccount, Title } from './Styles';
import BrokenKey from '../../components/Icons/BrokenKey';
import Padlock from '../../components/Icons/Padlock';

// Definição do componente de criação de conta
export const PasswordResetSuccessful = ({ navigation }) => {
   
    // Função para redirecionar para a tela de login
    async function RedirectToSignUp() {
        navigation.replace("Home");
    }
    return (
        <Container>
            <Title>Senha atualizada!</Title>


            <ContainerPadlock>
                     <Padlock size={200} />
            </ContainerPadlock>
            
            
            <Subitle>Parabéns! Você redefiniu sua senha com sucesso. </Subitle>
        
    
            <Button onPress={RedirectToSignUp}>
                <ButtonTitle>Voltar para o início</ButtonTitle>
            </Button>

        </Container>
    );
};
