import {
  getDatabase, ref, onValue, update,
} from 'firebase/database';

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
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const db = getDatabase();
        const uid = await dispatch('getUid');
        const updateData = { ...getters.info, ...toUpdate };
        await update(ref(db, `/users/${uid}/info`), updateData);
        commit('setInfo', updateData);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
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
