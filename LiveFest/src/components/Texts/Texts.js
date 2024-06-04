import styled,{css} from "styled-components/native";

export const TextButtonDefault = styled.Text`
  font-size: 20px;
  font-family: "MontserratAlternates_700Bold";
  color: #FFF;
`

export const TextTitleCardMain = styled(TextButtonDefault)`
  font-size: 24px;
`
export const TextDate = styled(TextTitleCardMain)`
  font-size: 14px;
`
export const TextTitle = styled(TextButtonDefault)`
  color: #000;
  padding: 16px;
  text-align: start;
`

export const TextSubTitle = styled(TextButtonDefault)`
  font-size: 18;
  font-family: "MontserratAlternates_500Medium";
  color: "#333333"
`