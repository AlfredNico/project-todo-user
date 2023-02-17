# Frontend

> Application **frontend**, ci-dessous des informations sur la stack avec un lien vers des docs

- **[Angular](https://v14.angular.io/docs)** (14.x)
- **[Angular Material UI](https://v14.material.angular.io/)** (14.x)
- **[Angular Flex Layout](https://github.com/angular/flex-layout)** (11.x)

### Pré-requis

- Une version de **Node LTS** _(16 recommandé)_
- **Angular CLI** installé de manière globale : `npm install -g @angular/cli`

### Clonage du repository

- `git clone --single-branch --branch master https://github.com/AlfredNico/project-todo-user.git`

### Installation des packages

- côté frontend: `cd todo-back && npm install --force`
- côté backend: `cd todo-front && npm install`

### Démarrer en mode développement

- Utilisez la commande `ng s -o`, et il va ouvrir un navigateur pour se demarrage.

# Backend

Avant de lancer ce projet, assuez-vous que vous avez déjà installé `nodemon`,
si n'est pas le cas, il faut lancer ce ligne de commande:
`npm i -g nodemon`:

### Prérequis

- NodeJS v16.16.0
- XAMPP ou WAMP serveur

---

### Démarrer un serveur de développement

```run script
npm run start:dev
```



# Base de donnée

Si vous souhaitez développer avec un serveur backend de développement en local, il faudra configurer dans le fichier backend `config.json`:

```
{
    "database": {
        "host": "localhost",
        "port": PORT_DATABASE,
        "user": "USERNAME_DATABASE",
        "password": "PASSWORD",
        "database": "DATABASE_NAME"
    },
    "secret": "TODO_FOR_CRUD_USER"
}
```

### Remarque

La base est créer automatique des que ce projet est lancer !
