import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, UserPlus } from "lucide-react";
import { signupUser } from "../../../redux/slices/authSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

const SignupPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    await dispatch(signupUser(values));
    reset();
    navigate("/dashboard");
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
          <UserPlus className="h-4 w-4" />
          Join DevConnect
        </span>
        <h2 className="mt-6 text-3xl font-semibold">Create your developer identity</h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Launch your profile, organize your work, and start publishing with a premium workflow.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Name" {...register("name")} />
        <Input placeholder="Email address" type="email" {...register("email")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-zinc-800 dark:text-white/80">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default SignupPage;



