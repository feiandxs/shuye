import SidebarComponent from './sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen bg-slate-100'>
      <aside className='w-64 bg-gray-800 text-white'>
        <div className='h-full overflow-y-auto'>
          <SidebarComponent />
        </div>
      </aside>
      <main className='flex-1 overflow-y-auto p-4'>
        {children}
      </main>
    </div>
  );
}
