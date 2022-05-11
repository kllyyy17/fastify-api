const {
    getEmployees, 
    getEmployee, 
    addEmployee, 
    deleteEmployee,
    updateEmployee
} = require('../controllers/ee_controllers')


// Employee schema
const Employee = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        DOB: {type: 'string'},
        phone: {type: 'string'},
        address: {type: 'string'}
    }
}


// Options for get all employees
const getEmployeesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                employees: Employee
            }
        }
    },
    handler: getEmployees
}


// Options for get an employee
const getEmployeeOpts = {
    schema: {
        response: {
            200: Employee,
        }
    },
    handler: getEmployee
}


// Options for add an employee
const postEmployeeOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'}
            }
        },
        response: {
            201: Employee,
        }
    },
    handler: addEmployee
}


// Options for delete an employee
const deleteEmployeeOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        }
    },
    handler: deleteEmployee
}

// Options for update an employee
const updateEmployeeOpts = {
    schema: {
        response: {
            200: Employee,
        }
    },
    handler: updateEmployee
}

function employeeRoutes (fastify, options, done) {

    //Get all employees
    fastify.get('/employees', getEmployeesOpts)
    
    //Get a single employee
    fastify.get('/employees/:id', getEmployeeOpts)

    //Add an employee
    fastify.post('/employees', postEmployeeOpts)

    //Delete an employee
    fastify.delete('/employees/:id', deleteEmployeeOpts)

    //Update an employee
    fastify.put('/employees/:id', updateEmployeeOpts)

    done()
}

module.exports = employeeRoutes