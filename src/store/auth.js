import {
  getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const auth = getAuth();
        console.log(dispatch, commit);
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        const auth = getAuth();
        const db = getDatabase();

        console.log(dispatch, commit);
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch('getUid');

        set(ref(db, `/users/${uid}/info`), {
          bill: 10000,
          name,
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit('clearInfo');
    },
  },
};
