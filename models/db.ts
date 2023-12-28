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
  updateUserById: () => {},
  deleteUserById: () => {},
  logAllUser: () => console.log(userDb)
}
export default dbCon;