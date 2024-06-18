// Importações necessárias para o componente e estilização
import React, { useState } from 'react';
import { Button, ButtonTitle, Container, ContentAccount, Input, Label, LinkBold, StyledInput, TextContentAccount, Title } from './Styles';
import api from '../../service/service';
import { ScrollView, View } from 'react-native';

// Definição do componente de criação de conta
export const CreateAccount = ({ navigation }) => {
    // Estados para armazenar os valores dos campos de input
    const [input, setInput] = useState({
        name: '',             // Nome completo do usuário
        email: '',            // Email do usuário
        cpf: '',              // CPF do usuário
        password: '',         // Senha do usuário
        passwordConfirm: ''   // Confirmação de senha
    });

    // Estados para armazenar mensagens de erro para cada campo
    const [error, setError] = useState({
        name: '',             // Erro no campo de nome
        email: '',            // Erro no campo de email
        cpf: '',              // Erro no campo de CPF
        password: '',         // Erro no campo de senha
        passwordConfirm: ''   // Erro na confirmação de senha
    });

    // Estado para verificar se o CPF é válido
    const [cpfValid, setCpfValid] = useState(true);

    // Estado para verificar se o CPF está completo (com a formatação correta)
    const [cpfInputComplete, setCpfInputComplete] = useState(false);

    // Função para redirecionar para a tela de login
    async function RedirectToSignUp() {
        navigation.replace("Login");
    }

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
                case "name":
                    if (!value) {
                        stateObj[name] = "Por favor, digite seu nome."; // Verifica se o nome está vazio
                    } else if (value.length < 3) {
                        stateObj[name] = "O nome deve ter pelo menos 3 caracteres."; // Verifica se o nome tem pelo menos 3 caracteres
                    }
                    break;

                case "email":
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de email
                    if (!value) {
                        stateObj[name] = "Por favor, digite seu email."; // Verifica se o email está vazio
                    } else if (!emailRegex.test(value)) {
                        stateObj[name] = "Email inválido."; // Verifica se o email está no formato correto
                    }
                    break;

                case "cpf":
                    const isCpfValid = value.length === 14 ? validateCPF(value) : true; // Valida o CPF apenas se tiver 14 caracteres
                    setCpfValid(isCpfValid);
                    if (!value) {
                        stateObj[name] = "Por favor, digite seu CPF."; // Verifica se o CPF está vazio
                    } else if (!isCpfValid) {
                        stateObj[name] = "CPF inválido."; // Verifica se o CPF é válido
                    }
                    break;

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

    // Função para lidar com a criação do usuário
    const handleCreateUser = () => {
        if (input.name && input.email && cpfValid && input.password !== '' && input.password === input.passwordConfirm && !Object.values(error).some(err => err !== "")) {
            // Passa os dados como parâmetro ao navegar para a próxima tela 
            navigation.replace("RegistrationSuccessful", { userEmail: input.email });
        } else {
            alert('Ops! Algo deu errado');
        }
    };

    // const handleCreateUser = () => {
    //     if (input.name && input.email && cpfValid && input.password !== '' && input.password === input.passwordConfirm && !Object.values(error).some(err => err !== "")) {
    //         alert('Cadastro criado com sucesso');
    //         navigation.navigate('login');
    //     } else {
    //         alert('Ops! Algo deu errado');
    //     }
    // }


    // Função de validação do CPF
    function validateCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11) return false;

        let sum = 0;
        let rest;

        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);

        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) rest = 0;

        if (rest !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;

        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);

        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) rest = 0;

        if (rest !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Função para formatar o CPF
    const maskCpf = (text) => {
        text = text.replace(/\D/g, '');
        text = text.substring(0, 11);
        if (text.length <= 3) {
            return text;
        } else if (text.length <= 6) {
            return text.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        } else if (text.length <= 9) {
            return text.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else {
            return text.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        }
    };

    // Handler para validação de e-mail ao sair do campo
    const handleEmailBlur = () => {
        const email = input.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errorMsg = "";

        if (!email) {
            errorMsg = "Por favor, digite seu email."; // Mensagem de erro se o campo estiver vazio
        } else if (!emailRegex.test(email)) {
            errorMsg = "Email inválido."; // Mensagem de erro se o email for inválido
        }

        setError(prev => ({ ...prev, email: errorMsg })); // Atualiza o estado de erro para o campo de email
    };



    async function CreateAccount() {
        console.log(input.cpf.replace(/[^\d]/g, ''));
        try {
            const response = await api.post('/Users', {
                "userName": input.name,
                "email": input.email,
                "password": input.password,
                "code": null,
                "cpf": input.cpf.replace(/[^\d]/g, ''),
            })

            console.log(response.data);

            if (response.status === 201) {
                navigation.replace("RegistrationSuccessful", { userEmail: input.email });

            }
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data)
        }
    }




    return (
        <Container>
            <Title>Cadastre-se</Title>
            <ScrollView style={{width:"100%"}} showsVerticalScrollIndicator={false}>

            <View style={{alignItems:'center'}}>
            <Input>
                <Label>Nome completo</Label>
                <StyledInput
                    placeholder="Digite seu nome completo"
                    keyboardType="default"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={input.name}
                    onChangeText={(value) => onInputChange('name', value)}
                    onBlur={() => validateInput('name', input.name)}
                />
                {error.name && <Label style={{ color: 'red', fontSize: 14, marginTop: 63, marginLeft: -20 }}>{error.name}</Label>}
            </Input>

            <Input>
                <Label>Email</Label>
                <StyledInput
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={input.email}
                    onChangeText={(value) => onInputChange('email', value)}
                    onBlur={handleEmailBlur} // Valida ao sair do campo de email
                />
                {error.email && <Label style={{ color: 'red', fontSize: 14, marginTop: 63, marginLeft: -20 }}>{error.email}</Label>}
            </Input>

            <Input>
                <Label>CPF</Label>
                <StyledInput
                    placeholder="Digite seu CPF"
                    keyboardType="numeric"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={input.cpf}
                    onChangeText={(value) => {
                        const maskedCpf = maskCpf(value);
                        onInputChange('cpf', maskedCpf);     // Aplica a máscara de CPF
                        const isComplete = maskedCpf.length === 14;
                        setCpfInputComplete(isComplete); // Verifica se o CPF está completo
                        setCpfValid(validateCPF(maskedCpf)); // Valida o CPF e atualiza o estado
                    }}
                    onBlur={() => validateInput('cpf', input.cpf)} // Valida ao sair do campo de CPF
                />
                {error.cpf && <Label style={{ color: 'red', fontSize: 14, marginTop: 63, marginLeft: -20 }}>{error.cpf}</Label>}
            </Input>

            <Input>
                <Label>Senha</Label>
                <StyledInput
                    placeholder="Crie uma senha"
                    secureTextEntry={true}
                    autoCompleteType='password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={input.password}
                    onChangeText={(value) => onInputChange('password', value)}
                    onBlur={() => validateInput('password', input.password)} // Valida ao sair do campo de senha
                />
                {error.password && <Label style={{ color: 'red', fontSize: 14, marginTop: 63, marginLeft: -20 }}>{error.password}</Label>}
            </Input>

            <Input>
                <Label>Confirmar senha</Label>
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
                {error.passwordConfirm && <Label style={{ color: 'red', fontSize: 14, marginTop: 63, marginLeft: -20 }}>{error.passwordConfirm}</Label>}
            </Input>
            <Button onPress={() => CreateAccount()} >
                <ButtonTitle>Cadastrar</ButtonTitle>
            </Button>

            <ContentAccount>
                <TextContentAccount>
                    Já tem uma conta?
                    <LinkBold onPress={RedirectToSignUp}> Faça o login</LinkBold>
                </TextContentAccount>
            </ContentAccount>
            </View>
            </ScrollView>

        </Container>
    );
};
