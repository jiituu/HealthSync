import { useLogoutMutation } from "@/redux/api/commonApi";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ErrorMessage from "../status/ErrorMessage";

export default function Logout() {
  const [logout, {isLoading, error}] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap(); 
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return(
    <div className="flex flex-col items-center justify-center space-y-4">
      {error && <ErrorMessage message="Failed to logout. Please try again." />}
      <Button isLoading={isLoading} onClick={handleLogout} className="w-fit mx-auto text-white bg-destructive">Logout</Button>
    </div>
  );
}
