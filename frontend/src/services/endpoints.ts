const endpoints = {
  user: {
    create: '/user',
    loginWithGoogle: (clientId: string, token: string) =>
      `/login/google/${clientId}/${token}`,
    modify: '/user',
    login: '/login',
    forgotPassword: '/forgotPassword',
    compareCode: '/compareCode',
    newPassword: '/newPassword'
  },
  collections: {
    get: '/collection',
    post: '/collection'
  }
}

export default endpoints
