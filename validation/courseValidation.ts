const Joi = require("joi");

const courseValidation = Joi.object({
    userId: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "userId butun son bo‘lishi kerak",
            "number.min": "userId 1 dan katta bo‘lishi kerak",
            "any.required": "userId talab qilinadi"
        }),

    during: Joi.string().required(),

    subject: Joi.string()
        .valid("matematika", "fizika", "ingliz tili")
        .required()
        .messages({
            "any.only": "object faqat 'matematika', 'fizika' yoki 'ingliz tili' bo‘lishi mumkin",
            "any.required": "object talab qilinadi"
        })
});

export default courseValidation
