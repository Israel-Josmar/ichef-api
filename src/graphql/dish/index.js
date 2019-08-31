import uuid from 'uuid'
import { gql } from 'apollo-server-lambda'

const typeDefs = gql`
  type Query {
    dishes: [Dish!]!
  }

  type Dish {
    id: ID!
    name: String!
    category: String!
    imageUrl: String!
    description: String!
  }
`

const mockDishes = [
  {
    id: uuid.v4(),
    name: 'Ribeye 380g Super Premium',
    category: 'Carnes',
    imageUrl:
      'https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_ribeye_kobe_beef.jpg?quality=70&strip=info&w=920',
    description:
      'O prato tem como acompanhamento purê de batata com queijo provola. O corte vem do gado Kobe, uma raça japonesa. O Ribeeye tem classificação Super Premium devido à sua marmorização especial. A marmorização indica a quantidade de gordura intramuscular na carne: quanto mais gordura, mais macio e saboroso o bife fica.',
  },
  {
    id: uuid.v4(),
    name: 'Raça Tropical Kobe Beef- Baby beef com batatas soufflées',
    category: 'Carnes',
    imageUrl:
      'https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_a_figueira_rubaiyat_-_baby_beef.jpg?quality=70&strip=info&w=920',
    description:
      'O Tropical Kobe Beef é uma carne suculenta, macia e com sabor único, resultado de um cruzamento do gado raça Brangus com Wagyu, essa última uma raça japonesa. O gado é criado na Fazenda Rubaiyat, no Mato Grosso.',
  },
  {
    id: uuid.v4(),
    name:
      'Lascas de Kobe Beef marinadas em xerez seco com queijo D.O. manchego extra seco, pimenta malagueta e pistaches',
    category: 'Espanhol',
    imageUrl:
      'https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_arola_vintetres.jpg?quality=70&strip=info&w=920',
    description:
      'O prato espanhol traz cortes do gado especial Kobe, raça japonesa. As lascas marinadas ganham um sabor peculiar. A pimenta malagueta é apresentada em cubos de gelatina e o pistache da crocância ao prato. Por fim, o queijo manchego, original da Espanha, complementa toda a diversidade de sabores do prato. O restaurante fica no 23º andar do Hotel Tivoli.',
  },
  {
    id: uuid.v4(),
    name: 'Abóbora assada com bobó de camarão e catupiry',
    category: 'Frutos do mar',
    imageUrl:
      'https://img.itdg.com.br/tdg/images/recipes/000/174/217/175183/175183_original.jpg?mode=crop&width=710&height=400',
    description:
      'A descrição do prato parece simples: Bobó de Camarão na abóbora moranga com arroz branco, mas o chef faz toda a diferença: o estrelado Alex Atala. O prato mais caro da casa é inspirado nas receitas da família brasileira, mas utiliza um padrão internacional e técnicas aprimoradas de culinária.',
  },
]

const resolvers = {
  Query: {
    dishes: () => {
      return mockDishes
    },
  },
}

export { resolvers, typeDefs }
