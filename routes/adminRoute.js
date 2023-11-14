const express = require('express');
const router = express.Router();
const { joiRegister, joiLogin, joiUpdate } = require('../middleware/joiSchema');
const {
  registerAdmin,
  deleteAdmin,
  updateAdmin,
  getAdmin,
  getAdminUsers, getSingleUser,
  deleteAdminUsers, deleteSingleUser
} = require('../controllers/adminController');
const { adminLogin, adminLogout } = require('../controllers/adminAuth');
const { verifyToken } = require('../middleware/verifyToken');
const {verifyAdmin} = require('../middleware/verifyAdmin')

router
  .route('/')
  .post(joiRegister, registerAdmin)
  .patch(verifyToken, verifyAdmin, joiUpdate, updateAdmin)
  .get(verifyToken, verifyAdmin, getAdmin)
  .delete(verifyToken, verifyAdmin, deleteAdmin);
router.get('/get-users', verifyToken, verifyAdmin, getAdminUsers)
router.get('/get-single-user/:id', verifyToken, verifyAdmin, getSingleUser)
router.post('/admin-login', joiLogin, adminLogin);
router.delete('/admin-logout', verifyToken, verifyAdmin, adminLogout);
router.delete('/delete-users', verifyToken, verifyAdmin, deleteAdminUsers);
router.delete('/delete-single-user/:id', verifyToken, verifyAdmin, deleteSingleUser);

module.exports = router;
