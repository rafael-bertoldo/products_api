const { UserService } = require("../services/user.services")
const { ProductService } = require("../services/product.services")

const adm = UserService.create({
  email: "rafaelBertoldo@mail.com",
  name: "Rafael Bertoldo",
  password: "123456",
  isAdm: true,
});

UserService.create({
  email: "pedro@mail.com",
  name: "Pedro Hasler",
  password: "123456",
});

