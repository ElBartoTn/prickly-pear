import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";

describe("Users Controller", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();
    controller = moduleRef.resolve(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
