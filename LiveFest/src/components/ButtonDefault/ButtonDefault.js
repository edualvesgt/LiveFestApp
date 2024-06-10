import { TextButtonDefault } from "../Titles/Titles";
import { ButtonDefaultStyle } from "./Style";


export default function ButtonDefault ({
  text
}) {
  return(
    <ButtonDefaultStyle>
      <TextButtonDefault>{text}</TextButtonDefault>
    </ButtonDefaultStyle>
  )
}