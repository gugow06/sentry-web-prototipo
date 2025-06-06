
# 🚨 Sentry - Sistema Inteligente de Prevenção de Desastres

<div align="center">
  <img src="public/lovable-uploads/f954020a-6c6b-4c7e-a785-c813ae279b07.png" alt="Sentry Logo" width="120" height="120">
  
  ![Status](https://img.shields.io/badge/status-active-success.svg)
  ![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
</div>

## 📋 Sobre o Projeto

O **Sentry** é um sistema inteligente de prevenção de desastres desenvolvido para ajudar comunidades a se prepararem e responderem a emergências naturais. A plataforma oferece monitoramento em tempo real, localização de abrigos seguros e um painel administrativo completo para gestão de recursos de emergência.

### 🎯 Objetivo

Fornecer uma solução tecnológica integrada que permita:
- Monitoramento proativo de riscos ambientais
- Localização rápida de abrigos de emergência
- Gestão eficiente de recursos durante crises
- Comunicação efetiva com a população em situações de risco

## ✨ Funcionalidades Principais

### 🗺️ **Mapa Interativo**
- Visualização em tempo real dos abrigos disponíveis
- Indicação de rotas seguras
- Localização de áreas de risco
- Interface responsiva e intuitiva

### 🏠 **Lista de Abrigos**
- Informações detalhadas sobre capacidade e ocupação
- Status em tempo real (Aberto/Lotado/Fechado)
- Recursos disponíveis (água, alimentos, assistência médica, energia)
- Sistema de busca e filtros avançados
- Ordenação por distância, ocupação ou capacidade

### 📊 **Dashboard de Estatísticas**
- Métricas em tempo real do sistema
- Gráficos de ocupação dos abrigos
- Histórico de atividades recentes
- Indicadores de áreas de risco por nível de severidade

### ⚠️ **Painel de Alertas**
- Alertas ativos de emergência
- Classificação por severidade (Alto/Médio/Baixo)
- Monitoramento de áreas de risco
- Contato direto para emergências

### 🔧 **Painel Administrativo**
- Interface completa para gestão de abrigos
- Controle de capacidade e recursos
- Atualização de status em tempo real
- Sistema de autenticação seguro

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes de interface modernos

### Ferramentas e Bibliotecas
- **Lucide React** - Ícones modernos e consistentes
- **React Router** - Roteamento do lado do cliente
- **TanStack Query** - Gerenciamento de estado assíncrono
- **React Hook Form** - Formulários performáticos
- **Mapbox GL** - Mapas interativos avançados

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/sentry.git
cd sentry
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure suas chaves de API (opcional para desenvolvimento)
# VITE_MAPBOX_TOKEN=sua_chave_mapbox_aqui
```

4. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 📱 Como Usar

### Navegação Principal
- **Mapa Interativo**: Visualize abrigos e áreas de risco em tempo real
- **Lista de Abrigos**: Explore todos os abrigos disponíveis com filtros
- **Dashboard**: Monitore estatísticas e métricas do sistema
- **Administração**: Acesse o painel de controle (requer login)

### Painel Administrativo
**Credenciais de acesso:**
- **Usuário:** `admin`
- **Senha:** `admin`

No painel administrativo você pode:
- Gerenciar informações dos abrigos
- Atualizar capacidades e recursos
- Modificar status de operação
- Visualizar relatórios detalhados

### Funcionalidades do Mapa
- Navegue pelo mapa usando mouse/touch
- Clique nos marcadores para ver detalhes dos abrigos
- Use os controles de zoom para explorar diferentes áreas
- Visualize áreas de risco codificadas por cores

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do design system
│   ├── Sidebar.tsx     # Navegação lateral
│   ├── MainMap.tsx     # Componente do mapa principal
│   ├── ShelterList.tsx # Lista de abrigos
│   ├── AlertsPanel.tsx # Painel de alertas
│   ├── DashboardStats.tsx # Dashboard de estatísticas
│   └── AdminPanel.tsx  # Painel administrativo
├── pages/              # Páginas da aplicação
│   └── Index.tsx       # Página principal
├── hooks/              # Hooks personalizados
├── lib/                # Utilitários e configurações
└── styles/             # Estilos globais
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:
- **Cores primárias**: Tons de azul marinho e cinza
- **Tipografia**: Inter (sistema padrão)
- **Componentes**: Shadcn/UI customizados
- **Responsividade**: Mobile-first approach
- **Acessibilidade**: Conformidade com WCAG 2.1

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Integração com APIs meteorológicas
- [ ] Sistema de notificações push
- [ ] Aplicativo mobile nativo
- [ ] Integração com redes sociais
- [ ] Sistema de relatórios avançados
- [ ] Suporte multilíngue
- [ ] Modo offline
- [ ] Integração com sensores IoT

### Melhorias Planejadas
- [ ] Otimização de performance
- [ ] Testes automatizados
- [ ] Documentação da API
- [ ] Sistema de backup automático

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- Siga os padrões de código estabelecidos
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada
- Use commits semânticos

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Suporte

- **Repositório**: [GitHub](https://github.com/seu-usuario/sentry)
- **Issues**: [Reportar bugs ou sugerir features](https://github.com/seu-usuario/sentry/issues)
- **Documentação**: [Wiki do projeto](https://github.com/seu-usuario/sentry/wiki)

## 🙏 Agradecimentos

- Comunidade React e TypeScript
- Contribuidores do Shadcn/UI
- Equipe do Tailwind CSS
- Mapbox por fornecer APIs de mapas
- Todos os contribuidores do projeto

---

<div align="center">
  
**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

Desenvolvido com ❤️ para ajudar comunidades a se prepararem para emergências.

</div>
