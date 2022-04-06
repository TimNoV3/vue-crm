import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const db = getDatabase();
        const uid = await dispatch('getUid');
        onValue(ref(db, `/users/${uid}/info`), (snapshot) => {
          const data = snapshot.val();
          commit('setInfo', data);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
