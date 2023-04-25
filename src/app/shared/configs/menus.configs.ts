export const MenusSidebar = {
  initial: [
    {
      label: 'Login',
      icon: 'input',
      route: './login',
    },
    {
      label: 'Home',
      icon: 'home',
      route: './home',
    },
    {
      label: 'Register',
      icon: 'person_add',
      route: './register',
    },
  ],
  loungeAdmin: [
    {
      label: 'User',
      icon: 'person',
      route: './user',
    },
    {
      label: 'Admin',
      icon: 'supervisor_account',
      route: './admin',
    },
    {
      label: 'Add Products',
      icon: 'add',
      route: './add-products',
    }
  ],
  loungeUser: [
    {
      label: 'Home',
      icon: 'home',
      route: './products',
    },
    {
      label: 'Perfil',
      icon: 'person',
      route: './user',
    },
    {
      label: 'Vender',
      icon: 'store',
      route: './add-products',
    },
    {
      label: 'Favoritos',
      icon: 'favorite',
      route: './products',
    },
    {
      label: 'Carrinho',
      icon: 'shopping_cart',
      route: './products',
    },
   
    {
      label: 'Mensagens',
      icon: 'message',
      route: './products',
    }
  ]
};
