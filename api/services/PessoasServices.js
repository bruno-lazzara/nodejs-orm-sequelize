const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    async pegaPessoasAtivas(where = {}) {
        return database[this.nomeDoModelo].findAll({
            where: {
                ...where
            }
        });
    }

    async pegaTodasAsPessoas(where = {}) {
        return database[this.nomeDoModelo].scope('todos').findAll({
            where: {
                ...where
            }
        });
    }

    async cancelaPessoaEMatriculas(estudanteId) {
        return database.sequelize.transaction(async trans => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: trans });
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: trans });
        });
    }
}

module.exports = PessoasServices;