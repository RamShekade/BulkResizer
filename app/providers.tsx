'use client';

import { ReactNode } from 'react';
import { ImageProvider } from './hooks/ImageContext';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
            <ImageProvider>
                {children}
            </ImageProvider>

    );
}