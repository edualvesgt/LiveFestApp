
import React, { useState } from 'react';
import { Button, ButtonTitle, Container, Input, InputConfirmPassword, InputPassword, Label, PasswordInputContainer, StyledInput, Title } from './Styles';
import { TouchableOpacity } from 'react-native';
import ShowIcon from '../../components/Icons/Show';
import HideIcon from '../../components/Icons/Hide';

export const PasswordReset = ({ navigation }) => {

    const [isSecureEntry, setIsSecureEntry] = useState(true);

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


    // Função para atualizar o estado de input ao alterar os valores dos campos
    const onInputChange = (name, value) => {
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função de validação para dos inputs
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



    return (
        <Container>
            <Title>Criar nova senha</Title>

            <InputPassword>
                <Label>Senha</Label>
                <PasswordInputContainer>
                    <StyledInput
                        placeholder="Crie uma senha"
                        secureTextEntry={isSecureEntry}
                        autoCompleteType='password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={input.password}
                        onChangeText={(value) => onInputChange('password', value)}
                        onBlur={() => validateInput('password', input.password)} // Valida ao sair do campo de senha
                    />
                    {error.password && <Label style={{ color: 'red', fontSize: 14, marginTop: 38, marginLeft: -20 }}>{error.password}</Label>}
                    <TouchableOpacity
                        onPress={() => setIsSecureEntry((prev) => !prev)}
                    >
                        {isSecureEntry ? <HideIcon color={"#3E3E40"} size={23} /> : <ShowIcon color={"#3E3E40"} size={23} />}
                    </TouchableOpacity>
                </PasswordInputContainer>
            </InputPassword>

            <InputConfirmPassword>
                <Label>Confirmar senha</Label>
                <PasswordInputContainer>

                    <StyledInput
                        placeholder="Confirme sua senha"
                        secureTextEntry={true}
                        autoCompleteType='password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={input.passwordConfirm}
                        onChangeText={(value) => onInputChange('passwordConfirm', value)}
                        onBlur={() => validateInput('passwordConfirm', input.passwordConfirm)} // Valida ao sair do campo de confirmação de senha
                    />
                    {error.passwordConfirm && <Label style={{ color: 'red', fontSize: 14, marginTop: 38, marginLeft: -20 }}>{error.passwordConfirm}</Label>}
                    <TouchableOpacity
                        onPress={() => setIsSecureEntry((prev) => !prev)}
                    >
                        {isSecureEntry ? <HideIcon color={"#3E3E40"} size={23} /> : <ShowIcon color={"#3E3E40"} size={23} />}
                    </TouchableOpacity>
                </PasswordInputContainer>
            </InputConfirmPassword>

            <Button>
                <ButtonTitle>Redefinir senha</ButtonTitle>
            </Button>

        </Container>
    );
};
