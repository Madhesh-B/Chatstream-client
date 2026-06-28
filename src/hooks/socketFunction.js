import { useCallback, useEffect } from "react";
import socket from "../services/socket";

export const useSocketOn = (event, callBack) => {
  if (!socket) return;
  useEffect(() => {
    socket.on(event, callBack);
    return () => socket.off(event, callBack);
  }, [socket]);
}

export const useSocketEmit = (event, data) => {
  if (!socket) return null;
  return useCallback(() => {
    if (!socket) return;
    socket.emit(event, data);
  }, [socket]);
}