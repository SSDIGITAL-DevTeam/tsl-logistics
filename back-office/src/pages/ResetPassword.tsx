import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const schema = z.object({
  password: z.string().min(8, 'At least 8 characters'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });

type FormData = z.infer<typeof schema>;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, { token, password: data.password });
      setDone(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Reset failed. The link may have expired.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A84B] font-bold text-white text-xl">T</div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          {done ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">✅</div>
              <p className="text-sm text-gray-600">Password reset successfully.</p>
              <Link to="/login" className="text-sm text-[#C8A84B] hover:underline">Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!token && <p className="text-sm text-red-600">Invalid or missing reset token.</p>}
              <Input label="New Password" type="password" error={errors.password?.message} {...register('password')} />
              <Input label="Confirm Password" type="password" error={errors.confirm?.message} {...register('confirm')} />
              {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              <Button type="submit" loading={isSubmitting} disabled={!token} className="w-full">Reset Password</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
