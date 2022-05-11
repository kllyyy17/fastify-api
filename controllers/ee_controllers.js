const { v4:uuidv4 } = require('uuid')
let employees = require('../Employees')

const getEmployees = (req, reply) => {
    reply.send(employees)
}

const getEmployee = (req, reply) => {
    const {id} = req.params
    
    const employee = employees.find(employee => employee.id === id)

    reply.send(employee)
}

const addEmployee = (req, reply) => {
    const {name, DOB, phone, address} = req.body

    const employee = {
        id: uuidv4(),
        name,
        DOB,
        phone,
        address
    }

    employees = [...employees, employee]

    reply.code(201).send(employee)
}


const deleteEmployee = (req, reply) => {
    const {id} = req.params
    
    employees = employees.filter(employee => employee.id !== id)

    reply.send({message: `Employee ${id} has been removed`})
}


const updateEmployee = (req, reply) => {
    const {id} = req.params
    const {name, DOB, phone, address} = req.body

    employees = employees.map(employee => (employee.id === id ? {id, name, DOB, phone, address} : employee))
    
    const employee = employees.find(employee => employee.id === id)

    reply.send(employee)
}

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee
}