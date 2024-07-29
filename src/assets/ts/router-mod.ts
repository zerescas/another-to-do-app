import { useNavigationStore } from '@/stores/navigationStore';
import type { RouteLocationRaw, Router } from 'vue-router';

/**
 * Mod a router's push to save a previous route's name in Pinia store
 * @param {Router} router
 */
export function modifyRouterPush(router: Router) {
  const navigationStore = useNavigationStore();

  const push = router.push;

  router.push = (to: RouteLocationRaw) => {
    const from = router.currentRoute.value;
    navigationStore.setPreviousRouteName(from.name as string);

    return push(to);
  };
}
