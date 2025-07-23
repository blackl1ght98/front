import { User } from "../../data/index.js";
import { SystemError, NotFoundError, validate } from "com";

export const getUsersByRol = (userId, role) => {
  validate.userId(userId);
  validate.role(role);

  return User.findById(userId)
    .catch((error) => {
      throw new SystemError("mongo error");
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return User.find({ role })
        .lean()
        .catch((error) => {
          throw new SystemError("mongo error");
        })
        .then((users) => {
          users.forEach((user) => {
            user.id = user._id.toString();
            delete user._id;
            delete user.__v;
          });

          return users;
        });
    });
};
