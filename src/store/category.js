import {
  getDatabase, ref, onValue, push, update,
} from 'firebase/database';

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();

        const categories = await new Promise(
          (resolve) => {
            onValue(
              ref(db, `/users/${uid}/categories`),
              (snapshot) => resolve(snapshot.val() || {}),
            );
          },
        );

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchCategoryByID({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();

        const category = await new Promise(
          (resolve) => {
            onValue(
              ref(db, `/users/${uid}/categories/${id}`),
              (snapshot) => resolve(snapshot.val() || {}),
            );
          },
        );

        return {
          ...category,
          id,
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();

        update(ref(db, `/users/${uid}/categories/${id}`), {
          title,
          limit,
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();

        const { key } = push(ref(db, `/users/${uid}/categories`), {
          title,
          limit,
        });
        return { title, limit, id: key };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
