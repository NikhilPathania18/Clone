import bcrypt from 'bcrypt'

export const comparePasswword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}
  
export const hashPassword= async(password)=>{
    try{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.log(error);
    }
  };