// Importa os estilos globais do Bootstrap para serem usados em todo o aplicativo.
// Isso garante que as classes do Bootstrap estejam disponíveis em todas as páginas.
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa o tipo AppProps do Next.js, que define as propriedades do componente `_app`.
// Ele inclui o componente da página atual (`Component`) e suas propriedades (`pageProps`).
import { AppProps } from 'next/app';

/**
 * Componente principal do aplicativo.
 * 
 * Este componente é o ponto de entrada global do Next.js e envolve todas as páginas do aplicativo.
 * Ele é usado para aplicar estilos globais, layouts ou provedores de contexto que devem estar disponíveis
 * em todas as páginas.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Define um contêiner global para o aplicativo.
    // Aplica classes do Bootstrap para estilização e layout.
    <div
      className="bg-dark d-flex flex-column" // Classes do Bootstrap:
      // - `bg-dark`: Define o fundo como escuro.
      // - `d-flex`: Ativa o layout flexbox.
      // - `flex-column`: Organiza os elementos em uma coluna.
      style={{
        minHeight: '100vh', // Define a altura mínima como 100% da altura da viewport.
        paddingBottom: '100px', // Adiciona um espaçamento inferior de 100px.
      }}
    >
      {/* Renderiza o componente da página atual.
          O `Component` representa a página que está sendo acessada.
          O `pageProps` contém as propriedades específicas dessa página. */}
      <Component {...pageProps} />
    </div>
  );
}

// Exporta o componente `_app` como o componente raiz do aplicativo.
// O Next.js usa este componente para renderizar todas as páginas.
export default MyApp;