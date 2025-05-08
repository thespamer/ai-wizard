import Joi from 'joi';

const projectSchema = Joi.object({
  nomeProduto: Joi.string().required(),
  descricao: Joi.string().required(),
  publicoAlvo: Joi.string().required(),
  funcionalidadesPrincipais: Joi.array().items(Joi.string()).required(),
  tecnologiasPreferidas: Joi.object({
    frontend: Joi.string().allow('').optional(),
    backend: Joi.string().allow('').optional()
  }).optional()
});

export const validateProjectData = (data) => {
  return projectSchema.validate(data, { abortEarly: false });
};
