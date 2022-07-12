const {
  create,
  getUsersById,
  getUsers,
  updateUsers,
  deleteUsers,
  getUserByEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.pass = hashSync(body.pass, salt);
    create(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Data base Connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },
  getUsersById: (req, res) => {
    const id = req.params.id;
    getUsersById(id, (err, result) => {
      if (err) {
        console.log("error from get user by id", err);
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },

  updateUsers: (req, res) => {
    console.log("updating the user............................");
    const body = req.body;
    const salt = genSaltSync(10);
    body.pass = hashSync(body.pass, salt);
    updateUsers(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUsers: (req, res) => {
    const data = req.body;
    deleteUsers(data, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (!result) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        message: "User Deleted successfully",
      });
    });
  },

  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.emailId, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          data: "Invalid email and password",
        });
      }

    //   console.log(result.pass);
      const ans = compareSync(body.pass ,result.pass);
      if (ans) {
        result.password = undefined;
        const jsonwebtoken = sign({ ans: result }, "qwe234", {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsonwebtoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid emailId or password",
        });
      }
    });
  },
};
