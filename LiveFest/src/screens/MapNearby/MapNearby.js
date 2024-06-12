import { View } from "react-native"
import NearbyPoints from "../../components/NearbyPoints/NearbyPoints"
import Carrosel from "../../components/Carrosel/Carrosel"


const cardsMain = [
  {
    title: "Kit Digital Turma da Monica Scrapbook",
    urifoto: "https://s3.amazonaws.com/blog.dentrodahistoria.com.br/wp-content/uploads/2021/06/29175214/thumb-turma-monica-1024x559.png",
    description: `A Turma da Mônica é um dos grupos de personagens mais queridos do Brasil. Com suas histórias engraçadas e cativantes, eles conquistaram o coração de crianças e adultos ao longo dos anos. E uma das atividades favoritas dos fãs da Turma da Mônica é o scrapbooking, uma forma criativa de preservar e compartilhar memórias.

    Um Kit Digital Turma da Mônica Scrapbook é uma maneira fantástica de explorar a criatividade e criar páginas incríveis com os personagens amados. Com elementos digitais como papéis de fundo, molduras, adesivos e ilustrações da Turma da Mônica, é possível dar vida às páginas do seu scrapbook.
    
    Imagine poder decorar uma página com a Mônica e o Cebolinha em uma aventura emocionante, ou criar um cenário divertido com a Magali e o Cascão. O Kit Digital Turma da Mônica Scrapbook oferece infinitas possibilidades para personalizar suas páginas e contar histórias únicas.
    
    Além dos personagens principais, o kit pode incluir outros elementos temáticos, como balões de fala, bichinhos de estimação, brinquedos e objetos icônicos da Turma da Mônica. Com tantas opções, você pode criar diferentes temas para suas páginas, como festas de aniversário, passeios no parque, histórias de amizade e muito mais.
    
    Kit Digital Turma da Monica O melhor de tudo é que o Kit Digital Turma da Mônica Scrapbook é fácil de usar. Você pode encontrar diversos recursos online, como imagens digitais em alta resolução e modelos prontos para serem editados. Basta escolher as imagens que deseja usar, recortar, redimensionar e posicionar em suas páginas de scrapbook digital.
    
    Com a popularização das redes sociais e plataformas de compartilhamento de fotos, o scrapbook digital se tornou uma maneira moderna e prática de criar e compartilhar memórias. E o Kit Digital Turma da Mônica Scrapbook permite que você faça isso de maneira divertida e especial.
    
    Seja para presentear alguém especial, criar um álbum de memórias ou apenas se divertir, o Kit Digital Turma da Mônica Scrapbook é uma escolha encantadora. Com a magia dos personagens da Turma da Mônica e a sua criatividade, você pode transformar suas lembranças em páginas cheias de cor, alegria e diversão.
    
    Portanto, se você é fã da Turma da Mônica e adora scrapbooking, não perca a oportunidade de explorar o universo desses personagens incríveis e criar seu próprio Kit Digital Turma da Mônica Scrapbook. Solte sua imaginação e divirta-se contando histórias únicas com a ajuda da Mônica, Cebolinha, Magali, Cascão e toda a turminha!`,
    date: "01/06/2024",
    time: "08:50 AM",
    latitude: -23.67122, 
    longitude: -46.53236
  },
  {
    title: "GABRIELA ROCHA E CAMILA BARROS EM SÃO PAULO - CONFERÊNCIA 'O ENCONTRO'",
    urifoto: "https://images.sympla.com.br/66145b5859109-lg.jpg",
    description: `A Ark Produções e a Criative Music tem a alegria de convidar você e sua família para estarem conosco na Conferência 'O Encontro', com a ministra de louvor e adoração Gabriela Rocha e a ministra da palavra Camila Barros, na Igreja MEMA, em uma noite linda de louvores e exaltação ao REI JESUS! Será uma oportunidade incrível de viver um Encontro com a Presença do Pai, e termos momentos de lindos de profundidade na adoração ao Nosso Senhor.



    INFORMAÇÕES IMPORTANTES:
    
    
    
    INGRESSOS PCD: Solicitar Link de ingresso especifico nos contatos via Whatsapp: (27) 98170-0031.
    
    
    
    CRIANÇAS: Até 6 anos não será cobrado, porém não poderá ter acesso a uma cadeira exclusiva, a criança terá que ficar no colo do pagante responsável.
    
    
    
    VIP - CADEIRAS NÃO NUMERADAS:  As cadeiras serão preenchidas de acordo com a ordem de chegada do publico, e não serão numeradas (reservadas).
    
    
    
    PISTA - NÃO HAVERÁ CADEIRAS:  O setor PISTA não haverá cadeiras disponibilizadas.`,
    date: "01/06/2024",
    time: "01:00 PM",
    latitude: -23.61511, 
    longitude: -46.57071
  }
]

export const MapNearby = () => {
  return(
    <View style={{flex:1}}>
      <NearbyPoints
        events={cardsMain}
      />      
    </View>
  )
}