const database = require('../models');

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaPessoaPorId(req, res) {
        try {
            const { id } = req.params;
            const pessoa = await database.Pessoas.findByPk(id);
            // const pessoa = await database.Pessoas.findOne({
            //     where: {
            //         id: Number(id)
            //     }
            // });

            if (pessoa === null) {
                return res.status(404).json({ message: 'Pessoa não encontrada' });
            }
            return res.status(200).json(pessoa);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async cadastraPessoa(req, res) {
        try {
            const novaPessoa = req.body;
            novaPessoa.createdAt = new Date();
            novaPessoa.updatedAt = new Date();
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(201).json(novaPessoaCriada);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaPessoa(req, res) {
        try {
            const { id } = req.params;
            const novosDados = req.body;
            novosDados.updatedAt = new Date();
            await database.Pessoas.update(novosDados, {
                where: {
                    id: Number(id)
                }
            });
            const pessoaAtualizada = await database.Pessoas.findByPk(id);
            return res.status(200).json(pessoaAtualizada);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async removePessoa(req, res) {
        try {
            const { id } = req.params;
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ message: 'Pessoa removida com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraPessoa(req, res) {
        try {
            const { id } = req.params;
            await database.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ message: 'Pessoa restaurada com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaMatriculaPorIdEstudante(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            if (matricula === null) {
                return res.status(404).json({ message: 'Matrícula não encontrada' });
            }
            return res.status(200).json(matricula);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async criaMatricula(req, res) {
        try {
            const { estudanteId } = req.params;
            const matricula = { ...req.body, estudante_id: Number(estudanteId) };
            matricula.createdAt = new Date();
            matricula.updatedAt = new Date();

            const matriculaCriada = await database.Matriculas.create(matricula);
            return res.status(201).json(matriculaCriada);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            const novosDados = req.body;
            novosDados.updatedAt = new Date();
            await database.Matriculas.update(novosDados, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            const matriculaAtualizada = await database.Matriculas.findByPk(matriculaId);
            return res.status(200).json(matriculaAtualizada);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async removeMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json({ message: 'Matrícula removida com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            await database.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json({ mensagem: 'Matrícula restaurada com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaMatriculas(req, res) {
        try {
            const { estudanteId } = req.params;
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(estudanteId)
                }
            });
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = PessoaController; 