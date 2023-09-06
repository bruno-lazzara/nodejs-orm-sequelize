const database = require('../models');

class NivelController {
    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll();
            return res.status(200).json(todosOsNiveis);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async pegaNivelPorId(req, res) {
        try {
            const { id } = req.params;
            const nivel = await database.Niveis.findByPk(id);

            if (nivel === null) {
                return res.status(404).json({ message: 'Nivel não encontrado' });
            }

            return res.status(200).json(nivel);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async cadastraNivel(req, res) {
        try {
            const novoNivel = req.body;
            novoNivel.createdAt = new Date();
            novoNivel.updatedAt = new Date();
            const novoNivelCriado = await database.Niveis.create(novoNivel);
            return res.status(201).json(novoNivelCriado);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async atualizaNivel(req, res) {
        try {
            const { id } = req.params;
            const novosDados = req.body;
            novosDados.updatedAt = new Date();
            await database.Niveis.update(novosDados, {
                where: {
                    id: Number(id)
                }
            });
            const nivelAtualizado = await database.Niveis.findByPk(id);
            return res.status(200).json(nivelAtualizado);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async removeNivel(req, res) {
        try {
            const { id } = req.params;
            await database.Niveis.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ message: 'Nivel removido com sucesso' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = NivelController;