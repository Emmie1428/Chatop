# ChâTop - Portail de Location Saisonnière

Application full-stack TypeScript pour mettre en relation locataires et propriétaires dans une zone touristique.

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** 22 LTS ou supérieur
- **npm** (inclus avec Node.js)
- **MySQL** 8.0+

### Installation

#### 1. Cloner le repository

```bash
git clone https://github.com/Emmie1428/Chatop.git
cd Chatop
```

#### 2. Créer la base de données MySQL

```bash
mysql -u root -p < ressources/sql/schema.sql
```
Ou via MySQL Workbench / DBeaver :
1. Ouvrir le fichier `ressources/sql/schema.sql`
2. Exécuter le script

#### 2. Installer et lancer le back-end

```bash
cd backend
npm install 
```
Créer un fichier .env à partir du fichier .env.exemple pour l'authentification et la connexion à MySQL

```bash
npx prisma generate

npm run start:dev
```
Le back-end sera accessible sur http://localhost:3001/api. \
La documentation Swagger est accessible sur http://localhost:3001/api-docs.

#### 4. Installer et lancer le front-end React

```bash
cd frontend
npm install
npm run dev
```
L'application front-end sera accessible sur [http://localhost:5173](http://localhost:5173)


## 📂 Structure du projet

```
Chatop/
├── backend/                
│   ├── src/
│   │   ├── auth/             # Authentification et gestion des JWT
│   │   ├── dto/              # DTO et validation des données
│   │   ├── message/          # Gestion des messages
│   │   ├── rental/           # Gestion des locations
│   │   ├── repository/       # Accès aux données via Prisma
│   │   ├── user/             # Gestion des utilisateurs
│   │   ├── app.controller.ts # Endpoint root de l'API
│   │   ├── app.module.ts     # Modules regroupés
│   │   ├── app.service.ts    # Logique métié de l'endpoint root de l'API
│   │   ├── main.ts           # Lancement du serveur de configuration Swagger
│   │   └── prisma.service.ts # Connexion de Prisma à la base de données
│   ├── prisma/               # Schémas et configuration de Prisma
│   ├── uploads/              # Dossier de stockage des images
│   ├── prisma.config.ts      # Configuration de Prisma CLI
│   ├── package.json
│   ├── ts.config.ts
│   └── .env.exemple
├── frontend/                 # Application React 19 
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/            # Pages de l'application
│   │   ├── services/         # Services API (axios)
│   │   ├── types/            # Types TypeScript
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── ressources/
│   ├── mockoon/              # Environnement API mock pour dev
│   │   └── chatop-api.json
│   └── sql/                  # Schéma de base de données
│       └── schema.sql
│
└── README.md
```

## 🌐 Endpoints API
   - `POST /api/auth/register` - Créer un compte
   - `POST /api/auth/login` - Se connecter (retour JWT)
   - `GET /api/auth/me` - Obtenir l'utilisateur connecté
   - `GET /api/rentals` - Liste des locations
   - `GET /api/rentals/:id` - Détail d'une location
   - `POST /api/rentals` - Créer une location (avec upload image)
   - `PUT /api/rentals/:id` - Modifier une location
   - `GET /api/user/:id` - Obtenir un utilisateur
   - `POST /api/messages` - Envoyer un message

## 🔧 Technologies  utilisées

### Front-end
- **React 19** - UI framework
- **TypeScript 5.7+** - Typage statique
- **Vite 6** - Build tool
- **TailwindCSS 3.4** - Styling
- **TanStack Query** - Data fetching
- **React Router 7** - Routing
- **Axios** - HTTP client

### Back-end 
- **NestJS 11** - Framework back-end
- **TypeScript 5.7+** (Strict Mode)
- **Prisma** - ORM pour MySQL
- **Passport + JWT** - Authentification
- **bcrypt** - Hachage mots de passe
- **class-validator** - Validation Dtos
- **@nestjs/swagger** - Documentation OpenAPI

## 📝 Commandes utiles

### Front-end
```bash
cd frontend
npm install          # Installer les dépendances
npm run dev          # Lancer en développement
npm run build        # Build production
npm run lint         # Vérifier le code
```

### Back-end 
```bash
cd backend
npm install          # Installer les dépendances
npx prisma generate  # Générer le client Prisma
npm run start:dev    # Lancer en développement
```

---

**Version** : 1.0.1
**Date** : septembre 2026


