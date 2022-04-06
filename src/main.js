import { createApp } from 'vue';
import messagePlugin from '@/utils/message.plugin';
import LoaderComponent from '@/components/app/LoaderComponent.vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';

const firebaseConfig = {
  apiKey: 'AIzaSyBPxcysg7cum0PPJ49ZZ90O2sLrpSNUgqU',
  authDomain: 'vue-crm-5a4cd.firebaseapp.com',
  projectId: 'vue-crm-5a4cd',
  storageBucket: 'vue-crm-5a4cd.appspot.com',
  messagingSenderId: '286046588117',
  appId: '1:286046588117:web:256e3d139a38bc2d99265c',
  databaseURL: 'https://vue-crm-5a4cd-default-rtdb.europe-west1.firebasedatabase.app',
};

initializeApp(firebaseConfig);

let app;

const auth = getAuth();

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(messagePlugin)
      .component('Loader', LoaderComponent)
      .mount('#app');
  }
});
