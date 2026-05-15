import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, LogIn } from "lucide-react";
import { loginUser } from "../../../redux/slices/authSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      reset();
      navigate(location.state?.from || "/dashboard");
    } catch {
      // Error is rendered from Redux state.
    }
  };

  return (
    <Card className="w-full max-w-xl rounded-[32px] p-8 sm:p-10">
      <Link to="/" className="mb-6 inline-flex">
        <Button type="button" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
          <LogIn className="h-4 w-4" />
          Welcome back
        </span>
        <h2 className="mt-6 text-3xl font-semibold">
          Log in to your developer workspace
        </h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Continue building your profile, publishing ideas, and growing your
          network.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Email address"
          type="email"
          {...register("email")}
        />
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        New here?{" "}
        <Link
          to="/signup"
          className="font-medium text-zinc-800 dark:text-white/80"
        >
          Create an account
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;
