import * as express from 'express';

import ChemCtrl from './controllers/chem';
import UserCtrl from './controllers/user';

function setRoutes(app): void {
  const router = express.Router();
  const chemCtrl = new ChemCtrl();
  const userCtrl = new UserCtrl();

  // Chems
  router.route('/chems').get(chemCtrl.getAll);
  router.route('/chems/count').get(chemCtrl.count);
  router.route('/chem').post(chemCtrl.insert);
  router.route('/chem/:id').get(chemCtrl.get);
  router.route('/chem/:id').put(chemCtrl.update);
  router.route('/chem/:id').delete(chemCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
