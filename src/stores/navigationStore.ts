import { defineStore } from 'pinia';

interface NavigationState {
  previousRouteName: string | null;
}

/* 
Pinia store to contain a previous route's name
  "previousRouteName":
    - Updates on every router.push() | router-mod.ts (modifyRouterPush)
    - Used in NavBar.vue to determine the back button's behavior
*/
export const useNavigationStore = defineStore('navigation', {
  state: (): NavigationState => ({
    previousRouteName: null,
  }),
  actions: {
    setPreviousRouteName(route: string) {
      this.previousRouteName = route;
    },
    clearPreviousRouteName() {
      this.previousRouteName = null;
    },
  },
});
