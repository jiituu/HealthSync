"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import webSocketService from '@/utils/websocketService';
import { useSessionUser } from './Session';

type WebSocketContextType = {
    isConnected: boolean;
    sendMessage: (chatId: string, receiver: string, message: string) => boolean;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useSessionUser();

    useEffect(() => {
        if (user?._id) {
            const handleOpen = () => setIsConnected(true);
            const handleClose = () => setIsConnected(false);
            // Optional: Handle errors in the context
            const handleError = (error: any) => {
                console.error("WebSocket Context Error:", error);
                setIsConnected(false); // Ensure state reflects error
            }

            // Add event listeners using the service's 'on' method
            webSocketService.on('open', handleOpen);
            webSocketService.on('close', handleClose);
            webSocketService.on('error', handleError); // Add error listener

            // Attempt to connect
            webSocketService.connect();

            // Set initial connection state using the new getter
            // Check service's current state *after* attempting connection
            setIsConnected(webSocketService.isConnected);


            return () => {
                // Use the service's 'off' method
                webSocketService.off('open', handleOpen);
                webSocketService.off('close', handleClose);
                webSocketService.off('error', handleError); // Remove error listener
                webSocketService.disconnect();
            };
        }
    }, [user?._id]);

    const sendMessage = (chatId: string, receiver: string, message: string): boolean => {
        if (!user?._id) return false;

        return webSocketService.send('messageSent', {
            chatId,
            sender: user._id,
            receiver,
            text: message,
            timestamp: new Date().toISOString()
        });
    };

    return (
        <WebSocketContext.Provider value={{ isConnected, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
}; 