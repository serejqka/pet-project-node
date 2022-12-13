const router = require('express').Router();
const { sessionChecker } = require('../../middleware/auth');

const Home = require('../../views/Home');
const Dashboard = require('../../views/Dashboard');
const Profile = require('../../views/Profile');
const Unsubscribe = require('../../views/Unsubscribe');

router.route('/')
  .get(sessionChecker, (req, res) => {
    res.renderComponent(Home, { title: 'Pet Project Node' });
  });

router.route('/logout')
  .get((req, res, next) => {
    const { userId } = req.session;

    if (userId) {
      try {
        // удаление сессии на сервере
        req.session.destroy();

        // серверное удаление куки по имени
        res.clearCookie('user_uid');

        res.redirect('/');
      } catch (error) {
        next(error);
      }
    } else {
      res.redirect('/auth');
    }
  });

router.route('/profile')
  .get((req, res) => {
    const { userId } = req.session;

    if (userId) {
      res.renderComponent(Profile, {
        user: res.locals.user,
        registration: res.locals.user.createdAt.toString(),
        ip: req.ip ?? '127.0.0.1',
        title: 'Your Profile',
      });
    } else {
      res.redirect('/auth');
    }
  });

router.route('/dashboard')
  .get((req, res) => {
    const { userId } = req.session;

    if (userId) {
      res.renderComponent(Dashboard, { title: 'Your Dashboard', user: res.locals.user });
    } else {
      res.redirect('/auth');
    }
  });

router.route('/unsubscribe/:email')
  .get((req, res) => {
    const { email } = req.params;

    // рендер диалоговой страницы для формирования отписки
    res.renderComponent(Unsubscribe, { title: 'Do you want to unsubscribe?', email });
  })
  .put((req, res) => {
    // логика исключения указанной почты из списка рассылки
  });

module.exports = router;
