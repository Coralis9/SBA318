router.get('/register', (req, res) => {
    res.render('register');
  });
  
  router.get('/login', (req, res) => {
    res.render('login');
  });