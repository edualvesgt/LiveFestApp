import React, { useState, useEffect } from 'react'; 

import { TouchableOpacity } from 'react-native';
import { Container, ContainerIconConfirmation, ContainerIconGoHome, ContentAccount, LinkBold, TextContentAccount, TextEmail, Title } from '../../screens/RegistrationSuccessful/Styles';
import ConfirmationIcon from '../../components/Icons/Confirmation';
import GoHomeIcon from '../../components/Icons/GoHome';

export const RegistrationSuccessful = ({ navigation, route }) => {
   
    async function RedirectRegister() {
        navigation.replace("CreateAccount", { userEmail: route.params?.userEmail }); 
    }

    async function RedirectToSignUp() {
        navigation.replace("Login")
    }
    
    return (
        <Container>
            <Title>Seu cadastro foi feito com sucesso!</Title>

            <ContainerIconConfirmation>
                <ConfirmationIcon size={200} />
            </ContainerIconConfirmation>

            <ContentAccount>
                <TextContentAccount>
                    Enviamos um e-mail de confirmação para 
                    <TextEmail> {route.params?.userEmail}</TextEmail> {/* Exibe o e-mail recebido */}
                </TextContentAccount>
            </ContentAccount>

        


            <ContainerIconGoHome>
                <TouchableOpacity onPress={RedirectToSignUp}>
                     <GoHomeIcon size={90} />
                 </TouchableOpacity>
            </ContainerIconGoHome>
            
        </Container>
    );
};
