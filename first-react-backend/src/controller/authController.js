const users = [
  {
    id: 1,
    email: "hemanath@gmail.com",
    password: "123456",
    name: "Hemanath"
  },
  {
    id: 2,
    email: "john@gmail.com",
    password: "password123",
    name: "John"
  }
]; 
 
 export const login = (req,res)=>{
    res.send("loged in successfully")
}