const endpoints = {
  user: {
    create: '/user',
    loginWithGoogle: (clientId: string, token: string) =>
      `/login/google/${clientId}/${token}`,
    modify: '/user',
    login: '/login',
    forgotPassword: '/forgotPassword',
    refreshToken: '/refreshToken',
    compareCode: '/compareCode',
    newPassword: '/newPassword'
  },
  collections: {
    get: '/collection',
    post: '/collection',
    delete: '/collection',
    put: '/collection'
  },
  todo: {
    get: '/todo',
    post: '/todo',
    delete: '/todo'
  }
}

export default endpoints
