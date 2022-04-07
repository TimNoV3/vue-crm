import {
  getDatabase, ref, push, onValue,
} from 'firebase/database';

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        return await push(ref(db, `/users/${uid}/records`), record);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();

        const records = await new Promise(
          (resolve) => {
            onValue(
              ref(db, `/users/${uid}/records`),
              (snapshot) => resolve(snapshot.val() || {}),
            );
          },
        );

        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
