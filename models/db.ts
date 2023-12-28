import { User } from "./userInterface";

let userDb: User[] = [];
let id = 0;

const dbCon = {
  addUser: (name: string, email: string, birthDate: string): boolean => {
    const newUser: User = {
      id: id++,
      name: name,
      email: email,
      birthDate: new Date(birthDate)
    };
    userDb.push(newUser);
    return true;
  },
  findUserById: (findId: number): User | null => {
    const foundUser = userDb.filter((user) => user.id == findId)[0];
    return foundUser || null;
  },
  updateUserById: (id: number, name: string, email: string, birthDate: string): boolean => {
    let index: number = -1;
    userDb.forEach((user, i) => {
      if (user.id == id) index = i;
      return;
    });

    if (index == -1) return false;

    userDb[index] = {
      id: id,
      name: name,
      email: email,
      birthDate: new Date(birthDate)
    };

    return true;
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