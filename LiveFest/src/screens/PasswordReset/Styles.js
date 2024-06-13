import styled from "styled-components";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #F7F8FA;
`;

export const InputPassword = styled.View`
  width: 90%;
  height: 80px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.0935);
  position: relative; 
  background-color: #FFF;
  margin-top: 22px; /* Espaçamento superior */
  margin-bottom: 30px; /* Espaçamento inferior */
 
`;

export const InputConfirmPassword = styled.View`
  width: 90%;
  height: 80px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.0935);
  position: relative; 
  background-color: #FFF;
  margin-bottom: 20px; 
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#BFBFBF'
})`
  flex: 1;
  height: 100%;
  font-size: 16px;
  font-family: 'MontserratAlternates_600SemiBold';
   top: 17px; 
   left: 25px; 
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: 'MontserratAlternates_600SemiBold';
  color: #33303E;
  position: absolute; 
  top: 17px; 
  left: 25px; 
  color: #4090FE;
`;


export const Title = styled.Text`
  padding-top: 42px;
  font-size: 24px;
  margin-bottom: 5px;
  color: #33303E;
  font-family: MontserratAlternates_600SemiBold;
`;


export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 80px;
  background-color: #4090FE;
  border-radius: 5px;
  border: 1px solid #4090FE;
  margin-top:26px;
  padding: 12px 8px;
  align-items: center;
  justify-content: center;
`;

export const ButtonTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
  font-family: "MontserratAlternates_700Bold";
`;

export const PasswordInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-right: 30px; 
`;





