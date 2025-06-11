# 📊 Sistema de Gerenciamento de Projetos e Tarefas

## 📑 Sumário

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Backend](#arquitetura-do-backend)
  - [Domain (Núcleo)](#1-domain-núcleo)
  - [Application](#2-application)
  - [Infrastructure](#3-infrastructure)
  - [Presentation](#4-presentation)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Entidades Principais](#entidades-principais)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Critérios de Avaliação](#critérios-de-avaliação)
- [Dados de Inicialização](#dados-de-inicialização)

---

## 📝 Descrição

Sistema fullstack para gerenciamento de projetos e tarefas, com autenticação via **JWT** e controle de acesso baseado em papéis (**admin** e **colaborador**).

Principais funcionalidades:

- Login seguro via `client_id` e `client_secret`.
- Geração e validação de **token JWT**.
- CRUD completo de projetos e tarefas.
- Interface diferenciada para **admin** e **colaborador**.

---

## 💻 Tecnologias Utilizadas

### Backend

- **Node.js**
- **Express.js**
- **SQLite** (via `sql.js`)
- **JSON Web Token (JWT)**
- Arquitetura **em camadas** (Arquitetura **Cebola**)

### Frontend

- **Next.js**

---

## 🏛️ Arquitetura do Backend

O backend segue o modelo de **Arquitetura em Cebola**, composta por quatro camadas bem definidas.

### 🥇 1. Domain (Núcleo)

- Define as **entidades**: `User`, `Project`, `Task`
- Define os **contratos**: interfaces de repositórios e serviços
- **Sem** dependências externas

---

### 🥈 2. Application

- Define os **casos de uso**:
  - Criar projetos
  - Listar tarefas
  - Autenticar usuário
- Utiliza as **interfaces** do domínio
- Contém regras de negócio da aplicação

---

### 🥉 3. Infrastructure

- Implementações de:
  - Acesso a **SQLite** via `sql.js`
  - **Serviços JWT**
  - **Middleware** de autenticação/autorização
- Pode ser modificada sem impactar o núcleo da aplicação

---

### 🏅 4. Presentation

- Interface HTTP via **Express.js**
- Define as **rotas** e **controladores**
- Responsável por orquestrar as requisições e casos de uso

---

🧩 Entidades Principais
User
Campos: id, name, email, password (ou token), role

Project
Campos: id, name, description, owner (user_id)

Task
Campos: id, title, description, project_id, assigned_to (user_id), status

✅ Requisitos Funcionais

1. Autenticação e Autorização
   Endpoint de login via client_id e client_secret

Geração de token JWT

Middleware de autorização para proteger rotas

Papéis:

Admin: CRUD completo

Colaborador: apenas leitura dos seus próprios projetos/tarefas

2. Entidades Obrigatórias
   User

Project

Task

3. Backend
   Desenvolvido em Node.js + Express

Banco de dados via SQL.js

Arquitetura em Cebola

4. Frontend
   Framework livre: React, Vue ou Angular

Funcionalidades:

Tela de Login com JWT

Listagem de Projetos e Tarefas

Criação de Projetos e Tarefas (se autorizado)

Visualização de tarefas atribuídas ao usuário autenticado

🏆 Critérios de Avaliação
Critério Pontuação
Estrutura em cebola 5 pts
Entidades e telas 5 pts
Coerência entre estrutura e o projeto 5 pts
Criatividade e usabilidade do projeto 5 pts
Organização e qualidade da apresentação 5 pts
Total 25 pts

🗃️ Dados de Inicialização
O projeto deverá conter um script de seed para popular o banco de dados com:

✅ 1 usuário Admin

✅ 1 usuário Colaborador

✅ 1 Projeto com algumas Tarefas
