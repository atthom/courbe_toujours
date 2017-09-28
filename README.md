# Courbe toujours

## Team

    - JALABERT Thomas
    - MÔNIER Marhold
    - DITMANN Elia
 
## Techologies utilisées

    - Javascript
    - Framework: Phaser v2.8.7

## Description

Le principle du jeu se déroule comme suit:
Le joueur incarne une entité qui se déplace dans un espace 2D.
Cette entité laisse une trainée derrière elle. Si le joueur touche le bord de l'écran ou sa propre trainée, il meurt. Le but est de tenir le plus longtemps possible sans mourir.

Le choix de périfiérique par défaut est la souris mais nous souhaitons intégrer le support clavier, le touchpad et éventuellement le gamepad pour laisser le choix à l'utilisateur de choisir ses commantes.

## Hypothèses d'interactions

- Il y a plusieurs façon de déplacer l'entité. Selon nous, il est préférable d'utiliser la souris pour déplacer l'entité plutôt que le clavier. 
- Pour le déplacement à la souris, il est plus intuitif que l'entité suive le curseur sans avoir à cliquer.

## Variables indépendantes et variables dépendantes


## Scénario d'utilisation

    - Le joueur se connecte sur le jeu.
    - Il clique sur l'interface pour lancer le jeu.
    - Il peut déplacer l'entitée avec son pointeur.
    - Le chrono s'incrémente seconde après seconde.
    - Lorsque le joueur décède, le jeu s'arrete et son score est affiché dans le leaderboard.