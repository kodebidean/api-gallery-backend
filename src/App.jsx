import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './components/ImageGallery';
import { darkTheme } from './theme/darkTheme';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <ImageGallery />
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#21262D',
                            color: '#E6EDF3',
                            border: '1px solid #30363D',
                        },
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App; 