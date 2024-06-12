import styled, { css } from "styled-components/native";

export const ButtonDefaultStyle = styled.TouchableOpacity`
  ${(props) => {
    if (!props.disabled) {
      return css`
        background-color: #4090fe;
      `;
    } else {
      return css`
        background-color: #acabb7;
      `;
    }
  }}
  width: 90%;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 18px;
`;
