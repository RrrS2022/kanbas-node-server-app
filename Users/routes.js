import db from "../Kanbas/Database/index.js";
import * as dao from "./dao.js";
export default function UserRoutes (app) {
  //CRUD
  const fetchAllUsers = async (req, res) => {
    // res.json(db.users);
    // // to prevent non-admin access the user info
    // const currentUser = req.session["currentUser"];
    // if (!currentUser || currentUser.role !== "ADMIN") {
    //   res.status(401).send("Unauthorized");
    //   return;
    // }
    const users = await dao.findAllUsers();
    res.json(users);
  }
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send(`User with id ${id} not found`);
    }
  }
  // const createUser = async (req, res) => {
  //   const user = req.body;
  //   const newUser = await dao.createUser(user);
  //   res.json(newUser);
  // };
  const signup = async (req, res) => {
    const user = req.body;
    // const existingUser = db.users.find(
    //   (user) => user.username === newUser.username
    // );
    const existingUser = await dao.findUserByUsername(user.username);
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }
    // user._id = Date.now(),toString();
    // db.users.push(newUser);
    const newUser = await dao.createUser(user);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  const signin = async (req, res) => {
    const credentials = req.body;
    const username = credentials.username;
    const password = credentials.password;
    // const user = db.users.find(
    //   (user) => user.username === username && user.password === password
    // );
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(403).send("Username or passowrd is incorrect");
    }
  };
  // const updateUser = (req, res) => { };
  const signout = (req, res) => {
    req.session.destroy();
    res.send("Session Destroyed");
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(403).send("Not signed in");
    }
  };

  app.post("/api/users", async (req, res) => {
    const user = req.body;
    delete user._id;
    const newUser = await dao.createUser(user);
    res.json(newUser);
  });
  app.put("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    delete user._id;
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      req.session["currentUser"] = user;
    }
    const status = await dao.updateUser(id, user);
    res.json(status);
  })
  app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.send(status);
  })
  app.get("/api/users", fetchAllUsers);
  app.post("/api/users/signup/", signup);
  app.post("/api/users/signin", signin);
  app.get("/api/users/profile", profile);
  app.get("/api/users/signout", signout);



}