// This is just an example,
// so you can safely delete all default props below

export default {
  app_name: "Brander App",
  actions: {
    add: "Add",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    create_new: "Create New",
    save: "Save",
    cancel: "Cancel",
  },
  pages: {
    login: {
      title: 'Login',
      subtitle: 'Login',
      no_account: 'Don\'t have an account?',
    },
    users: {
      title: "Users",
    }
  },
  forms: {
    titles: {
      create_user: "Create User",
    },
    inputs: {
      Username: 'Username',
      email: 'Email',
      password: 'Password',
      remember_me: 'Remember Me',
      signup: 'Sign Up',
      signin: 'Sign In',
    },
    hints:{
      max_2_selection: 'Max 2 selections',
    },
    validations: {
      invalid_username: 'Please enter a valid username',
      weak_password: 'Please enter a strong password',
    }
  },
  msgs: {
    failed: 'Action failed',
    success: 'Action was successful',
    load_data_failed: "Loading data failed.",
  }
}
