# Livrable TP9 — Les Tests

**AKALETE Koffi Levis** · 02 novembre 2026

Dépôt GitHub : <https://github.com/akaletekoffilevis/TP9-Les-Tests>

## Contenu du dossier

| Fichier | Usage |
|---|---|
| `presentation/TP9_Les_Tests_Presentation_Illustree.pdf` | version à présenter / déposer |
| `presentation/TP9_Les_Tests_Presentation_Illustree.pptx` | édition PowerPoint |
| `presentation/TP9_Les_Tests_Presentation_Illustree.odp` | édition LibreOffice Impress |
| `script/Script_Video_TP9_Tests_V3.md` | script de la vidéo (4 min 45) |
| `code/` | code réel des exemples (Angular, Spring Boot, Cypress, k6) |
| `.github/workflows/tests.yml` | un job CI par test + récapitulatif |
| `README.md` | notice du dépôt et commandes |

> Les trois fichiers de présentation sont identiques : **10 diapositives, 16:9, aucune note de présentateur**.

## Ouvrir la présentation

- Lecture : `presentation/TP9_Les_Tests_Presentation_Illustree.pdf`
- Modification : `presentation/TP9_Les_Tests_Presentation_Illustree.odp` avec LibreOffice Impress
  (ou le `.pptx` avec PowerPoint / Google Slides)
- Les polices utilisées sont **Lato** et **DejaVu Sans Mono** ; elles sont embarquées
  dans le PDF. Sur une autre machine, installer Lato pour un rendu identique.

## Ce que couvre la présentation

1. Pourquoi un build réussi ne suffit pas (Definition of Done)
2. Le test et le rapport de test (verdict GO / NO-GO)
3. La place des tests dans le pipeline (cycle Maven)
4. La pyramide : unitaire, intégration, E2E, régression
5. Les tests non-fonctionnels : performance, charge, sécurité
6. Le code réel : Jasmine/Karma, JUnit/Mockito, MockMvc, Cypress, k6
7. Les outils Angular / Spring Boot et leurs rapports
8. Le cas concret TaskFlow : Gherkin → code → CI → GO / NO-GO

## Commandes citées

```bash
# Angular / JavaScript
ng test --watch=false --browsers=ChromeHeadless --code-coverage
npx cypress run

# Spring Boot / Java
./mvnw test          # tests unitaires (Surefire) avant le packaging
./mvnw verify        # packaging + tests d'intégration (Failsafe)

# Performance
k6 run code/performance/login-load-test.js
```

## Avant de rendre

- [ ] Enregistrer la vidéo (≤ 5 min) en suivant `script/Script_Video_TP9_Tests_V3.md`
- [ ] Vérifier que la vidéo et le PDF sont accessibles
- [ ] Conserver le nom de dossier `AKALETE_Koffi_Levis`
- [ ] Déposer avant le **lundi 02 novembre 2026 à 21h00 (GMT)**
