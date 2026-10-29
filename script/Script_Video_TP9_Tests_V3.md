# Script vidéo TP9 — Les Tests (version 10 diapositives)

**Durée cible : 4 min 45 / 5 min maximum.**
Le support ne contient **aucune note de présentateur** : ce script se lit à côté de la présentation.

---

## 0:00 – 0:15 · Couverture — diapositive 1

> Bonjour, je m'appelle AKALETE Koffi Levis. Je présente le TP9 : les tests dans le cycle de vie d'une application. Objectif : montrer pourquoi un build réussi ne suffit pas, et comment les tests décident de la livraison.

## 0:15 – 0:50 · Pourquoi tester — diapositive 2

> Le parcours classique : Plan, Code, Build, Test, Release. Le build produit un artefact, un `dist/` ou un `.jar`. Mais « ça compile » ne veut pas dire « ça marche » : une erreur logique ou une régression peut passer.
>
> La Definition of Done complète est donc : revue de code, build qui passe **et** tests qui passent. Le build prouve la faisabilité ; le test prouve le comportement.

## 0:50 – 1:20 · Le test et son rapport — diapositive 3

> Un test compare le comportement observé au comportement attendu. Le rapport est la preuve : tests lancés, statuts, erreurs, durée et couverture.
>
> Ici : 18 tests, 18 réussis, 0 échec, 87 % de couverture. Verdict **GO**, la Release est autorisée. Un seul échec donnerait **NO-GO** et bloquerait le pipeline.

## 1:20 – 1:55 · Où placer les tests — diapositive 4

> Les tests unitaires et le lint s'exécutent **avant le build**, sur le code source. Le build produit ensuite l'artefact. Puis l'intégration, le E2E, la charge et la sécurité valident l'artefact et son environnement.
>
> Maven illustre ce principe : `test`, puis `package`, puis `integration-test`, puis `verify`. C'est le test qui décide, pas le build.

## 1:55 – 2:25 · La pyramide — diapositive 5

> À la base, environ 70 % de tests unitaires, rapides et isolés. Au milieu, 20 % d'intégration, avec plusieurs composants assemblés. Au sommet, 10 % de E2E, réservés aux parcours critiques.
>
> La régression est transversale : on rejoue l'existant à chaque changement, sinon une fonctionnalité qui marchait peut casser sans prévenir.

## 2:25 – 3:05 · Unitaire et intégration — diapositive 6

> Côté Angular, Jasmine et TestBed simulent la réponse HTTP avec `HttpTestingController`, puis vérifient que le jeton est stocké. Commande : `ng test`.
>
> Côté Spring Boot, JUnit 5 et Mockito testent le service avec des mocks : `./mvnw test`. Pour l'intégration, `@SpringBootTest` et MockMvc traversent le contrôleur, le service et la base H2 : `./mvnw verify`.

## 3:05 – 3:35 · E2E et régression — diapositive 7

> Cypress pilote un vrai navigateur : on remplit le formulaire, on attend l'appel POST et on vérifie la redirection vers `/dashboard`. Le même scénario s'écrit en Gherkin : Étant donné, Quand, Alors.
>
> L'E2E est lent : on le réserve aux parcours critiques. La régression, elle, rejoue toute la suite pour protéger l'existant.

## 3:35 – 4:05 · Non-fonctionnel — diapositive 8

> Les tests non-fonctionnels vérifient le **comment**. Avec k6 : 50 utilisateurs virtuels, 95 % des requêtes sous 500 ms, moins de 1 % d'erreurs. Ces seuils transforment une mesure en décision GO / NO-GO.
>
> Pour la sécurité : `npm audit`, OWASP Dependency-Check et ZAP détectent les dépendances vulnérables et les failles web.

## 4:05 – 4:35 · Cas concret — diapositive 9

> User story : en tant qu'utilisateur non authentifié, je veux me connecter pour accéder à mon tableau de bord. Le scénario Gherkin devient un test MockMvc et un test Cypress.
>
> Le rapport montre un échec : le test attend 401 quand le mot de passe est faux, mais l'application renvoie 200. Le test est correct : le rapport localise le bug avec le nom du test, la durée et l'assertion.

## 4:35 – 4:50 · Conclusion — diapositive 10

> Pour conclure : un build réussi ne suffit pas. Tests unitaires, intégration, E2E, charge et sécurité se complètent. Build OK plus tests OK égal incrément prêt pour la Release. Merci de votre attention.

---

## Plan de montage

| Temps | Diapo | À montrer |
|---|---|---|
| 0:00–0:15 | 1 | Couverture |
| 0:15–0:50 | 2 | Build vs Tests, Definition of Done |
| 0:50–1:20 | 3 | Rapport GO à droite |
| 1:20–1:55 | 4 | Pipeline avant/après build |
| 1:55–2:25 | 5 | Pyramide + cartes |
| 2:25–3:05 | 6 | Code Jasmine et MockMvc |
| 3:05–3:35 | 7 | Cypress, Gherkin, régression |
| 3:35–4:05 | 8 | Code k6, seuils, sécurité |
| 4:05–4:35 | 9 | Story → Gherkin → rapport d'échec |
| 4:35–4:50 | 10 | Synthèse |

## Conseils d'enregistrement

- Environ 130 mots/minute : le script fait ~560 mots, soit ~4 min 20 + pauses.
- Zoomer sur les blocs de code (diapos 6, 7, 8, 9) pour garder les commandes lisibles.
- Ne pas lire les tableaux ou les listes : montrer la structure, citer deux exemples.
- Vérifier que la vidéo finale fait bien **moins de 5 minutes**.

## Changements par rapport à la version 17 diapositives

- Passage de 17 à **10 diapositives**, une idée par slide.
- Suppression du tableau multi-écosystèmes et des slides de transition.
- Code conservé : Angular, Spring Boot, Cypress, Gherkin, k6.
- Rapport GO et rapport NO-GO toujours présents.
- Aucune note de présentateur.
