const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.pegaPessoaPorId);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaMatriculaPorIdEstudante);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas);
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/matriculas/lotada', PessoaController.pegaTurmasLotadas);

router.post('/pessoas', PessoaController.cadastraPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.removePessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);

router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.removeMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula);

module.exports = router;