import styled, { css } from "styled-components/native"

export const ButtonDefaultStyle = styled.TouchableOpacity`
  ${(props) => {
    if(!props.disabled){
      return css`
        background-color: #4090FE;
      `
    }else{
      return css`
        background-color: #ACABB7;
      `
    }
  }}  
  width: "90%";
  border-radius: 6px;
  justify-content:center;
  align-items: center;
`