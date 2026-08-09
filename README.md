# Vue 3 + Vite

## How to run
``` sh
npm i 
npm run dev 
```

## Technologies

Vue 3 + Vite + Pinia (Vuex 5) + Router 4 + Firebase 9

## Pinia 

Pinia is a store library for Vue, it allows you to share a state across components/pages.

## Store

State: State

Getters: Dont modify the state

Actions: Modify the state

## Navigate / replace / href / location

``` sh
import { useRouter } from "vue-router";
const router = useRouter()
router.push("/")
```

## Deploy first time on firebase

``` sh
npm run build 
```

``` sh
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Deploy on firebase

``` sh
npm run build
firebase deploy 
```
