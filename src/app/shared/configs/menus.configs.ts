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
      label: 'User',
      icon: 'person',
      route: './user',
    },
    {
      label: 'Add Products',
      icon: 'add',
      route: './add-products',
    },
    {
      label: 'Products',
      icon: 'list',
      route: './products',
    }
  ]
};
