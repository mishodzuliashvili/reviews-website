interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="p-5 max-w-sm w-full mx-auto">{children}</div>;
}
