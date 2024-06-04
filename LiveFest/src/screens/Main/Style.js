import styled from "styled-components";

export const ContentIcon = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items:center;

    background-color: ${props => `${props.tabBarActiveBackgroundColor}`} ;

    gap: 5px;

    border-radius: 18px;
    padding: 5px 12px;
`

export const TextIcon = styled.Text`
    font-size: 12px;
    font-family: 'Raleway_600SemiBold';
    margin-top: -5px;
    color: #FEA340;
`