import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserPlus } from "lucide-react";
import { signupUser } from "../../../redux/slices/authSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    await dispatch(signupUser(values));
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-xl rounded-[32px] p-8 sm:p-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[var(--muted-foreground)]">
          <UserPlus className="h-4 w-4" />
          Join DevConnect
        </span>
        <h2 className="mt-6 text-3xl font-semibold">Create your developer identity</h2>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">
          Launch your profile, organize your work, and start publishing with a premium workflow.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Username" {...register("username")} />
        <Input placeholder="Email address" type="email" {...register("email")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        <Input placeholder="Confirm password" type="password" {...register("confirmPassword")} />
        <Input type="file" {...register("avatar")} className="pt-3" />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo-300">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default SignupPage;
