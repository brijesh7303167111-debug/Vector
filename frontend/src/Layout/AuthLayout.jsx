
import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2>
            yeah auth wala agya
        </h2>

        <Outlet />

        <div className="mt-6 text-center text-sm text-gray-500">
          By continuing you agree to our <Link to="/terms" className="underline">Terms</Link>.
        </div>
      </div>
    </div>
  );
}
