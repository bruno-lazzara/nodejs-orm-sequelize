const database = require('../models');
const { Op } = require('sequelize');

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        try {
            const { data_inicial, data_final } = req.query;
            const where = {};

            data_inicial || data_final ? where.data_inicio = {} : null;
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
            data_final ? where.data_inicio[Op.lte] = data_final : null;

            const todasAsTurmas = await database.Turmas.findAll({
                where
            });
            
            return res.status(200).json(todasAsTurmas);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaTurmaPorId(req, res) {
        try {
            const { id } = req.params;
            const turma = await database.Turmas.findByPk(id);

            if (turma === null) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }

            return res.status(200).json(turma);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async cadastraTurma(req, res) {
        try {
            const novaTurma = req.body;
            novaTurma.createdAt = new Date();
            novaTurma.updatedAt = new Date();
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(201).json(novaTurmaCriada);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaTurma(req, res) {
        try {
            const { id } = req.params;
            const novosDados = req.body;
            novosDados.updatedAt = new Date();
            await database.Turmas.update(novosDados, {
                where: {
                    id: Number(id)
                }
            });
            const turmaAtualizada = await database.Turmas.findByPk(id);
            return res.status(200).json(turmaAtualizada);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async removeTurma(req, res) {
        try {
            const { id } = req.params;
            await database.Turmas.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ message: 'Turma removida com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async restauraTurma(req, res) {
        try {
            const { id } = req.params;
            await database.Turmas.restore({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ mensagem: 'Turma restaurada com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = TurmaController;