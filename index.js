const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOpitions = require("./extend/swagger")


const app = express()
const port = 3000

const specs = swaggerJsdoc(swaggerOpitions)

app.use(express.json())

/**
 * @swagger
 * components:
 *  schemas:
 *      Aluno:
 *          type: object
 *          required:
 *              - id
 *              - nome
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identificador do aluno
 *              nome:
 *                  type: string
 *                  description: Nome do aluno
 *          example: 
 *              id: 1
 *              nome: fulano
 */

let alunos = [

    { id: 1, nome: "João" }
]

/**
 * @swagger
 * /aluno:
 *  get:
 *      summary: Retorna todos os alunos cadastrados 
 *      tags: [Alunos]
 *      responses: 
 *          200:
 *              description: Lista de Alunos
 *              Content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Aluno'
 */

app.get('/aluno', (req, res) => {
    res.json(alunos)

})

app.post('/aluno', (req, res) => {
    const novoAluno = { id: alunos.length + 1, ...req.body }
    alunos.push(novoAluno)
    res.status(201).json(novoAluno)
    console.log("Gerou essa bagaça")
})

app.put('/aluno/:id', (req, res) => {

    const { id } = req.params
    const alunoIndex = alunos.findIndex(a => a.id == id)
    
    if (alunoIndex > -1) {
        alunos[alunoIndex] = { id: Number(id), ...req.body }
        res.status(200).json(alunos[alunoIndex])

    } else {

        res.status(404).json({ message: "Aluno não Encontrado" })

    }

})

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs))

app.listen(port, () => {
    console.log("Servidor de API funcionando")

})