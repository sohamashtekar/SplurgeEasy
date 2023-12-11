import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import RouteWrapper from './components/RouteWrapper';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            refetchOnmount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 0,
        },
    },
});

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

function App() {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <BrowserRouter>
                <RouteWrapper />
            </BrowserRouter>
        </PersistQueryClientProvider>
    );
}

export default App;
