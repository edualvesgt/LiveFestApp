import React, { useState } from 'react';
import { Button, ButtonTitle, Container, Input, InputConfirmPassword, InputPassword, Label, PasswordInputContainer, StyledInput, Title } from './Styles';
import { TouchableOpacity } from 'react-native';
import ShowIcon from '../../components/Icons/Show';
import HideIcon from '../../components/Icons/Hide';
import api from '../../service/service';

export const PasswordReset = ({ navigation, route }) => {
    // Estados para controlar a visibilidade de cada campo de senha
    const [isSecureEntryPassword, setIsSecureEntryPassword] = useState(true);
    const [isSecureEntryPasswordConfirm, setIsSecureEntryPasswordConfirm] = useState(true);

    // Estados para armazenar os valores dos campos de input
    const [input, setInput] = useState({
        password: '',         // Senha do usuário
        passwordConfirm: ''   // Confirmação de senha
    });

    // Estados para armazenar mensagens de erro para cada campo
    const [error, setError] = useState({
        password: '',         // Erro no campo de senha
        passwordConfirm: ''   // Erro na confirmação de senha
    });

    const { userEmail } = route.params;
    // Função para atualizar o estado de input ao alterar os valores dos campos
    const onInputChange = (name, value) => {
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função de validação para os inputs
    const validateInput = (name, value) => {
        setError(prev => {
            const stateObj = { ...prev, [name]: "" }; // Inicializa um objeto de erro para o campo

            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Por favor, digite sua senha."; // Verifica se a senha está vazia
                    } else if (value.length < 8) {
                        stateObj[name] = "A senha deve ter pelo menos 8 caracteres."; // Verifica se a senha tem pelo menos 8 caracteres
                    } else {
                        stateObj["passwordConfirm"] = input.passwordConfirm ? "" : error.passwordConfirm; // Reseta a mensagem de erro da confirmação de senha
                    }
                    break;

                case "passwordConfirm":
                    if (!value) {
                        stateObj[name] = "Por favor, confirme sua senha."; // Verifica se a confirmação de senha está vazia
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "As senhas estão diferentes, verifique!"; // Verifica se a confirmação de senha corresponde à senha
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    };

    async function UpdatePassword() {
        try {
            if (input.password === input.passwordConfirm) {
                const response = await api.put(`/Users/UpdatePassword?email=${userEmail}`, {
                    "newPassword": input.password
                })
                console.log(response.data);
                if (response.status == 200) {
                    navigation.replace("PasswordResetSuccessful")
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Title>Criar nova senha</Title>

            <InputPassword>
                <Label>Senha</Label>
                <PasswordInputContainer>
                    <StyledInput
                        placeholder="Crie uma senha"
                        secureTextEntry={isSecureEntryPassword} 
                        autoCompleteType='password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={input.password}
                        onChangeText={(value) => onInputChange('password', value)}
                        onBlur={() => validateInput('password', input.password)} // Valida ao sair do campo de senha
                    />
                    {error.password && <Label style={{ color: 'red', fontSize: 14, marginTop: 38, marginLeft: -20 }}>{error.password}</Label>}
                    <TouchableOpacity
                        onPress={() => setIsSecureEntryPassword((prev) => !prev)}
                    >
                        {isSecureEntryPassword ? <HideIcon color={"#3E3E40"} size={23} /> : <ShowIcon color={"#3E3E40"} size={23} />}
                    </TouchableOpacity>
                </PasswordInputContainer>
            </InputPassword>

            <InputConfirmPassword>
                <Label>Confirmar senha</Label>
                <PasswordInputContainer>
                    <StyledInput
                        placeholder="Confirme sua senha"
                        secureTextEntry={isSecureEntryPasswordConfirm} 
                        autoCompleteType='password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={input.passwordConfirm}
                        onChangeText={(value) => onInputChange('passwordConfirm', value)}
                        onBlur={() => validateInput('passwordConfirm', input.passwordConfirm)} // Valida ao sair do campo de confirmação de senha
                    />
                    {error.passwordConfirm && <Label style={{ color: 'red', fontSize: 14, marginTop: 38, marginLeft: -20 }}>{error.passwordConfirm}</Label>}
                    <TouchableOpacity
                        onPress={() => setIsSecureEntryPasswordConfirm((prev) => !prev)}
                    >
                        {isSecureEntryPasswordConfirm ? <HideIcon color={"#3E3E40"} size={23} /> : <ShowIcon color={"#3E3E40"} size={23} />}
                    </TouchableOpacity>
                </PasswordInputContainer>
            </InputConfirmPassword>

            <Button onPress={() => UpdatePassword()}>
                <ButtonTitle>Redefinir senha</ButtonTitle>
            </Button>
        </Container>
    );
};
