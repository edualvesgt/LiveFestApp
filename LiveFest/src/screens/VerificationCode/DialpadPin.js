import React from "react";
import styled from "styled-components/native";

// Define o componente DialpadPin, que recebe as seguintes propriedades: pinLength, pinSize, code e dialPadContent
const DialpadPin = ({ pinLength, pinSize, code, dialPadContent }) => {
  // Retorna a renderização do componente
  return (
    // Define um container que envolve todo o conteúdo do DialpadPin
    <PinContainer>
      {/* Cria um array com um comprimento igual a pinLength e mapeia cada item do array */}
      {Array(pinLength)
        .fill()
        .map((_, index) => {
          // Define a variável item como o item correspondente no array dialPadContent
          const item = dialPadContent[index];
          // Verifica se o índice está dentro do comprimento do código
          const isSelected = index < code.length;
          // Retorna a renderização de um componente StyledRectangle para cada item no array
          return (
            <StyledRectangle key={index} isSelected={isSelected}>
              {/* Renderiza um Texto que exibe o número digitado, somente se o item estiver selecionado */}
              {isSelected && <PinText>{code[index]}</PinText>}
            </StyledRectangle>
          );
        })}
    </PinContainer>
  );
};

export default DialpadPin;

// Styled components para estilização
const PinContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  align-items: flex-end;
`;

const StyledRectangle = styled.View`
  width: 50px;
  height: 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? "#4090FE" : "#EAEBED")};
  margin-right: 10px;
`;

const PinText = styled.Text`
  font-size: 24px;
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  text-align: center;
  color: #333333;
  font-family: MontserratAlternates_600SemiBold;
`;


