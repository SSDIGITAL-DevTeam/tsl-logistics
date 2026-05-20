import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const schema = z.object({ email: z.string().email('Invalid email') });
type FormData = z.infer<typeof schema>;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await axios.post(`${API_URL}/api/auth/forgot-password`, data);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A84B] font-bold text-white text-xl">T</div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">📧</div>
              <p className="text-sm text-gray-600">
                If that email exists, a password reset link has been sent. Check your inbox.
              </p>
              <Link to="/login" className="text-sm text-[#C8A84B] hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Email" type="email" placeholder="admin@tsl-logistics.com" error={errors.email?.message} {...register('email')} />
              <Button type="submit" loading={isSubmitting} className="w-full">Send Reset Link</Button>
              <p className="text-center text-sm text-gray-500">
                <Link to="/login" className="text-[#C8A84B] hover:underline">Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
