import { User } from "./userInterface";

let userDb: User[] = [];
let id = 0;

const dbCon = {
  addUser: (name: string, email: string, birthDate: string): Error | null => {
    // ensure the email unique first
    const existUsers = userDb.filter(user => user.email == email);
    if (existUsers.length > 0) return new Error("The email has been registered, please use another email.");

    // confirmed it's unique, perform register
    const newUser: User = {
      id: id++,
      name: name,
      email: email,
      birthDate: new Date(birthDate)
    };
    userDb.push(newUser);
    return null;
  },
  findUserById: (findId: number): User | null => {
    const foundUser = userDb.filter((user) => user.id == findId)[0];
    return foundUser || null;
  },
  updateUserById: (id: number, name: string, email: string, birthDate: string): Error | null => {
    let index: number = -1;
    let existEmail: boolean = false;
    userDb.forEach((user, i) => {
      if (user.id == id) index = i;
      existEmail = user.email == email;
      if (existEmail) return;
    });

    if (index == -1) return new Error("404");
    if (existEmail) return new Error("409");

    userDb[index] = {
      id: id,
      name: name,
      email: email,
      birthDate: new Date(birthDate)
    };

    return null;
  },
  deleteUserById: (deleteId: number): boolean => {
    const deletedUserArray: User[] = userDb.filter((user) => user.id != deleteId);
    if (userDb.length == deletedUserArray.length) return false;
    userDb = deletedUserArray;
    return true;
  },
  logAllUser: () => console.log(userDb)
}
export default dbCon;