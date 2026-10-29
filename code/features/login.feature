# language: fr
Fonctionnalité : Connexion utilisateur
  En tant qu'utilisateur non authentifié
  Je veux me connecter avec mes identifiants
  Afin d'accéder à mon tableau de bord

  Contexte :
    Étant donné que le compte "ada@exemple.fr" existe
    Et que son mot de passe est "secret"

  Scénario : Connexion avec des identifiants valides
    Quand je saisis "ada@exemple.fr" et "secret"
    Et je clique sur "Se connecter"
    Alors je suis redirigé vers "/dashboard"
    Et un jeton JWT est stocké dans le navigateur

  Scénario : Connexion avec un mot de passe invalide
    Quand je saisis "ada@exemple.fr" et "faux"
    Et je clique sur "Se connecter"
    Alors je reste sur "/login"
    Et le message "Identifiants incorrects" est affiché
