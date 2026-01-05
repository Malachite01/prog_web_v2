# 🐟 Fish Game - Projet de Programmation Web

## Description

Ce projet est une implémentation d'un jeu de survie aquatique développé en HTML5, CSS3 et JavaScript vanilla. Premier projet de programmation web à l'INSA Toulouse, le but du jeu est de contrôler un poisson qui doit échapper aux filets de pêche lancés par un bateau ennemi. Si vous vous faites attraper par un filet, vous avez perdu !

## 📋 Table des matières

- [🐟 Fish Game - Projet de Programmation Web](#-fish-game---projet-de-programmation-web)
  - [Description](#description)
  - [📋 Table des matières](#-table-des-matières)
  - [🌐 Où jouer ?](#-où-jouer-)
  - [✨ Fonctionnalités](#-fonctionnalités)
  - [🛠 Technologies utilisées](#-technologies-utilisées)
  - [Fichiers principaux](#fichiers-principaux)
  - [📁 Structure du projet](#-structure-du-projet)
  - [🎯 Comment jouer](#-comment-jouer)
    - [Objectif](#objectif)
  - [🎮 Contrôles](#-contrôles)
    - [Desktop](#desktop)
    - [Mobile](#mobile)
    - [Interface](#interface)
  - [💻 Développement](#-développement)
    - [Modes de développement](#modes-de-développement)
  - [👥 Auteurs](#-auteurs)

## 🌐 Où jouer ?

Ce projet a été mis en place avec la CI/CD et les Actions GitHub, le repository est donc hébergé sur GitHub Pages à l'adresse suivante : **https://malachite01.github.io/prog_web_v2/**

## ✨ Fonctionnalités

- **Gameplay fluide** : Système de déplacement avec vélocité et accélération
- **Mode boost** : Augmentez temporairement votre vitesse pour échapper aux dangers
- **Système de score** : Tableau des meilleurs temps avec sauvegarde dans le localStorage
- **Affichage des meilleurs scores** : Classement des 10 meilleurs temps de survie
- **Timer de jeu** : Chronomètre précis du temps de survie
- **Effets visuels** : Bulles animées, dégradés dynamiques
- **Audio** : Musique d'ambiance avec contrôle du volume
- **Interface utilisateur réactive** : Compatible desktop et mobile
- **Contrôles tactiles** : Joystick virtuel et bouton boost pour mobile
- **Debug mode** : Option pour afficher les hitbox et activer le god mode

## 🛠 Technologies utilisées

- **HTML5** : Structure et Canvas API pour le rendu du jeu
- **CSS3** : Stylisation et animations
- **JavaScript (ES6+)** : Logique de jeu en programmation orientée objet
- **LocalStorage** : Sauvegarde des scores
- **Canvas API** : Rendu graphique 2D

## Fichiers principaux

- **index.html** : Contient la structure HTML de la page d'accueil avec le menu principal
- **jeu.html** : Contient la structure HTML de la page de jeu avec le canvas
- **styles/style.css** : Contient les styles CSS pour la mise en page et le design
- **js/game_manager.js** : Contient la logique principale du jeu et la boucle de rendu
- **js/Player.js** : Contient la classe Player pour gérer le joueur
- **js/Net.js** : Contient la classe Net pour gérer les filets ennemis
- **js/score.js** : Contient les fonctions pour gérer les scores et le localStorage
- **js/timer.js** : Contient le système de chronomètre
- **js/audio.js** : Contient la gestion de l'audio et des effets sonores
- **js/mobile_controls.js** : Contient la gestion des contrôles tactiles
- **js/bubbles.js** : Contient l'effet visuel des bulles

## 📁 Structure du projet

```
prog_web_v2/
├── index.html              # Page d'accueil du jeu
├── jeu.html                # Page de jeu principale
├── README.md               # Documentation
├── assets/
│   ├── character/          # Sprites du joueur
│   ├── enemy/              # Sprites des ennemis (bateau, filet)
│   ├── images/             # Images diverses (icônes, contrôles)
│   ├── scene/              # Éléments de décor
│   └── sounds/             # Musique et effets sonores
├── favicon/                # Favicons et manifeste PWA
├── fonts/                  # Polices personnalisées
├── js/
│   ├── audio.js            # Gestion de l'audio
│   ├── bubbles.js          # Effet visuel des bulles
│   ├── game_manager.js     # Gestionnaire principal du jeu
│   ├── mobile_controls.js  # Contrôles tactiles pour mobile
│   ├── Net.js              # Classe pour les filets ennemis
│   ├── Player.js           # Classe du joueur
│   ├── score.js            # Gestion des scores et du classement
│   └── timer.js            # Système de chronomètre
└── styles/
    └── style.css           # Feuille de style principale
```

## 🎯 Comment jouer

1. Rendez-vous sur le site ou ouvrez `index.html` dans votre navigateur
2. Cliquez sur le bouton **Play** pour commencer
3. Utilisez les contrôles pour déplacer votre poisson
4. Évitez les filets lancés par le bateau ennemi
5. Survivez le plus longtemps possible pour battre les records

### Objectif
Survivre le plus longtemps possible en évitant les filets de pêche. Le chronomètre enregistre votre temps de survie.

## 🎮 Contrôles

### Desktop
- **Flèche haut** : Avancer
- **Flèche bas** : Reculer
- **Flèche gauche** : Tourner à gauche
- **Flèche droite** : Tourner à droite
- **Espace** : Activer le boost

### Mobile
- **Joystick virtuel** : Déplacer le poisson
- **Bouton boost** : Augmenter la vitesse

### Interface
- **Bouton son** : Activer/désactiver la musique
- **Bouton home** : Retourner au menu principal

## 💻 Développement

### Modes de développement

Le jeu dispose de constantes de configuration dans [game_manager.js](js/game_manager.js#L3-L4) :

```javascript
const GodModeEnabled = 0; // 1 pour être invincible
const Debug = 0;          // 1 pour afficher les hitbox
```

## 👥 Auteurs

- **ANTUNES Mathieu**
- **FRUCHARD Joris**
- **CAUX Faustine**

© 2025 - Projet réalisé dans le cadre du cours de Développement Web à l'INSA

---

**Bon jeu ! 🐟**
