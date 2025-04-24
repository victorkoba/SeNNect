
# SeNNect

Este é um aplicativo mobile desenvolvido com **React Native** e **Expo**, utilizando serviços da **AWS (S3)** e **Firebase (Authentication + Firestore)**.

## Funcionalidades

- Cadastro e login de usuários com Firebase Authentication
- Upload de imagens para o AWS S3 com Presigned URLs
- Criação de posts com legenda e imagem
- Feed com exibição dos posts criados
- Curtidas e comentários em posts

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/) – Authentication & Firestore
- [AWS S3](https://aws.amazon.com/s3/) – Armazenamento de imagens
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Estrutura de Arquivos

```
.
├── App.js                    # Arquivo principal do app
├── app.json                  # Configurações do projeto Expo
├── awsConfig.js             # Configuração de upload para S3
├── firebaseConfig.js        # Inicialização do Firebase
├── index.js                 # Ponto de entrada do app
├── package.json             # Dependências do projeto
└── .expo/                   # Arquivos auxiliares do Expo
```

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/SeNNect.git
   cd aplicativo-teste
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o app:
   ```bash
   npx expo start
   ```

4. Escaneie o QR code com o app **Expo Go** no seu celular.

## Configuração

Certifique-se de configurar corretamente os arquivos `firebaseConfig.js` e `awsConfig.js` com suas credenciais antes de executar o projeto.

## Observações

Este projeto é apenas um protótipo/teste para fins educacionais e pode não conter todas as práticas de segurança e escalabilidade recomendadas para produção.
