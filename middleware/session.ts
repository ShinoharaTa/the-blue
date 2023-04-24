import { Middleware } from "@nuxt/types"

const session: Middleware = async (context) => {
  const userHandle = await context.app.$atp.hasSession()
  if (userHandle) {
    const { data } = await context.app.$atp.getProfile({ actor: userHandle.handle })
    console.log(data);
    context.store.commit('setUser', {user: data})
  }
  else {
    context.store.dispatch('clearUser')
    context.redirect('/login');
  }
  return
}

export default session;
