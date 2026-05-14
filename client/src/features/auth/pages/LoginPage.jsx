import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "lucide-react";
import { loginUser } from "../../../redux/slices/authSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

const LoginPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "aria@devconnect.io",
      password: "password123",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    await dispatch(loginUser(values));
    navigate(location.state?.from || "/dashboard");
  };

  return (
    <Card className="w-full max-w-xl rounded-[32px] p-8 sm:p-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[var(--muted-foreground)]">
          <LogIn className="h-4 w-4" />
          Welcome back
        </span>
        <h2 className="mt-6 text-3xl font-semibold">Log in to your developer workspace</h2>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">
          Continue building your profile, publishing ideas, and growing your network.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Email address" type="email" {...register("email")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[var(--muted-foreground)]">
            <input type="checkbox" className="rounded border-white/20 bg-transparent" />
            Remember me
          </label>
          <button type="button" className="text-indigo-300">
            Forgot password?
          </button>
        </div>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
        <Button className="w-full" type="button" variant="secondary">
          Continue with Google
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        New here?{" "}
        <Link to="/signup" className="font-medium text-indigo-300">
          Create an account
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;
