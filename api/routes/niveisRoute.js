const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router();

router.get('/niveis', NivelController.pegaTodosOsNiveis);
router.get('/niveis/:id', NivelController.pegaNivelPorId);
router.post('/niveis', NivelController.cadastraNivel);
router.put('/niveis/:id', NivelController.atualizaNivel);
router.delete('/niveis/:id', NivelController.removeNivel);
router.post('/niveis/:id/restaura', NivelController.restauraNivel);

module.exports = router;