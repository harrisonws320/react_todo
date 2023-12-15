import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, 'Maximum 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Maximum 100 characters')
})

const toDoSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Maximum 100 characters'),
    categoryId: Yup.number()
})

export {catSchema, toDoSchema}