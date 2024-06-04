import { TextButtonDefault } from "../Texts/Texts";
import { ButtonDefaultStyle } from "./Style";

export default function ButtonDefault({ text, onPress }) {
  return (
    <ButtonDefaultStyle onPress={onPress}>
      <TextButtonDefault>{text}</TextButtonDefault>
    </ButtonDefaultStyle>
  );
}
