import styled from "styled-components/native";
import { StatusBar } from "react-native";

const heithStatusBar = StatusBar.currentHeight;

export const Container = styled.View`
    width: ${props => (props.widthContainer ? props.widthContainer : "100%")};
    height: ${props => (props.heightContainer ? props.heightContainer : "100%")};

    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "white"};
    display: flex;
    flex-direction: ${props => (props.flexDirection ? props.flexDirection : "column")};
`
export const ContainerMarginStatusBar = styled(Container)`
    padding-top: ${heithStatusBar}px;
`
