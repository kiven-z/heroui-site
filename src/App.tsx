import { Toast } from '@heroui/react';
import { RouterProvider } from 'react-router-dom';

import { DialogHost } from '@/components/ui/dialog';
import { DrawerHost } from '@/components/ui/drawer';
import { router } from '@/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <DialogHost />
      <DrawerHost />
      <Toast.Provider placement="bottom end" />
    </>
  );
}

export default App;
