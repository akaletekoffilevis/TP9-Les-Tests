# Exemples de code — TP9 « Les Tests »

Code réel utilisé dans la présentation, rendu exécutable pour la CI. Le domaine
fil rouge est une application **TaskFlow** avec une user story de connexion :

> En tant qu'utilisateur non authentifié, je veux me connecter avec mes
> identifiants afin d'accéder à mon tableau de bord.

## Arborescence

```text
code/
├── angular/
│   ├── src/app/auth/auth.service.ts        # service testé
│   ├── src/app/auth/auth.service.spec.ts   # test unitaire Jasmine/Karma
│   ├── src/app/login/login.component.ts    # formulaire de connexion
│   ├── cypress/e2e/login.cy.ts             # test E2E Cypress
│   ├── karma.conf.js                       # configuration Karma
│   ├── cypress.config.ts                   # configuration Cypress
│   ├── angular.json                        # projet Angular exécutable
│   └── package.json
├── spring-boot/
│   ├── src/main/java/.../auth/             # contrôleur, service, JWT, JPA
│   ├── src/test/java/.../auth/
│   │   ├── AuthServiceTest.java            # test unitaire JUnit 5 + Mockito
│   │   └── AuthControllerIT.java           # test d'intégration MockMvc
│   ├── src/test/resources/application-test.yml
│   ├── pom.xml                             # build complet + Surefire/Failsafe/JaCoCo
│   └── pom-extrait.xml                     # extrait commenté pour la présentation
├── features/login.feature                  # scénario Gherkin
└── performance/
    ├── login-load-test.js                  # test de charge k6
    └── mock-api.js                         # mock utilisé par le smoke test CI
```

## Commandes

### Angular / JavaScript

```bash
cd code/angular
npm ci
npm test -- --watch=false --browsers=ChromeHeadlessCI --code-coverage
npm start
npx cypress run --spec cypress/e2e/login.cy.ts
```

### Spring Boot / Java

```bash
cd code/spring-boot
./mvnw test        # tests unitaires (Surefire) avant le packaging
./mvnw verify      # packaging + tests d'intégration (Failsafe)
```

Pour exécuter un seul test :

```bash
./mvnw test -Dtest='AuthServiceTest#login_avecIdentifiantsValides_retourneUnJeton'
./mvnw test-compile failsafe:integration-test failsafe:verify \
  -Dit.test='AuthControllerIT#login_motDePasseInvalide_retourne401' \
  -DfailIfNoTests=false
```

### Performance

```bash
k6 run code/performance/login-load-test.js
```

## Place dans le pipeline

| Étape | Ce qui est testé | Commande |
|---|---|---|
| Avant le build | code source : unitaires | `ng test`, `./mvnw test` |
| Build | génération de l'artefact | `ng build`, `./mvnw package` |
| Après le build | intégration, E2E | `./mvnw verify`, `npx cypress run` |
| Avant la release | charge | `k6 run` |

Un seul test en échec bloque le pipeline : le verdict est **NO-GO**.
Le workflow GitHub Actions détaille chaque test dans un job séparé :
`.github/workflows/tests.yml`.
