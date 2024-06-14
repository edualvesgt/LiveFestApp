import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import EmailIcon from '../../components/Icons/Email';
import PasswordIcon from '../../components/Icons/Password';
import ShowIcon from '../../components/Icons/Show';
import HideIcon from '../../components/Icons/Hide';
import { Button, ButtonTitle, Container, ContentAccount, IconWrapper, Input, LinkBold, LinkMedium, Logo, StyledInput, TextContentAccount, Title, PasswordInputContainer, ShowHideButton } from '../../screens/Login/Styles';
import ConfirmationIcon from '../../components/Icons/Confirmation';
import api from '../../service/service';

export const Login = ({ navigation }) => {
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [email, setEmail] = useState("gabriel.demetrio5@aluno.senai.br");
    const [password, setPassword] = useState("123456");
    async function RedirectRegister() {
        navigation.replace("CreateAccount")
    }
    async function  RedirectPasswordRecover() {
        navigation.replace("PasswordRecover")
    }


    async function Login() {
        console.log(email);
        console.log(password);
        try {
            const response = await api.post('/login', {
                "email": email,
                "password": password,
            });

            console.log(response.data);
            if (response.status == 200) {
                // Sucesso no login, redirecionar ou armazenar o token
                Alert.alert('Login bem-sucedido');
                console.log("id",{userId : response.data.user.id});
                navigation.replace('Main', {userId : response.data.user.id})
                // navegação ou armazenamento de token aqui
            } else {
                Alert.alert('Erro', 'Credenciais inválidas');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
            console.error(error);
        }
    }

    return (
        <Container>
            <Title>Acessar Conta</Title>

            <Logo source={require("../../../src/assets/logo.png")} />

            <Input>
                <IconWrapper>
                    <EmailIcon color={"#4090FE"} size={17} />
                </IconWrapper>
                <StyledInput
                    value={email}
                    onChangeText={txt => setEmail(txt)}
                    placeholder="E-mail" />
            </Input>

            <Input>
                <IconWrapper>
                    <PasswordIcon color={"#4090FE"} size={20} />
                </IconWrapper>
                <PasswordInputContainer>
                    <StyledInput
                        value={password}
                        onChangeText={txt => setPassword(txt)}
                        placeholder="Senha"
                        secureTextEntry={isSecureEntry}
                    />
                    <TouchableOpacity
                        onPress={() => setIsSecureEntry((prev) => !prev)}
                    >
                        {isSecureEntry ? <HideIcon color={"#3E3E40"} size={23} /> : <ShowIcon color={"#3E3E40"} size={23} />}
                    </TouchableOpacity>
                </PasswordInputContainer>
            </Input>
            
            <LinkMedium onPress={RedirectPasswordRecover}>Esqueceu sua senha?</LinkMedium>

            <Button onPress={()=> Login()}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <ContentAccount>
                <TextContentAccount>
                    Não tem uma conta?
                    <LinkBold onPress={RedirectRegister}> Cadastre-se</LinkBold>
                </TextContentAccount>
            </ContentAccount>
        </Container>
    );
};
