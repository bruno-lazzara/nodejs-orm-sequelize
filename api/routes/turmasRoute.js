const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.get('/turmas', TurmaController.pegaTodasAsTurmas);
router.get('/turmas/:id', TurmaController.pegaTurmaPorId);
router.post('/turmas', TurmaController.cadastraTurma);
router.put('/turmas/:id', TurmaController.atualizaTurma);
router.delete('/turmas/:id', TurmaController.removeTurma);
router.post('/turmas/:id/restaura', TurmaController.restauraTurma);

module.exports = router;