mutation {
  createDepartment(input: {
    name: "Finance",
    subDepartments: null
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
