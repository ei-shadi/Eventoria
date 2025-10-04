
import RegisterFormClient from "./RegisterFormClient"; 

export const metadata = {
  title: "Register - Job Portal", 
  description: "Create your new account for the job portal.",
};

export default function RegisterPage() {
  return (
   
    <div className="min-h-[80vh] flex items-center justify-center p-3 "> 
      
      <RegisterFormClient />
    </div>
  );
}