graphql
mutation {
  createDepartment(input: {
    name: "Finance",
    subDepartments: [
      { name: "Accounts" },
      { name: "Audit" }
    ]
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
