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
  padding: 0;
  text-align: center;
`

export const TextTitleCard = styled.Text`
  font-family: MontserratAlternates_600SemiBold;
  font-size: 18px;
  color: #000;
  width: 75%;
`

export const TextTimeCard = styled(TextTitleCard)`
  font-size: 14px;
  color: #C2C2C2;
  width: max-content;
`

export const TextContentCard = styled.Text`
  color: #B3B3B3;
  font-size: 14px;
  font-family: "Raleway_500Medium";
  line-height: 28px;
`